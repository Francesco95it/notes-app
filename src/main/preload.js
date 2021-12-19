const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  ipcRenderer: {
    myPing() {
      ipcRenderer.send('ipc-example', 'ping');
    },
    on(channel, func) {
      const validChannels = ['ipc-example'];
      if (validChannels.includes(channel)) {
        // Deliberately strip event as it includes `sender`
        ipcRenderer.on(channel, (event, ...args) => func(...args));
      }
    },
    once(channel, func) {
      const validChannels = ['ipc-example'];
      if (validChannels.includes(channel)) {
        // Deliberately strip event as it includes `sender`
        ipcRenderer.once(channel, (event, ...args) => func(...args));
      }
    },
  },
  store: {
    getNotes(val) {
      const res = ipcRenderer.sendSync('electron-store-get', val);
      return res;
    },
    setNotes(property, val) {
      ipcRenderer.send('electron-store-set', property, val);
    },
    getCategories(val) {
      const res = ipcRenderer.sendSync('electron-store-get', val);
      return res;
    },
    setCategories(property, val) {
      ipcRenderer.send('electron-store-set', property, val);
    },
    // Other method you want to add like has(), reset(), etc.
  },
});
