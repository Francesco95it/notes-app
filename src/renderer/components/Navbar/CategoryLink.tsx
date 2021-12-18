import { Link } from 'react-router-dom';
import Category from 'model/category';
import { useNotes } from '../Note/NotesContext';
import { useCategories } from '../CategoriesContext';

const DeleteCategoryBtn = ({ categoryId }: { categoryId: string }) => {
  const { categories, setCategories } = useCategories();
  const deleteCategory = () => {
    const otherCategories = categories.filter(
      (category) => category.id !== categoryId
    );
    setCategories(otherCategories);
  };

  return (
    <button type="button" className="entry-delete-btn" onClick={deleteCategory}>
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
  const { categories, setCategories } = useCategories();

  const onClick = () => {
    const otherNotes = notes.filter((note) => note.id !== noteId);
    setNotes(otherNotes);
    const foundCategory = categories.find(
      (category) => category.id === categoryId
    );
    if (foundCategory) {
      const modifiedCategory = {
        ...foundCategory,
        notes: foundCategory.notes.filter((id) => id !== noteId),
      };
      const otherCategories = categories.filter(
        (category) => category.id !== categoryId
      );
      setCategories([...otherCategories, modifiedCategory]);
    }
  };

  return (
    <button type="button" className="entry-delete-btn" onClick={onClick}>
      x
    </button>
  );
};

type Props = {
  category: Category;
};

export default function CategoryLink({ category }: Props) {
  const { notes } = useNotes();
  const { categories } = useCategories();
  const childCategores = categories.filter(
    (otherCategory) => otherCategory.fatherCategory === category.id
  );
  // TODO: implement toggleCategory
  const toggleCategory = () => {};
  return (
    <li>
      <div className="category-btn-wrapper">
        <button type="button" className="category-btn" onClick={toggleCategory}>
          {category.name}
        </button>
        <DeleteCategoryBtn categoryId={category.id} />
      </div>
      {(childCategores.length > 0 || category.notes.length > 0) && (
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
                <DeleteNoteBtn categoryId={category.id} noteId={noteId} />
              </li>
            );
          })}
          {childCategores.map((subcategory) => (
            <CategoryLink key={subcategory.id} category={subcategory} />
          ))}
        </ul>
      )}
    </li>
  );
}
