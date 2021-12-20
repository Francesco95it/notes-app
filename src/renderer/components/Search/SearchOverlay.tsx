import Note from 'model/note';
import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import { useHistory } from 'react-router';
import Search from '../../Icons/Search';
import { useNotes } from '../Note/NotesContext';
import './SearchOverlay.scss';

type SearchOverlayState = {
  isOpen: boolean;
  type: 'tags' | 'text';
};

type SearchOverlayContextType = {
  setIsOpen: (isOpen: boolean) => void;
};

const SearchOverlayContext = createContext<SearchOverlayContextType>({
  setIsOpen: () => {},
});

const useSearchOverlay = () => {
  return useContext(SearchOverlayContext);
};

function SearchEntries({ notes }: { notes: Note[] }) {
  const history = useHistory();
  const { setIsOpen } = useSearchOverlay();
  const redirectToNote = (noteId: string) => {
    setIsOpen(false);
    history.push(`/${noteId}`);
  };

  return (
    <div className="search-overlay-entries">
      {notes.map((note) => (
        <button
          key={note.id}
          type="button"
          className="search-overlay-entry"
          onClick={() => redirectToNote(note.id)}
        >
          <h4>{note.title}</h4>
          <div className="search-overlay-entry__tags">
            {note.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
        </button>
      ))}
    </div>
  );
}

function SearchByTags({
  searchText,
  notes,
}: {
  searchText: string;
  notes: Note[];
}) {
  const searchTags = searchText.split(' ').map((tag) => tag.trim());
  const matchingNotes = notes.filter((note) =>
    note.tags.some((tag) =>
      searchTags.some((searchTag) =>
        tag.toLowerCase().includes(searchTag.toLowerCase())
      )
    )
  );
  return <SearchEntries notes={matchingNotes} />;
}

function SearchByText({
  searchText,
  notes,
}: {
  searchText: string;
  notes: Note[];
}) {
  const splittedText = searchText.split(' ').map((text) => text.trim());
  const matchingNotes = notes.filter((note) =>
    splittedText.some(
      (text) =>
        note.title.toLowerCase().includes(text.toLowerCase()) ||
        note.content.toLowerCase().includes(text.toLowerCase())
    )
  );
  return <SearchEntries notes={matchingNotes} />;
}

function SearchBody({
  searchType,
}: {
  searchType: SearchOverlayState['type'];
}) {
  const [searchText, setSearchText] = useState('');
  const { notes } = useNotes();
  const { setIsOpen } = useSearchOverlay();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const inputHtml: HTMLInputElement | null = inputRef.current;
    if (inputHtml) {
      inputHtml.focus();
    }
  }, []);

  return (
    <>
      <div className="search-overlay__header">
        <Search />
        <input
          ref={inputRef}
          type="text"
          placeholder={`Search by ${searchType}`}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Escape') {
              setIsOpen(false);
            }
          }}
        />
      </div>
      <div className="search-overlay__body">
        {searchType === 'tags' && (
          <SearchByTags searchText={searchText} notes={notes} />
        )}
        {searchType === 'text' && (
          <SearchByText searchText={searchText} notes={notes} />
        )}
      </div>
    </>
  );
}

export default function SearchOverlay() {
  const [searchOverlay, setSearchOverlay] = useState<SearchOverlayState>({
    isOpen: false,
    type: 'tags',
  });

  const setIsOpen = (isOpen: boolean) => {
    setSearchOverlay({ ...searchOverlay, isOpen });
  };

  useHotkeys('command+T, ctrl+T', () => {
    setSearchOverlay((prevSearch) => {
      return {
        isOpen: !prevSearch.isOpen,
        type: 'tags',
      };
    });
  });

  useHotkeys('command+F, ctrl+F', () => {
    setSearchOverlay((prevSearch) => {
      return {
        isOpen: !prevSearch.isOpen,
        type: 'text',
      };
    });
  });

  useHotkeys('esc', () => {
    setSearchOverlay((prevSearch) => {
      return {
        ...prevSearch,
        isOpen: false,
      };
    });
  });

  if (!searchOverlay.isOpen) return null;

  return (
    <div className="search-overlay">
      <SearchOverlayContext.Provider value={{ setIsOpen }}>
        <SearchBody searchType={searchOverlay.type} />
      </SearchOverlayContext.Provider>
    </div>
  );
}
