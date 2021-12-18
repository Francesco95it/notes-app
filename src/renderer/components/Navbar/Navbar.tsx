import CategorysContextWrapper from '../CategoriesContext';
import CategoriesTree from './CategoriesTree';
import CreateCategory from './CreateCategory';
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
