import Note from './note';

type Category = {
  id: string;
  name: string;
  notes: Note['id'][];
  fatherCategory: string;
};

export default Category;
