const electron = require('electron')
const {
	app, // 控制应用生命周期的模块
	ipcMain,
	BrowserWindow // 创建原生浏览器窗口的模块
} = electron
// 保持一个对于 window 对象的全局引用，如果不这样做，
// 当 JavaScript 对象被垃圾回收， window 会被自动地关闭
let win
function createWindow() {
	// 创建浏览器窗口。
	win = new BrowserWindow({
		title: '工作台',
		// // width: 2580,
		// width: 800,
		// minWidth: 800,
		// // height: 1340,
		// height: 600,
		// minHeight: 600,

		width: 375,
		minWidth: 375,
		height: 667,
		minHeight: 667,
		show: false,
		// transparent:true,
		webPreferences: {
			nodeIntegration: true,
		},
		titleBarStyle: 'hiddenInset'
	})
	// 引入菜单模块
	require('./src/main/menu.js')
	// 加载应用的 index.html。
	// 这里使用的是 file 协议，加载当前目录下的 index.html 文件。
	// 也可以使用 http 协议，如 win.loadURL('http://nodejh.com')。
	// console.log(__dirname)
	win.loadFile('index.html')
	// win.loadURL('http://nodejh.com')
	// 启用开发工具。

	// win.webContents.openDevTools()

	win.once('ready-to-show', () => {
		win.show()
		// win.maximize()
		// createChindWindow({
		// 	url: 'http://test.huangjinx.com:8013/mobile',
		// 	number:3
		// })		
	})

	// 当 window 被关闭，这个事件会被触发。

	win.on('closed', () => {
		console.log('close-one')
		// 取消引用 window 对象，如果你的应用支持多窗口的话，
		// 通常会把多个 window 对象存放在一个数组里面，
		// 与此同时，你应该删除相应的元素。

		win = null
	})
}

function createChindWindow({
	url = '',
	number = 0,
	cb = () => {}
}) {	
	const {
		width,
		height
	} = electron.screen.getPrimaryDisplay().workAreaSize
	let i = 0
	const windowWidth = 375
	const windowHeight = 667
	const y = (height - windowHeight) / 2
	const firstX = windowWidth * number > width ? (width - windowWidth) / 2 : (width - windowWidth * number) / 2
	Array(number).fill().forEach((item, index) => {
		let child = new BrowserWindow({
			parent: win,
			width: windowWidth,
			minWidth: windowWidth,
			height: windowHeight,
			minHeight: windowHeight,
			x: firstX + windowWidth * index,
			y:y,
			webPreferences: {
				partition: `persist:c${Date.now()}`,
			},
			show: false
		})
		child.loadURL(url)
		child.once('ready-to-show', () => {
			++i
			child.show()
			if (i == number) {
				cb()
			}
		})
	})
}

ipcMain.on('open-chind', (event, arg) => {
	// console.log(arg)
	createChindWindow({
		url: arg.url,
		number: arg.number,
		cb:() => {
			event.reply('open-chind-done')
		}
	})	
})
// Electron 会在初始化后并准备
// 创建浏览器窗口时，调用这个函数。
// 部分 API 在 ready 事件触发后才能使用。

app.on('ready', createWindow)


// 当全部窗口关闭时退出。
app.on('window-all-closed', () => {
	// 在 macOS 上，除非用户用 Cmd + Q 确定地退出，
	// 否则绝大部分应用及其菜单栏会保持激活。
	if (process.platform !== 'darwin') {
		app.quit()
	}
})

app.on('activate', () => {
	// 在 macOS 上，当点击 dock 图标并且该应用没有打开的窗口时，
	// 绝大部分应用会重新创建一个窗口。
	if (win === null) {
		createWindow()
	}
})