import ModalNote from "@/components/ModalNote/ModalNote";
import { fetchNoteById } from "@/lib/api";

type Props = {
  params: Promise<{ id: string }>;
};

const NotePreview = async ({ params }: Props) => {
  const { id } = await params;
  const note = await fetchNoteById(id);

  return (
    <>
      <ModalNote>
        <h2>{note.title}</h2>
        <p>{note.content}</p>
      </ModalNote>
    </>
  );
};

export default NotePreview;
