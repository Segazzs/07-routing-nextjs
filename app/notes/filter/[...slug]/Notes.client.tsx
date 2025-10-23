"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { getTag } from "@/lib/api";
import NoteList from "@/components/NoteList/NoteList";

export default function NotesClient() {
  const { slug } = useParams<{ slug: string[] }>();
  const tag = slug?.[0] === "all" ? undefined : slug?.[0];

  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ["noteFilter", tag],
    queryFn: () => getTag(tag),
    refetchOnMount: false,
  });

  console.log(data?.notes);

  if (isLoading) {
    return <p>Loading, please wait...</p>;
  }

  if (isError) {
    return <p>Something went wrong.</p>;
  }

  if (!data) {
    return <p>No note found.</p>;
  }
  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {isError && <p>Error...</p>}
      {isSuccess && <NoteList notes={data.notes} />}
    </div>
  );
}
