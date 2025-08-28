import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchNotes, FetchNotesResponse } from '../../services/noteService';
import { useDebounce } from 'use-debounce';
import css from './App.module.css';

import SearchBox from '../SearchBox/SearchBox';
import Pagination from '../Pagination/Pagination';
import NoteList from '../NoteList/NoteList';
import NoteForm from '../NoteForm/NoteForm';
import Modal from '../Modal/Modal';

export default function App() {
  const [page, setPage] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [showModal, setShowModal] = useState<boolean>(false);
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500);
  const handleSearchChange = (newSearchTerm: string) => { setSearchTerm(newSearchTerm);
  setPage (1);
  };

  const { data, isLoading, isError } = useQuery<FetchNotesResponse>({
    queryKey: ['notes', page, debouncedSearchTerm],
    queryFn: () => fetchNotes({ page, search: debouncedSearchTerm }),
    placeholderData: (previousData) => previousData,
  });

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox searchTerm={searchTerm} setSearchTerm={handleSearchChange} />
        {data && data.totalPages > 1 && (
          <Pagination
            currentPage={page}
            totalPages={data.totalPages}
            onPageChange={setPage}
          />
        )}
        <button onClick={() => setShowModal(true)} className={css.button}>
          Create note +
        </button>
      </header>

      {isLoading && !data && <p>Loading...</p>}
      {isError && <p>Error fetching notes.</p>}
      {data && data.notes.length > 0 && <NoteList notes={data.notes} />}
      {data && data.notes.length === 0 && !isLoading && <p>No notes found.</p>}
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <NoteForm onClose={() => setShowModal(false)} />
        </Modal>
      )}
    </div>
  );
}