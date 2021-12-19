import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import App from '../renderer/App';

describe('App', () => {
  // eslint-disable-next-line jest/expect-expect
  it('renders without crashing', () => {
    render(<App />);
  });
});
