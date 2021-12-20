import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import App from '../renderer/App';

describe('App', () => {
  beforeAll(() => {
    const useHotkeysMock = jest.spyOn(
      // eslint-disable-next-line
      require('react-hotkeys-hook'),
      'useHotkeys'
    );
    useHotkeysMock.mockImplementation(() => {});
  });
  // eslint-disable-next-line jest/expect-expect
  it('renders without crashing', () => {
    render(<App />);
  });
});
