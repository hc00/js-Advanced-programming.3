const EventUtil = {
	//监听事件
	addHandler: function(element, type, handler){
		if (element.addEventListener){		//alert('addEventListener')
			element.addEventListener(type, handler, false);
		} else if (element.attachEvent){
			element.attachEvent("on" + type, handler);
		} else {
			element["on" + type] = handler;
		}
	},
	//移除事件
	removeHandler: function(element, type, handler){
		if (element.removeEventListener){
			element.removeEventListener(type, handler, false);
		} else if (element.detachEvent){
			element.detachEvent("on" + type, handler);
		} else {
			element["on" + type] = null;
		}
	},
	//获取event对象
	getEvent: function(event){
		return event ? event : window.event;
	},
	//获取target对象
	getTarget: function(event){
		return event.target || event.srcElement;
	},
	//阻止默认行为
	preventDefault: function(event){
		 if (event.preventDefault) {
              //阻止默认浏览器动作(W3C) 
              event.preventDefault();
          }else {
              //IE中阻止函数器默认动作的方式 
              event.returnValue = false;
              return false;
          };
	},
	//组织冒泡
	stopPropagation: function(event){
		if (event.stopPropagation){
			event.stopPropagation();
		} else {
			event.cancelBubble = true;
		}
	},
	//获取相关元素
	getRelatedTarget: function(event){
		if (event.relatedTarget){
			return event.relatedTarget;
		} else if (event.toElement){
			return event.toElement;
		} else if (event.fromElement){
			return event.fromElement;
		} else {
			return null;
		}
	},
	//获取鼠标按钮对应值
	getButton: function(event){
		if (document.implementation.hasFeature("MouseEvents", "2.0")){
			return event.button;
		} else {
			switch(event.button){
				case 0:
				case 1:
				case 3:
				case 5:
				case 7:
					return 0;
				case 2:
				case 6:
					return 2;
				case 4:
					return 1;
			}
		}
	},
	//滚轮滚动时 detail 的属性值
	getWheelDelta: function(event){
		if (event.wheelDelta){
			return (client.engine.opera && client.engine.opera < 9.5 ? -event.wheelDelta : event.wheelDelta);
		} else {
			return -event.detail * 40;
		}
	},
	//获取输入的字符编码
	getCharCode: function(event){
		if (typeof event.charCode == "number"){
			return event.charCode;
		} else {
			return event.keyCode;
		}
	},
	//获取剪贴板数据
	getClipboardText: function(event){
		var clipboardData = (event.clipboardData || window.clipboardData);	//console.log(clipboardData)
		return clipboardData.getData("text");
	},
	//设置剪贴板数据
	setClipboardText: function(event, value){
		if (event.clipboardData){
			return event.clipboardData.setData("text/plain", value);
		} else if (window.clipboardData){
			return window.clipboardData.setData("text", value);
		}
	},

	clearClipboardText: function(event){
		var clipboardData = (event.clipboardData || window.clipboardData);
		return clipboardData.clearData();
	}

};
//节流防抖函数
function throttle(method, context = null,event = null) {	//console.log(event)
	clearTimeout(method.tId);
	method.tId= setTimeout(function(){					//console.log(event)
		method.call(context,event);
	}, 500);
};