import { MemoryRouter as Router, Switch, Route } from 'react-router-dom';
import Note from 'model/note';
import Navbar from './components/Navbar/Navbar';
import NotePage from './components/Note/NotePage';
import NotesContextWrapper from './components/Note/NotesContext';
import './App.scss';

declare global {
  interface Window {
    electron: {
      store: {
        get: (key: string) => Note[];
        set: (key: string, val: Note[]) => void;
      };
    };
  }
}

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
