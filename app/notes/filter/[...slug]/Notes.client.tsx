"use client";

import css from "@/app/notes/filter/[...slug]/NotesPage.module.css"


import { useQuery, keepPreviousData } from '@tanstack/react-query'
import NoteList from "@/components/NoteList/NoteList";
import { fetchNotes } from "@/lib/api";
import { useState } from "react";
import Pagination from '@/components/Pagination/Pagination';
import SearchBox from '@/components/SearchBox/SearchBox';
import Modal from "@/components/Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";
import { useDebounce } from "use-debounce";
import { NoteTag } from "@/types/note";

type NotesClientProps = {
  tag?: NoteTag;
};

export default function NotesClient({tag}: NotesClientProps) {

  const perPage = 12;

  const [search, setSearch] = useState(""); // стан для пошуку
  const [page, setPage] = useState(1); // стан для пагінації
  const [isModalOpen, setIsModalOpen] = useState(false); // стан модального вікна
  const [debouncedSearch] = useDebounce(search, 1000); // стан затримки пошуку

  const { data, isSuccess} = useQuery({ // стан запиту
    queryKey: ["notes", page, debouncedSearch, tag],
    queryFn: () => fetchNotes(page, debouncedSearch, perPage, tag),
    placeholderData: keepPreviousData, // без блимання
    refetchOnMount: false,
  })

const handleSearchChange = (value: string) => {
  setSearch(value);
  setPage(1);
}
    const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
    <div className={css.app}>
	<header className={css.toolbar}>
          {/* Компонент SearchBox */
          <SearchBox value={search} onChange={handleSearchChange} />}
          
          {/* Пагінація */}
          {isSuccess && data?.totalPages > 1 && <Pagination totalPages={data.totalPages} currentPage={page} onPageChange={setPage} />}
          
          {/* Кнопка створення нотатки */
          <button className={css.button} onClick={openModal}>Create note +</button>}
        </header> 

        {data && data?.notes.length > 0 && <NoteList notes={data.notes} />}

        {isModalOpen && (<Modal onClose={closeModal}> <NoteForm onCancel={closeModal} /></Modal>)}
    </div>
    </>
  )
}