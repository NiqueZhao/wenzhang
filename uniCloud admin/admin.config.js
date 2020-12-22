export default {
	login: {
		url: '/pages/login/login' // 登录页面路径
	},
	error: {
		url: '/pages/error/404' // 404 Not Found 错误页面路径
	},
	navBar: { // 顶部导航
		logo: '/static/logo.png', // 左侧 Logo
		links: [{ // 右侧链接
			text: 'Admin框架文档',
			url: 'https://uniapp.dcloud.net.cn/uniCloud/admin'
		}, {
			text: '浏览更多Admin插件',
			url: 'https://ext.dcloud.net.cn/?cat1=7&cat2=74'
		}],
		debug: {
			enable: process.env.NODE_ENV !== 'production', //是否显示错误信息
			engine: [{ // 搜索引擎配置（每条错误信息后，会自动生成搜索链接，点击后跳转至搜索引擎）
				name: '百度',
				url: 'https://www.baidu.com/baidu?wd=ERR_MSG'
			}, {
				name: '谷歌',
				url: 'https://www.google.com/search?q=ERR_MSG'
			}]
		}
	},
	sideBar: { // 左侧菜单
		// 配置静态菜单列表（放置在用户被授权的菜单列表下边）
		staticMenu: [{
			menu_id: "demo",
			name: '静态功能演示',
			icon: 'uni-icons-list',
			url: "",
			children: [{
				menu_id: "icons",
				name: '图标',
				icon: '',
				url: '/pages/demo/icons/icons',
			}, {
				menu_id: "table",
				name: '表格',
				icon: '',
				url: '/pages/demo/table/table',
			}]
		}]
	}
}
