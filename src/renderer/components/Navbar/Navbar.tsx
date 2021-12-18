import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import CategorysContextWrapper, { useCategories } from '../CategoriesContext';
import CategoryLink from './CategoryLink';
import './Navbar.scss';

export default function Navbar() {
  return (
    <div className="navbar">
      <CategorysContextWrapper>
        <CategoriesTree />
        <CreateCategory />
      </CategorysContextWrapper>
    </div>
  );
}

const CreateCategory = () => {
  const [addInputToggle, setAddInputToggle] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null)
  const { categories, setCategories } = useCategories();

  const addCategory = (categoryName: string) => {
    const newCategory = {
      id: `${Date.now()}`,
      name: categoryName,
      subcategories: [],
      notes: [],
    };
    setCategories([...categories, newCategory]);
    setAddInputToggle(false);
  };

  useEffect(() => {
    if(addInputToggle) {
      inputRef.current?.focus();
    }
  }, [addInputToggle])

  return (
  <div>
    {
      !addInputToggle ?
      <button
        className='add-category-btn'
        onClick={() => setAddInputToggle(true)}>Add new folder</button>
      :
      <input
        type='text' placeholder='Add new folder'
        className='add-category-input' ref={inputRef}
        onBlur={({ target }) => target.value !== '' ? addCategory(target.value) : setAddInputToggle(false)} />
    }
  </div>);
}

const CategoriesTree = () => {
  const { categories } = useCategories();
  return (
    <div className="categories-tree">
      {categories.map(category => (
        <CategoryLink key={category.id} category={category} />
      ))}
    </div>
  );
};
