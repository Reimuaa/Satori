////////////////////////
// 这个东西负责翻页    //
////////////////////////

let nowPage=1

/**
 * 删除父元素的所有子元素
 * @param {*} fatherElemnet 父元素
 */
function rmAllChild(fatherElemnet){
	while(fatherElemnet.firstChild != null){
		fatherElemnet.removeChild(fatherElemnet.firstChild)
	}
}

/**
 * 读取外部txt文件
 * @param {string} path 文件路径
 * @param {(string)=>void} handel 回调函数 
 */
function readTxt(path, handel){
	var xhr = new XMLHttpRequest();
	xhr.open("GET", path, false);
	xhr.onreadystatechange = function() {
	  if (xhr.readyState === 4 && xhr.status === 200) {
		var text = xhr.responseText
		handel(text)
	  }
	};
	xhr.send();
}

/**
 * 将文本转换为按行被<p>元素包裹的文本,并加到父节点上
 * <p>元素似乎是你在css里定义的东西
 * @param {*} fatherElemnet 父节点
 * @param {*} text 文本
 */
function loadText(fatherElemnet, text){
	let arr = text.split('\n')
	for(var i=0;i<arr.length;i++){
		const chird = document.createElement('p')
		chird.textContent = arr[i]
		fatherElemnet.appendChild(chird)
	}
}

/**
 * 更新内容
 */
export function reflshContent(){
	const fatherElemnet = document.getElementById('content')
	rmAllChild(fatherElemnet)
	let txt = document.createElement('label')
	readTxt('./txt/' + nowPage + '.txt', (text)=>{
		loadText(txt, text)
	})
	fatherElemnet.appendChild(txt)
	if(nowPage == 1){
		let button = document.createElement('p')
		let _button = document.createElement('button')
		_button.onclick = nextPage
		_button.textContent = '翻……'
		button.appendChild(_button)
		fatherElemnet.appendChild(button)
	}else if(nowPage == 2){
		let href = document.createElement('p')
		let _href = document.createElement('a')
		_href.href = '后记.html'
		_href.textContent = '后记'
		href.appendChild(_href)
		fatherElemnet.appendChild(href)
	}
}

/**
 * 翻页
 */
function nextPage(){
	nowPage++
	reflshContent()
}