import axios from "axios";
import type { Note, NoteTag } from "@/types/note";

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export type CreateNote = {
  title: string;
  content: string;
  tag: NoteTag;
};

const noteToken = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;
axios.defaults.baseURL = "https://notehub-public.goit.study/api";

export const fetchNotes = async (
  search: string,
  page: number,
  perPage: number,
  tag?: NoteTag,
): Promise<FetchNotesResponse> => {
  const response = await axios.get<FetchNotesResponse>(`/notes`, {
    params: {
      search,
      page,
      perPage,
      tag,
    },
    headers: {
      Authorization: `Bearer ${noteToken}`,
    },
  });
  return response.data;
};

export const createNote = async (payload: CreateNote): Promise<Note> => {
  const { data } = await axios.post<Note>(`/notes`, payload, {
    headers: {
      Authorization: `Bearer ${noteToken}`,
    },
  });
  return data;
};

export const deleteNote = async (noteId: Note["id"]): Promise<Note> => {
  const response = await axios.delete<Note>(`/notes/${noteId}`, {
    headers: {
      Authorization: `Bearer ${noteToken}`,
    },
  });
  return response.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const response = await axios.get<Note>(`/notes/${id}`, {
    headers: {
      Authorization: `Bearer ${noteToken}`,
    },
  });
  return response.data;
};
