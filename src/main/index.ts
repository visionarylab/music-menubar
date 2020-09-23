import path from "path";
import url from "url";
import { app, ipcMain } from "electron";
import is from "electron-is";
import { menubar, Menubar } from "menubar";
import { autoUpdater } from "electron-updater";

autoUpdater.checkForUpdatesAndNotify();

let mb: Menubar;

app.commandLine.appendSwitch("ignore-certificate-errors");

ipcMain.on("notify", () => {
  mb.tray.setImage(path.resolve(__dirname, "cassette.png"));
});

app.on("ready", () => {
  mb = menubar({
    index: is.dev()
      ? // ? `http://localhost:${process.env.ELECTRON_WEBPACK_WDS_PORT}`
        "http://localhost:8080"
      : url.format({
          pathname: path.join(__dirname, "index.html"),
          protocol: "file:",
          slashes: true,
        }),
    icon: path.resolve(__dirname, "cassette.png"),
    tooltip: "menubar",
    browserWindow: {
      //   transparent: true,
      //   resizable: false,
      //   fullscreenable: false,
      width: 500,
      height: 600,
      webPreferences: {
        nodeIntegration: true,
      },
    },
    showOnAllWorkspaces: false,
    // preloadWindow: true,
  });

  mb.on("after-create-window", () => {
    if (is.dev()) {
      mb.window?.webContents.openDevTools({ mode: "undocked" });
    }
  });

  mb.on("after-show", () => {
    mb.tray.setImage(path.resolve(__dirname, "cassette.png"));
  });

  // mb.window?.webContents.on("new-window", function (e, url) {
  //   e.preventDefault();
  //   require("electron").shell.openExternal(url);
  // });
});

app.on("window-all-closed", (event: Event) => {
  app.dock.hide();
  event.preventDefault();
});
