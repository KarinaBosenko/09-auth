import { Metadata } from "next";
import css from "./CreateNote.module.css";
import NoteForm from "@/components/NoteForm/NoteForm";

export const metadata: Metadata = {
  title: "Create Note - NoteHub",
  description:
    "Create a new note in NoteHub. Add a title, content, and tag to organize your thoughts efficiently.",
  openGraph: {
    title: "Create Note - NoteHub",
    description:
      "Create a new note in NoteHub. Add a title, content, and tag to organize your thoughts efficiently.",
    url: "${process.env.NEXT_PUBLIC_SITE_URL}/notes/create",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "Create Note in NoteHub",
      },
    ],
  },
};

function CreateNote() {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        <NoteForm />
      </div>
    </main>
  );
}

export default CreateNote;
