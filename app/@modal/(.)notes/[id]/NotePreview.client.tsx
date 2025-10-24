"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { fetchNoteById } from "@/lib/api";
import ModalNote from "@/components/ModalNote/ModalNote";
import css from "./NotePreview.module.css";

export default function NotePreview() {
  const router = useRouter();

  const { id } = useParams<{ id: string }>();
  const { data, isLoading, error } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  const handleClose = () => {
    router.back();
  };

  if (isLoading) {
    return <p>Loading, please wait...</p>;
  }

  if (error) {
    return <p>Something went wrong.</p>;
  }

  if (!data) {
    return <p>No note found.</p>;
  }
  return (
    <ModalNote close={handleClose}>
      <div className={css.container}>
        <div className={css.item}>
          <div className={css.header}>
            <h2>{data.title}</h2>
            <button className={css.closeButton} onClick={handleClose}>
              ✕
            </button>
          </div>
          <p className={css.content}>{data.content}</p>
          <p className={css.date}>
            {new Date(data.createdAt).toLocaleString()}
          </p>
        </div>
      </div>
    </ModalNote>
  );
}
