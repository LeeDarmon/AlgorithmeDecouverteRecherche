const {app, BrowserWindow } = require('electron');
const path = require('path')

function createWindows () {
    const win = new BrowserWindow({
        width: 800, //TODO : Changé la taille
        height: 600
    })

    win.loadFile( path.join(__dirname, '/pages/index.html') );
}

app.whenReady().then(() => {
    createWindows()
})

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
  })