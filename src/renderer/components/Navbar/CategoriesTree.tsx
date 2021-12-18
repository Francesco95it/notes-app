import { useCategories } from '../CategoriesContext';
import CategoryLink from './CategoryLink';

export default function CategoriesTree() {
  const { categories } = useCategories();
  return (
    <div className="categories-tree">
      {categories.map((category) => (
        <CategoryLink key={category.id} category={category} />
      ))}
    </div>
  );
}
