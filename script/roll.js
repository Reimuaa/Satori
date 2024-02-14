////////////////////////
// 这个东西负责背景滚动 //
////////////////////////

const POS_ADD = 	0.495// 每次刷新时滚动距离
var basePlace = 0		// 基础位置,用来自适应屏幕大小居中
var pos = 0				// 当前位置
var direction = true	// 方向,向一侧滚动是true,另一侧是false
let windowWidth = window.innerWidth	// 窗口大小,计算距离时用

// 获取背景图片信息
let bgWidth
let img = new Image()
// css不懂捏,不知道怎么拿到图片路径……干脆自己炒一个吧……
img.src = './s.jpg'
img.onload = function() {
	bgWidth = this.width					// 图片宽度
	basePlace = (windowWidth - bgWidth) / 2	// 计算中心位置
}

/**
 * 更新背景图片
 */
async function bgUpdate() {
	setTimeout(()=>{
		moveUpdate()
		document.body.style.backgroundPosition = pos + basePlace + 'px 0'
		requestAnimationFrame(bgUpdate) 	// 每帧更新位置
	}, 0.1)
}

/**
 * 计算图片移动
 */
async function moveUpdate(){
	setTimeout(()=>{
		if(direction)pos += POS_ADD
		else pos -= POS_ADD
		if(pos + basePlace>=0)direction = false	
		else if(pos + basePlace<=(windowWidth-bgWidth)/2)direction = true
	}, 0.1)
}

export function background(){
	// 图片比屏幕宽时开始滚动
	// 存在问题:电脑突然把它的浏览器拉窄,类似手机的那种竖屏,图片不会滚动,这种情况太罕见了,我懒得解决了
	if(bgWidth > windowWidth){
		bgUpdate() 		// 更新图片显示
	}
}