import CategorysContextWrapper from '../CategoriesContext';
import CategoriesTree from './CategoriesTree';
import CreateRootCategory from './CreateRootCategory';
import './Navbar.scss';

export default function Navbar() {
  return (
    <div className="navbar">
      <CategorysContextWrapper>
        <CategoriesTree />
        <CreateRootCategory />
      </CategorysContextWrapper>
    </div>
  );
}
