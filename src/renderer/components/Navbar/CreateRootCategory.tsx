import { useEffect, useRef, useState } from 'react';
import { baseFatherCategory } from '../../constants';
import { useCategories } from '../CategoriesContext';

export default function CreateRootCategory() {
  const [addInputToggle, setAddInputToggle] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { categories, setCategories } = useCategories();

  const addCategory = (categoryName: string) => {
    const newCategory = {
      id: `${Date.now()}`,
      name: categoryName,
      fatherCategory: baseFatherCategory,
      notes: [],
    };
    setCategories([...categories, newCategory]);
    setAddInputToggle(false);
  };

  useEffect(() => {
    if (addInputToggle) {
      inputRef.current?.focus();
    }
  }, [addInputToggle]);

  return (
    <div>
      {!addInputToggle ? (
        <button
          type="button"
          className="add-category-btn"
          onClick={() => setAddInputToggle(true)}
        >
          Add new folder
        </button>
      ) : (
        <input
          type="text"
          placeholder="Add new folder"
          className="add-category-input"
          ref={inputRef}
          onBlur={({ target }) =>
            target.value !== ''
              ? addCategory(target.value)
              : setAddInputToggle(false)
          }
        />
      )}
    </div>
  );
}
