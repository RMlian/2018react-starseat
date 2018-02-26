const isScroll = {
	//滑动配置项
	isScrollStop:true,  //页面是否停止滚动 防止屏幕有滑动但还没到底部就开始加载数据
	isMoveDown:false,  //防止手指向上滑动屏幕开始加载数据
 	isLoading:false,   //防止异步请求数据未返回到前端的时候重复提交请求
    isMoved:false,   //手指是否在滑动屏幕 防止出现手指触摸屏幕而没有滑动就加载数据
	startY:0,
	startX:0,
	index:1,//页数
	scrolltH:0,
	scrolltD:0,
	dH:0,
	morAvaliable:true,//标识还有数据可以加载

	//手机下滑分页效果
	scrollpage:function(){
		document.onscroll = function(){
			isScroll.srcollEvent();
		}
		document.ontouchstart = function(){
			isScroll.startEvent();
		}
		document.ontouchmove = function(){
			isScroll.moveEvent();
		}
		document.ontouchcancel = function(){
			isScroll.stopEvent();
		}
		document.ontouchend = function(){
			isScroll.stopEvent();
		}
	},
	srcollEvent:function(){
		isScroll.scrolltD = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
		if(isScroll.scrolltD > 0) {
	        isScroll.isScrollStop = false;
	    }
	},
	startEvent:function(event){
		isScroll.startY = event.targetTouches[0].clientY;
	    isScroll.isScrollStop = true;
	    isScroll.isMoved = false;
	    isScroll.isMoveDown = false;
	},
	moveEvent:function(event) {                     
	    var Y = event.targetTouches[0].clientY;
	    if (isScroll.startY > Y) {
	        isScroll.isMoveDown = true;                
	    } else {
	        isScroll.isMoveDown = false;
	    }
		isScroll.isMoved = true;
	   
	},
	stopEvent:function(){
		isScroll.scrolltH = window.scrollTop;
		isScroll.dH = document.body.scrollHeight - window.screen.height;	
		console.log(isScroll.scrolltH);
		console.log(isScroll.dH);
	    if(isScroll.isScrollStop && isScroll.scrolltH>=isScroll.dH && isScroll.scrolltH !=0 && isScroll.dH !=0 && isScroll.isMoved && !isScroll.isLoading && isScroll.isMoveDown) {
	        // $('.loadding').show();
			if(isScroll.morAvaliable){
				isScroll.isLoading = true;    //异步加载数据之前先设置为正在等待数据
			    isScroll.index++;
			    var pageSize = isScroll.index;//构造要向后台提交需要的页数
			    //请在这里进行数据交互
			   	loadData(pageSize);
			    //此时数据已返回到前端
			    isScroll.isLoading = false;
			    isScroll.isMoved = false;
			} 
	    }
	}

}()