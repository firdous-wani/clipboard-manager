const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("clipboardAPI", {
  onClipboardUpdate: (callback) => {
    ipcRenderer.on("clipboard-update", (event, data) => callback(data));
  },
  clearHistory: () => {
    ipcRenderer.send("clear-history");
  },
});
