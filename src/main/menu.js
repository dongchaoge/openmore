const {
  app,
  Menu
} = require('electron')
const template = [
  {
    label: '编辑',
    role: 'editMenu'
  },
  {
    label: '视图',
    submenu: [{
        role: 'reload'
      },
      {
        role: 'forcereload'
      },
      {
        role: 'toggledevtools'
      },
      {
        type: 'separator'
      },
      {
        role: 'resetzoom'
      },
      {
        role: 'zoomin'
      },
      {
        role: 'zoomout'
      },
      {
        type: 'separator'
      },
      {
        role: 'togglefullscreen'
      }
    ]
  }, {
  label: '帮助',
  submenu: [{
    label: '没有帮助',
    click() { // 绑定事件
      console.log('帮助')
    }
  }]
}]
if (process.platform === 'darwin') {
  //macos
  template.unshift({
    label: app.getName(),
    submenu: [{
        role: 'about'
      },
      {
        type: 'separator'
      },
      {
        role: 'services'
      },
      {
        type: 'separator'
      },
      {
        role: 'hide'
      },
      {
        role: 'hideothers'
      },
      {
        role: 'unhide'
      },
      {
        type: 'separator'
      },
      {
        role: 'quit'
      }
    ]
  })
}
const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)