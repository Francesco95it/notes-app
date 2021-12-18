import Category from 'model/category';
import React, { useContext, useState } from 'react';

const initialState: Category[] = [
  {
    id: '1',
    name: 'Gucci',
    notes: ['1'],
    fatherCategory: 'ROOT',
  },
  {
    id: '2',
    name: 'Pongo',
    notes: ['1'],
    fatherCategory: '1',
  },
  {
    id: '3',
    name: 'Cust ref',
    notes: ['1'],
    fatherCategory: '1',
  },
  {
    id: '4',
    name: 'Sopra',
    notes: [],
    fatherCategory: 'ROOT',
  },
  {
    id: '5',
    name: 'PoC',
    notes: ['2'],
    fatherCategory: '2',
  },
];

type CategoryContextType = {
  categories: Category[];
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
};

export const CategoriesContext = React.createContext<CategoryContextType>({
  categories: initialState,
  setCategories: () => {},
});
export const useCategories = () => {
  return useContext(CategoriesContext);
};

const CategoriesContextWrapper: React.FC = ({ children }) => {
  const [categories, setCategories] = useState(initialState);
  return (
    <CategoriesContext.Provider value={{ categories, setCategories }}>
      {children}
    </CategoriesContext.Provider>
  );
};

export default CategoriesContextWrapper;
