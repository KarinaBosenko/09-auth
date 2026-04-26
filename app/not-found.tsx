import { Metadata } from "next";
import css from "./page.module.css";

export const metadata: Metadata = {
  title: "Page Not Found | NoteHub",
  description:
    "The page you are looking for does not exist or has been moved. Go back to NoteHub and continue managing your notes.",
  openGraph: {
    title: "Page Not Found | NoteHub",
    description:
      "The page you are looking for does not exist or has been moved. Go back to NoteHub and continue managing your notes.",
    url: "http://localhost:3000/",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "NoteHub — Smart Note-Taking App",
      },
    ],
  },
};

function NotFound() {
  return (
    <>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
    </>
  );
}

export default NotFound;
