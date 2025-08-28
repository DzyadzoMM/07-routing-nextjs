import axios from "axios";
import type { Note } from "@/types/note";

interface FetchResponse {
  notes: Note[];
  totalPages: number;
}

export async function fetchNotes(page: number = 1, search: string = "", perPage: number = 12): Promise<FetchResponse> {
    const response = await axios.get<FetchResponse>("https://notehub-public.goit.study/api/notes", //очікуємо дані формату FetchResponse
        {params: {page, search, perPage}, 
        headers: { Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`},}     )
    return response.data; }

export async function createNote(note: { title: string; content: string; tag: string }): Promise<Note> {
  const response = await axios.post<Note>("https://notehub-public.goit.study/api/notes", note,
  {headers: { Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`},}
  )
  return response.data;
}

export async function deleteNote(id: string): Promise<Note> {
  const response = await axios.delete<Note>(`https://notehub-public.goit.study/api/notes/${id}`,
        {headers: { Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`},}
  )
  return response.data;
}

export async function fetchNoteById(id: string): Promise<Note> {
  const response = await axios.get<Note>(`https://notehub-public.goit.study/api/notes/${id}`,
        {headers: { Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`},}
  )
  return response.data;
} 