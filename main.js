const { app, BrowserWindow } = require("electron");
const path = require("path");

function createWindow() {
  const win = new BrowserWindow({
    width: 600,
    height: 400,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false // allows using require in renderer
    }
  });

  win.loadFile("index.html");
}

app.whenReady().then(createWindow);

// Quit app when all windows are closed
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});