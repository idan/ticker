'use strict'

let app = require('app')
let BrowserWindow = require('browser-window')

require('crash-reporter').start()

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('ready', () => {
  let protocol = require('protocol')
  protocol.registerStringProtocol('ticker-for-github', (request, callback) => {
    console.log(request.url)
    callback('handled protocol!')
  }, (err) => {
    if (!err) {
      console.log('registered protocol successfully')
    }
  })
  let mainWindow = new BrowserWindow()
  mainWindow.webContents.openDevTools()
  mainWindow.loadURL(`file://${__dirname}/src/client/index.html`)
  mainWindow.on('closed', () => (mainWindow = null))
})
