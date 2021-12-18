import React, { useContext, useState } from 'react';
import Note from 'model/note';

const initialState: Note[] = [
  {
    id: '1',
    title: 'Note del',
    content: 'Note 1 content',
    tags: ['tag1', 'tag2'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Boh',
    content: 'Note 1 content',
    tags: ['tag1', 'tag2'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

type NoteContextType = {
  notes: Note[];
  setNotes: React.Dispatch<React.SetStateAction<Note[]>>;
};

export const NotesContext = React.createContext<NoteContextType>({
  notes: initialState,
  setNotes: () => {},
});
export const useNotes = () => {
  return useContext(NotesContext);
};

const NotesContextWrapper: React.FC = ({ children }) => {
  const [notes, setNotes] = useState(initialState);
  return (
    <NotesContext.Provider value={{ notes, setNotes }}>
      {children}
    </NotesContext.Provider>
  );
};

export default NotesContextWrapper;
