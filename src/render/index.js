const {
  Menu
} = require('electron').remote
const {
  remote,
  ipcRenderer,
  BrowserWindow
} = require('electron')
window.log = console.log;
const loading = {
  show:() => {
    document.querySelector('.loading_wrap').classList.remove('hide')
  },
  hide:() => {
    document.querySelector('.loading_wrap').classList.add('hide')
  }
}
document.querySelector('.topbar').addEventListener('click', () => {

})
document.querySelector('.created_btn').addEventListener('click', () => {
  const url = childUrl.value
  const number = +childNumber.value
  if (isNaN(number) || !number) {
    alert('个数请输入大于0的数字')
    return
  }
  if (!url.includes('http')) {
    url = 'http://' + url
  }
  loading.show()
  ipcRenderer.send('open-chind', {
    url,
    number
  })
})
ipcRenderer.on('open-chind-done', (event, arg) => {
  loading.hide()
})

{
  // 菜单项目
  let menus = [{
    label: '编辑',
    submenu: [{
        label: '复制',
        role: 'copy' // 调用内置角色实现对应功能
      },
      {
        label: '剪切',
        role: 'cut' // 调用内置角色实现对应功能
      }
    ]
  }]

  let m = Menu.buildFromTemplate(menus)
  // Menu.setApplicationMenu(m)
  // 绑定右键菜单
  window.addEventListener('contextmenu', (e) => {
    e.preventDefault()
    m.popup({
      window: remote.getCurrentWindow()
    })
  }, false)

};