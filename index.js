const { app, BrowserWindow, desktopCapturer, screen } = require('electron')
const path = require('path')
let win;

// Create a new BrowserWindow when `app` is ready.
const createWindow = () => {
  // get the primary display resolution.
  let display = screen.getPrimaryDisplay();
  let width = display.bounds.width;
  let height = display.bounds.height;

  // Create the browser window.
  win = new BrowserWindow({
    width: 500,
    height: 350,
    // preaload script to access nodejs api in renderer process.
    webPreferences: {
      preload: path.join(__dirname, './preload.js'),
    },
    // window position set to bottom right corner. 
    x: width - 500,
    y: height - 400,
    movable:true,
    resizable: false,
    alwaysOnTop: true
  })

  // Load index.html into the new BrowserWindow.
  win.loadFile('index.html')
  
}
app.whenReady().then(() => {
  // Create a new window after electron is ready.
  createWindow();
  
})

// get the sources and send it to renderer process.
desktopCapturer.getSources({ types: ['window','screen', ]}).then(async sources => {
  for (const source of sources) {
    if(source.name.indexOf("Google Meet") >= 0 || source.name.indexOf('Meet –') >= 0) {
      // send the source id to renderer process.
      win.webContents.send('SET_SOURCE', source.id)
      return;
    }
  }
  // if no source found, send the null value to renderer process.
  win.webContents.send('SET_SOURCE', null)
}).catch((err) => {
  console.log(err);
})