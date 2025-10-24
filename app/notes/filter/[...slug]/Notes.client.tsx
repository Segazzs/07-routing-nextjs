"use client";

import { useQuery } from "@tanstack/react-query";
import { noteFetch } from "@/lib/api";
import NoteList from "@/components/NoteList/NoteList";
import { useState } from "react";
import { useDebounce } from "use-debounce";
import { useEffect } from "react";
import Pagination from "@/components/Pagination/Pagination";
import css from "./Slug.module.css";
import Modal from "@/components/Modal/Modal";
import SearchBox from "@/components/SearchBox/SearchBox";
import NoteForm from "@/components/NoteForm/NoteForm";

interface NotesClientProps {
  tag?: string;
}

export default function NotesClient({ tag }: NotesClientProps) {
  const [page, setPage] = useState(1);
  const [text, setText] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const [debouncedText] = useDebounce(text, 300);

  useEffect(() => {
    setPage(1);
  }, [debouncedText]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  const handleOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);

  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ["notes", page, debouncedText, tag],
    queryFn: () => noteFetch(debouncedText, tag, page),
  });

  return (
    <>
      <div className={css.app}>
        <div className={css.interface}>
          <SearchBox onChange={handleChange} value={text} />

          {isSuccess && (
            <Pagination
              totalPages={data.totalPages}
              currentPage={page}
              onPageChange={setPage}
            />
          )}
          <button className={css.button} onClick={handleOpen}>
            Create note +
          </button>
        </div>
        <div className={css.notesList}>
          {isOpen && (
            <Modal onClose={onClose}>
              <NoteForm onClose={onClose} />
            </Modal>
          )}

          <div className={css.notesList}>
            {isLoading && <p>Loading...</p>}
            {isError && <p>Error...</p>}
            {isSuccess && <NoteList notes={data.notes} />}
          </div>
        </div>
      </div>
    </>
  );
}
