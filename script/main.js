// 导入文件
import { reflshContent } from "./page.js";	// 这个文件用于翻页
import { background } from "./roll.js";		// 这个文件用于背景滚动

// 这个我希望马上执行,用于显示页面第一页的内容
reflshContent()

// 页面加载完成后开始执行的函数
window.onload = function() {
	background()
};