import Note from './note';

type Category = {
  id: string;
  name: string;
  notes: Note['id'][];
  subcategories: Category[];
};

export default Category;
