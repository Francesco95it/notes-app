import Category from 'model/category';
import { useHistory } from 'react-router';
import { useCategories } from '../CategoriesContext';
import { useNotes } from './NotesContext';

function CreateNewNote({ category }: { category: Category }) {
  const history = useHistory();
  const { notes, setNotes } = useNotes();
  const { categories, setCategories } = useCategories();

  const addNote = () => {
    const newNote = {
      id: `${Date.now()}`,
      title: 'Untitled',
      content: '',
      tags: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setNotes([...notes, newNote]);
    const updatedCategory = {
      ...category,
      notes: [...category.notes, newNote.id],
    };
    const otherCategories = categories.filter(
      (otherCategory) => otherCategory.id !== category.id
    );
    setCategories([...otherCategories, updatedCategory]);
    history.push(`/${newNote.id}`);
  };

  return (
    <button type="button" className="add-note-btn" onClick={addNote}>
      +
    </button>
  );
}

export default CreateNewNote;
