import { Link } from 'react-router-dom';
import Category from 'model/category';
import { useNotes } from '../Note/NotesContext';
import { useCategories } from '../CategoriesContext';

type Props = {
  category: Category;
};

export default function CategoryLink({ category }: Props) {
  const { notes } = useNotes();
  const toggleCategory = () => {};
  return (
    <li>
      <div className="category-btn-wrapper">
        <button type="button" className="category-btn" onClick={toggleCategory}>
          {category.name}
        </button>
      </div>
      {(category.subcategories.length > 0 || category.notes.length > 0) && (
        <ul>
          {category.notes.map((noteId) => {
            const foundNote = notes.find((note) => note.id === noteId);
            if (!foundNote) {
              return null;
            }
            return (
              <li className="note-entry-wrapper">
                <Link key={noteId} to={`/${noteId}`} className="note-entry">
                  {foundNote.title}
                </Link>
              </li>
            );
          })}
          {category.subcategories.map((subcategory) => (
            <CategoryLink key={subcategory.id} category={subcategory} />
          ))}
        </ul>
      )}
    </li>
  );
}

const DeleteCategoryBtn = ({ categoryId }: { categoryId: string }) => {
  return (
    <button type="button" className="category-delete-btn">
      x
    </button>
  );
};

const DeleteNoteBtn = ({
  categoryId,
  noteId,
}: {
  categoryId: string;
  noteId: string;
}) => {
  const { notes, setNotes } = useNotes();
  const { setCategories } = useCategories();

  const onClick = () => {
    const newNotes = notes.filter((note) => note.id !== noteId);
    setNotes(newNotes);
    // Set categories as well.
  };

  return (
    <button type="button" className="note-delete-btn" onClick={onClick}>
      x
    </button>
  );
};
