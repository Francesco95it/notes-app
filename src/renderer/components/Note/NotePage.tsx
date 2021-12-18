import Note from 'model/note';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useNotes } from './NotesContext';
import './NotePage.scss';

type RouteParams = {
  id: string;
};

export default function NotePage() {
  const { id } = useParams<RouteParams>();
  const { notes, setNotes } = useNotes();
  const [localNote, setLocalNote] = useState<Note | undefined>();

  useEffect(() => {
    const foundNote = notes.find((note) => note.id === id);
    setLocalNote(foundNote);
  }, [id, notes]);

  if (!localNote) {
    return <h2>Note not found</h2>;
  }

  const updateNote = () => {
    const otherNotes = notes.filter((note) => note.id !== id);
    setNotes([...otherNotes, localNote]);
  };

  return (
    <>
      <input
        className="note-title"
        value={localNote.title}
        type="text"
        onBlur={updateNote}
        onChange={({ target }) =>
          setLocalNote({
            ...localNote,
            title: target.value,
          })
        }
      />
      <textarea
        className="note-content"
        value={localNote.content}
        onBlur={updateNote}
        onChange={({ target }) =>
          setLocalNote({
            ...localNote,
            content: target.value,
          })
        }
      />
    </>
  );
}
