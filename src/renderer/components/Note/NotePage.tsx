import Note from 'model/note';
import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useNotes } from './NotesContext';
import './NotePage.scss';
import NoteTags from './NoteTags';

type RouteParams = {
  id: string;
};

export default function NotePage() {
  const { id } = useParams<RouteParams>();
  const { notes, setNotes } = useNotes();
  const [localNote, setLocalNote] = useState<Note | undefined>();

  const updateNote = useCallback(() => {
    if (localNote) {
      const otherNotes = notes.filter((note) => note.id !== id);
      setNotes([...otherNotes, localNote]);
    }
  }, [localNote, notes, setNotes, id]);

  const updateTags = (newTags: string[]) => {
    if (localNote) {
      const otherNotes = notes.filter((note) => note.id !== id);
      setNotes([
        ...otherNotes,
        {
          ...localNote,
          tags: newTags,
        },
      ]);
    }
  };

  useEffect(() => {
    const foundNote = notes.find((note) => note.id === id);
    setLocalNote(foundNote);
  }, [id, notes]);

  if (!localNote) {
    return <h2>Note not found</h2>;
  }

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
      <NoteTags tags={localNote.tags} onChange={updateTags} />
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
