const {app,BrowserWindow, ipcMain} = require('electron')
const path = require('path')
let mainWindow

function createWindow() {
    mainWindow = new BrowserWindow({width: 400,height:600,
    webPreferences:{
        preload: path.join(__dirname,'preload.js'),
        webSecurity: false,
        nodeIntegration: true,
        contextIsolation: false
    }})
    // mainWindow.loadFile('../')
    mainWindow.loadURL('http://localhost:3000/')
    mainWindow.on('closed',function(){
        mainWindow = null
    })
}
app.on('ready',createWindow)
app.on('window-all-closed',function(){
    if(process.platform !== 'darwin'){
        app.quit()
    }
})

app.on('activate',function(){
    // maxOS中点击Dock图标没有已打开的其余应用窗口时，则通常在应用中重建一个窗口
    if(mainWindow === null){
        createWindow()
    }
})
ipcMain.on("openRender",(event,avg)=>{
    let renderWindow = null
    const { width,height } = avg
    renderWindow = new BrowserWindow({width,height,webPreferences:{
        nodeIntegration: true,
        contextIsolation: false
    }}) 
    renderWindow.webContents.loadURL("http://localhost:3000")
})