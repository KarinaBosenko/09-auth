import nextServer from "./api";
import type { Note, NoteTag } from "@/types/note";
import { User } from "@/types/user";

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export interface CreateNote {
  title: string;
  content: string;
  tag: NoteTag;
}

export type RegisterRequest = {
  email: string;
  password: string;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export type CheckSessionRequest = {
  success: boolean;
};

export type UpdateUserRequest = {
  userName?: string;
  photoUrl?: string;
};

export const fetchNotes = async (
  search: string,
  page: number,
  perPage: number,
  tag?: NoteTag,
): Promise<FetchNotesResponse> => {
  const response = await nextServer.get<FetchNotesResponse>(`/notes`, {
    params: {
      search,
      page,
      perPage,
      tag,
    },
  });
  return response.data;
};

export const createNote = async (payload: CreateNote): Promise<Note> => {
  const { data } = await nextServer.post<Note>(`/notes`, payload, {});
  return data;
};

export const deleteNote = async (noteId: Note["id"]): Promise<Note> => {
  const response = await nextServer.delete<Note>(`/notes/${noteId}`, {});
  return response.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const response = await nextServer.get<Note>(`/notes/${id}`, {});
  return response.data;
};

export const register = async (data: RegisterRequest) => {
  const response = await nextServer.post<User>("/auth/register", data);
  return response.data;
};

export const login = async (data: LoginRequest) => {
  const response = await nextServer.post<User>("/auth/login", data);
  return response.data;
};

export const checkSession = async () => {
  const response = await nextServer.get<CheckSessionRequest>("/auth/session");
  return response.data.success;
};

export const getMe = async () => {
  const { data } = await nextServer.get<User>("/users/me");
  return data;
};

export const logout = async (): Promise<void> => {
  await nextServer.post("/auth/logout");
};

export const updateMe = async (payload: UpdateUserRequest) => {
  const response = await nextServer.patch<User>("/users/me", payload);
  return response.data;
};
