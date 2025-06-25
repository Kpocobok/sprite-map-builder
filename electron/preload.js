// electron/preload.ts
var import_electron = require("electron");
import_electron.contextBridge.exposeInMainWorld("api", {
  openFolder: () => import_electron.ipcRenderer.invoke("dialog:openFolder")
});
