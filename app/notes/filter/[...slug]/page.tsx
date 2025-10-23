import NoteList from "@/components/NoteList/NoteList";
import { getTag } from "@/lib/api";
import css from "./Slug.module.css";

interface Props {
  params: Promise<{ slug: string[] }>;
}

export default async function Tag({ params }: Props) {
  const { slug } = await params;
  const category = slug[0] === "all" ? undefined : slug[0];
  const notesTag = await getTag(category);
  console.log(notesTag);

  return (
    <div>
      <NoteList notes={notesTag.notes} />
    </div>
  );
}
