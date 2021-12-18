import { useCategories } from '../CategoriesContext';
import CategoryLink from './CategoryLink';

export default function CategoriesTree() {
  const { categories } = useCategories();
  const rootCategories = categories.filter(
    (category) => category.fatherCategory === 'ROOT'
  );
  return (
    <div className="categories-tree">
      {rootCategories.map((category) => (
        <CategoryLink key={category.id} category={category} />
      ))}
    </div>
  );
}
