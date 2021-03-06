import React, { useContext, useState } from 'react';
import Note from 'model/note';

const initialState: Note[] = [
  {
    id: '1',
    title: 'Test note',
    content: 'Test note content',
    tags: ['tag1', 'tag2'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

type NoteContextType = {
  notes: Note[];
  setNotes: (notes: Note[]) => void;
};

export const NotesContext = React.createContext<NoteContextType>({
  notes: initialState,
  setNotes: () => {},
});
export const useNotes = () => {
  return useContext(NotesContext);
};

const NotesContextWrapper = ({ children }: { children: React.ReactNode }) => {
  const [notes, setNotes] = useState(
    window.electron.store.getNotes('notes') ?? initialState
  );

  const setAndSaveNotes = (newNotes: Note[]) => {
    setNotes(newNotes);
    window.electron.store.setNotes('notes', newNotes);
  };

  return (
    <NotesContext.Provider value={{ notes, setNotes: setAndSaveNotes }}>
      {children}
    </NotesContext.Provider>
  );
};

export default NotesContextWrapper;
