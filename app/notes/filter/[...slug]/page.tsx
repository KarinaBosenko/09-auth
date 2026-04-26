import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";
import NotesClient from "./Notes.client";
import { NoteTag } from "@/types/note";

import { Metadata } from "next";
import { fetchNotes } from "@/lib/api";

interface NotesPagesProps {
  params: Promise<{ slug: string[] }>;
}

export async function generateMetadata({
  params,
}: NotesPagesProps): Promise<Metadata> {
  const { slug } = await params;
  const tag = slug[0];
  const isAll = tag === "all";

  return {
    title: isAll ? "All Notes - NoteHub" : `${tag} Notes - NoteHub`,
    description: isAll
      ? "Browse all your notes in NoteHub."
      : `Browse notes filtered by ${tag} tag in NoteHub.`,
    openGraph: {
      title: isAll ? "All Notes - NoteHub" : `${tag} Notes - NoteHub`,
      description: isAll
        ? "Browse all your notes in NoteHub."
        : `Browse notes filtered by ${tag} tag in NoteHub.`,
      url: `http://localhost:3000/notes/filter/${tag}`,
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
          alt: isAll ? "All Notes - NoteHub" : `${tag} Notes - NoteHub`,
        },
      ],
    },
  };
}

async function NotesPages({ params }: NotesPagesProps) {
  const { slug } = await params;
  const tag = slug[0] === "all" ? undefined : (slug[0] as NoteTag);

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["notes", "", 1, tag],
    queryFn: () => fetchNotes("", 1, 12, tag),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={tag} />
    </HydrationBoundary>
  );
}

export default NotesPages;
