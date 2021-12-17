import { MemoryRouter as Router, Switch, Route } from 'react-router-dom';
import icon from '../../assets/icon.svg';
import './App.scss';
import Navbar from './components/Navbar';
import NotePage from './components/NotePage';

export default function App() {
  return (
    <div className="wrapper">
      <Navbar />
      <div className="content">
        <Router>
          <Switch>
            <Route path="/" component={NotePage} />
          </Switch>
        </Router>
      </div>
    </div>
  );
}
