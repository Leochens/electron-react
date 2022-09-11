const {app,BrowserWindow} = require('electron')
const path = require('path')
const url = require('url')

let mainWindow

function createWindow() {
    mainWindow = new BrowserWindow({width: 800,height:600})

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