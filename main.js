const {
  app,
  BrowserWindow,
  clipboard,
  ipcMain,
  globalShortcut,
} = require("electron");
const path = require("path");
const { autoUpdater } = require("electron-updater");
let mainWindow;
let clipboardHistory = [];

autoUpdater.checkForUpdatesAndNotify();
autoUpdater.on("update-available", () => {
  mainWindow.webContents.send("update-available");
});
autoUpdater.on("update-downloaded", () => {
  mainWindow.webContents.send("update-downloaded");
});

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 400,
    height: 600,
    // icon: path.join(__dirname, "assets/icon.icns"),
    icon: "./assets/icon.icns",
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: true,
      preload: path.join(__dirname, "preload.js"),
    },
    titleBarStyle: "hiddenInset",
    vibrancy: "under-window",
    visualEffectState: "active",
    backgroundColor: "#00ffffff",
  });

  mainWindow.loadFile("src/index.html");

  // Start monitoring clipboard
  setInterval(() => {
    const clipboardText = clipboard.readText();
    if (clipboardText && !clipboardHistory.includes(clipboardText)) {
      clipboardHistory.unshift(clipboardText);
      mainWindow.webContents.send("clipboard-update", clipboardHistory);
    }
  }, 500);
}

app.whenReady().then(() => {
  createWindow();

  // Register global shortcut
  globalShortcut.register("CommandOrControl+Shift+V", () => {
    mainWindow.show();
  });
});

ipcMain.on("clear-history", () => {
  clipboardHistory = [];
  mainWindow.webContents.send("clipboard-update", clipboardHistory);
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
