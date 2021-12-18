import { MemoryRouter as Router, Switch, Route } from 'react-router-dom';
import icon from '../../assets/icon.svg';
import './App.scss';
import Navbar from './components/Navbar/Navbar';
import NotePage from './components/Note/NotePage';
import NotesContextWrapper from './components/Note/NotesContext';

export default function App() {
  return (
    <div className="wrapper">
      <NotesContextWrapper>
          <Router>
            <Navbar />
            <Switch>
              <div className="content">
                    <Route path="/:id" component={NotePage} />
                    <Route exact path="/" component={() => <h2>Select a note</h2>} />
              </div>
            </Switch>
          </Router>
      </NotesContextWrapper>
    </div>
  );
}
