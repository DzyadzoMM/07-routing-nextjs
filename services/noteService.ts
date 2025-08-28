import axios from 'axios';
import  {Note}  from '../types/note';

const API_BASE_URL = 'https://notehub-public.goit.study/api';
const TOKEN = process.env.VITE_NOTEHUB_TOKEN;

const instance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Authorization: `Bearer ${TOKEN}`,
  },
});

export interface FetchNotesResponse{
  notes: Note[];
  totalPages: number;
}
export interface FetchNotesParams {
  page?: number;
  perPage?: number;
  search?: string;
}

export const fetchNotes = async (params: FetchNotesParams = {}): Promise<FetchNotesResponse> => {
  const { data } = await instance.get<FetchNotesResponse>('/notes', { params });
  return data;
};

export interface CreateNotePayload {
  title: string;
  content: string;
  tag: string;
}

export const createNote = async (payload: CreateNotePayload): Promise<Note> => {
  const { data } = await instance.post<Note>('/notes', payload);
  return data;
};

export const deleteNote = async (id: string): Promise<{ id: string }> => {
  const { data } = await instance.delete<{id: string }>(`/notes/${id}`);
  return data;
};