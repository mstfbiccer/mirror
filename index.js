const { app, BrowserWindow, desktopCapturer, screen } = require('electron')
const path = require('path')
let win;

const createWindow = () => {
  let display = screen.getPrimaryDisplay();
  let width = display.bounds.width;
  let height = display.bounds.height;


  win = new BrowserWindow({
    width: 500,
    height: 350,
    webPreferences: {
      preload: path.join(__dirname, './preload.js'),
    },
    x: width - 500,
    y: height - 400,
    movable:true,
    resizable: false,
    alwaysOnTop: true
  })

  win.loadFile('index.html')
  
}
app.whenReady().then(() => {
  createWindow();
  
})
desktopCapturer.getSources({ types: ['window','screen', ]}).then(async sources => {
  for (const source of sources) {
    if(source.name.indexOf("Google Meet") >= 0 || source.name.indexOf('Meet –') >= 0) {
      win.webContents.send('SET_SOURCE', source.id)
      return;
    }
  }
  win.webContents.send('SET_SOURCE', null)
}).catch((err) => {
  console.log(err);
})