const electron = {
  store: {
    getNotes: jest.fn(),
    setNotes: jest.fn(),
    getCategories: jest.fn(),
    setCategories: jest.fn(),
  },
};

const exWindow = window;
Object.defineProperty(global, 'window', {
  value: {
    ...exWindow,
    electron,
    HTMLIFrameElement: jest.fn(),
  },
  writable: true,
});
