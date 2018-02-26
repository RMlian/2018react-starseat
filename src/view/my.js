import React, { Component } from 'react';
// import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import $ from "jquery";

import Bg2 from '../resource/images/bg-4.png';

import star1 from '../resource/images/stars/s-i-1.png';
import star2 from '../resource/images/stars/s-i-2.png';
import star3 from '../resource/images/stars/s-i-3.png';
import star4 from '../resource/images/stars/s-i-4.png';
import shescfull from '../resource/images/share-img.png';


import Utils from "../lib/utils";
import Config from "../config";

class My extends Component {
	constructor(props) {
        super(props);
        this.state = {
        	speed:500,
        	starinfo: {} // 分类属性
        	// starnum:'star-i-'//星座图片classname
        };
    }
    static contextTypes = {
        router: PropTypes.object.isRequired
    };
    componentDidMount() {
    	// 导航条显示
        $("li.title").text("魔法星座");
        $("li.ermenu").css("display", "block");
    	
    	// 星座详情
    	var token = "",date = "";
        if (typeof localStorage.token !== "undefined") {
            token = localStorage.token;
        } else {
            token = Utils.url.getParam("token");
        }

        date = Utils.url.getParam("dateval");
        if(date === "underfined"){
        	return false;
        }
        console.log(token);
        console.log(date);
        // 加载星座详情数据
        var t = this;
		$.ajax({
			url: Config.apiUrl + "/activity/star/signs",
			data: {date: date,token:token},
			success: function(data) {
				console.log(data.data);
				if (data.code === 0) {
					if(data.data !== null){
						t.setState({starinfo: data.data});
					}else{
						alert("数据正在规划中。。。");
					}
					
				}
			}
		});
		//运动事件监听
    	var lastX = null,lastY = null,lastZ = null;
     	var threshold = 3; //灵敏度（值越小灵敏度越高）
     	var timeout = 1000,lastTime = null,isShaking = !1;
		if (window.DeviceMotionEvent) {
		    // 摇一摇事件
		    window.addEventListener('devicemotion',function(event){
		    	var current = event.accelerationIncludingGravity;
		    	var currentTime,timeDifference,deltaX = 0,deltaY = 0,deltaZ = 0;
		    	//记录上一次设备在x,y,z方向上的加速度 
	            if((lastX === null) && (lastY === null) && (lastZ === null)) {
	                 lastX = current.x;
	                 lastY = current.y;
	                 lastZ = current.z;
	                return;
	            }
		          
		         //得到两次移动各个方向上的加速度绝对差距
	             deltaX = Math.abs(lastX - current.x);
	             deltaY = Math.abs(lastY - current.y);
	             deltaZ = Math.abs(lastZ - current.z);
	             //当差距大于设定的阀值并且时间间隔大于指定阀值时，触发摇一摇逻辑
	             if (((deltaX > threshold) && (deltaY > threshold)) || ((deltaX > threshold) && (deltaZ > threshold)) || ((deltaY > threshold) && (deltaZ > threshold))) {
	                currentTime = new Date();
	                timeDifference = currentTime.getTime() - lastTime.getTime();
	                //时间间隔
	                if (timeDifference > timeout) {
	                    //触发摇一摇事件
	                    // alert($('.shakebox').hasClass('shakeboxshow'));
	                    if($('.shakebox').hasClass('shakeboxshow') === true){ 
	                    	isShaking = !0;           
		                    if(isShaking){
		                   	 	$('div.shakebox').addClass('shake_box_focus');
		                	}
		                    //加载摇一摇数据
							$.ajax({
								url: Config.apiUrl + "/activity/star/shake",
								data: {token:token},
								success: function(data) {
									// alert(data);
									if (data.code === 0) {
										if(data.data !== null){
											if(data.data.AQ === "S"){
												$('div.itstars').children('img').eq(3).addClass('us');
												$('div.itstars').children('img').eq(3).attr("data-d",data.data.AQ);
												$('div.itstars').children('img').eq(3).removeClass('uy ux uz');
											}else if(data.data.AQ === "Y"){
												$('div.itstars').children('img').eq(3).addClass('uy');
												$('div.itstars').children('img').eq(3).attr("data-d",data.data.AQ);
												$('div.itstars').children('img').eq(3).removeClass('us ux uz');
											}else if(data.data.AQ === "X"){
												$('div.itstars').children('img').eq(3).addClass('ux');
												$('div.itstars').children('img').eq(3).attr("data-d",data.data.AQ);
												$('div.itstars').children('img').eq(3).removeClass('uy us uz');
											}else if(data.data.AQ === "Z"){
												$('div.itstars').children('img').eq(3).addClass('uz');
												$('div.itstars').children('img').eq(3).attr("data-d",data.data.AQ);
												$('div.itstars').children('img').eq(3).removeClass('uy ux us');
											}

											if(data.data.SY === "S"){
												$('div.itstars').children('img').eq(2).addClass('us');
												$('div.itstars').children('img').eq(2).attr("data-d",data.data.SY);
												$('div.itstars').children('img').eq(2).removeClass('uy ux uz');
											}else if(data.data.SY === "Y"){
												$('div.itstars').children('img').eq(2).addClass('uy');
												$('div.itstars').children('img').eq(2).attr("data-d",data.data.SY);
												$('div.itstars').children('img').eq(2).removeClass('us ux uz');
											}else if(data.data.SY === "X"){
												$('div.itstars').children('img').eq(2).addClass('ux');
												$('div.itstars').children('img').eq(2).attr("data-d",data.data.SY);
												$('div.itstars').children('img').eq(2).removeClass('uy us uz');
											}else if(data.data.SY === "Z"){
												$('div.itstars').children('img').eq(2).addClass('uz');
												$('div.itstars').children('img').eq(2).attr("data-d",data.data.SY);
												$('div.itstars').children('img').eq(2).removeClass('uy ux us');
											}

											if(data.data.JK === "S"){
												$('div.itstars').children('img').eq(1).addClass('us');
												$('div.itstars').children('img').eq(1).attr("data-d",data.data.JK);
												$('div.itstars').children('img').eq(1).removeClass('uy ux uz');
											}else if(data.data.JK === "Y"){
												$('div.itstars').children('img').eq(1).addClass('uy');
												$('div.itstars').children('img').eq(1).attr("data-d",data.data.JK);
												$('div.itstars').children('img').eq(1).removeClass('us ux uz');
											}else if(data.data.JK === "X"){
												$('div.itstars').children('img').eq(1).addClass('ux');
												$('div.itstars').children('img').eq(1).attr("data-d",data.data.JK);
												$('div.itstars').children('img').eq(1).removeClass('uy us uz');
											}else if(data.data.JK === "Z"){
												$('div.itstars').children('img').eq(1).addClass('uz');
												$('div.itstars').children('img').eq(1).attr("data-d",data.data.JK);
												$('div.itstars').children('img').eq(1).removeClass('uy ux us');
											}

											if(data.data.CY === "S"){
												$('div.itstars').children('img').eq(0).addClass('us');
												$('div.itstars').children('img').eq(0).attr("data-d",data.data.CY);
												$('div.itstars').children('img').eq(0).removeClass('uy ux uz');
											}else if(data.data.CY === "Y"){
												$('div.itstars').children('img').eq(0).addClass('uy');
												$('div.itstars').children('img').eq(0).attr("data-d",data.data.CY);
												$('div.itstars').children('img').eq(0).removeClass('us ux uz');
											}else if(data.data.CY === "X"){
												$('div.itstars').children('img').eq(0).addClass('ux');
												$('div.itstars').children('img').eq(0).attr("data-d",data.data.CY);
												$('div.itstars').children('img').eq(0).removeClass('uy us uz');
											}else if(data.data.CY === "Z"){
												$('div.itstars').children('img').eq(0).addClass('uz');
												$('div.itstars').children('img').eq(0).attr("data-d",data.data.CY);
												$('div.itstars').children('img').eq(0).removeClass('uy ux us');
											}
										}else{
											alert("数据正在规划中。。。");
										}
										
									}
								}
							});

		                    setTimeout(function () {
				                 isShaking = !1;
				                 $('div.itstars').show();
				                 setTimeout(function () {
						             $('div.shakebox').animate({bottom:"-100px"}).hide();
						             $('div.enter-share').addClass('entersharebox');
					             }, 1200);
				            },3000);
		                    lastTime = new Date();
		                }
	                }
	             }
	             lastX = current.x;
	             lastY = current.y;
	             lastZ = current.z;

		    },false);

		    lastTime = new Date();
		}else{
			alert('您好，你目前所用的设备好像不支持重力感应哦！');
		}
    	
    }

    // 点击星座符号
    starzmask = (e) => {
        $('div.star-imgmark').addClass('amintebox');
        $('div.leftmy,div.itdetail').addClass('starleft');
        $('div.shakebox').addClass('shakeboxshow');
    }

    //分享星语
    //分享蒙层
    showSharebox = (e) =>{
    	$('div.mask').show();
    	$('div.sharebox').animate({bottom:"0"}).css({'display':"table"});
        this.sharesuccessfull();
    	//判断打开app
		var ua = navigator.userAgent; 
		var isAndroid = ua.indexOf('Android') > -1 || ua.indexOf('Adr') > -1; //android终端
		var isiOS = !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
		var title="魔法星座";
		var content = "我在【花狸APP】使用【魔法星座】， 探索了近期的运势，天机不可泄漏，我 只告诉你一个人，感情深，测的真。";
		console.log(title);
		console.log(content);

		// 调用app内分享功能
		if(isAndroid){
			// android.share(title,content);//android
		}
		if(isiOS){
			// var shareArray = new Object();
			// shareArray.title = title;
			// shareArray.content = content;
			// var shareJson = JSON.stringify(shareArray);
			// window.webkit.messageHandlers.share.postMessage(shareJson);//ios
		}

    } 
    //分享蒙层
    closeSharebox = (e) =>{
    	$('div.mask').hide();
    	$('div.sharebox').animate({bottom:"0"}).css({'display':"none"});
    	$('div.sharesuccfullbox').hide();
    } 

    //app内分享成功回调方法
    sharesuccessfull = () =>{
    	$('div.mask').show();
    	$('div.sharesuccfullbox').show();
    }

    // 返回查看解读
    backResult = () =>{
    	$('div.mask').hide();
    	$('div.sharesuccfullbox').hide();
    	this.closeSharebox();
    	$('div.enter-share').removeClass('entersharebox');

    	//解读接口数据
    	var token = Utils.url.getParam("token");
    	var sname = $('.itstars').attr('data-name');
    	var sy = $("[data-tag='sy']").attr('data-d');
    	var cy = $("[data-tag='cy']").attr('data-d');
    	var jk = $("[data-tag='jk']").attr('data-d');
    	var aq = $("[data-tag='aq']").attr('data-d');
    	var stars = 20;
    	if(token !== 'undefined' && sname !== "undefined" && sy !== "undefined" && cy !== "undefined" && jk !== "undefined" && aq !== "undefined"){
    		$.ajax({
				url: Config.apiUrl + "/activity/star/analy",
				data: {star_name:sname,SY:sy,CY:cy,JK:jk,AQ:aq,token:token},
				success: function(data) {
					if (data.code === 0) {
						if(data.data !== null){
							alert(data.data.sid);
							$('div.itstars').addClass('aminterotatebox');
							setTimeout(function(){
								$('div.itstars').removeClass('aminterotatebox');
								$('div.itstars').addClass('amintescalebox');
								setTimeout(function(){
									$('div.itstars').addClass('aminteyhbox');
									for(var i=1;i<stars;i++){
										$('div.aminteyhbox').append('<i d="'+i+'"></i>');
									}
									setTimeout(function(){
										$('div.aminteyhbox').children('i').remove();
						            	if(data.data.sid !== "underfined"){
						            		var path = '/constellation/historydetails?starsid='+data.data.sid;
						            		alert(path);
        								    window.location.href = path;
						            	}else{
						            		alert('缺少参数sid');
						            	}
						            },2000);
								},1500);
							},3000);
						}else{
							alert("数据正在规划中。。。");
						}	
					}
				}
			});
    	}else{
    		console.log("缺少参数");
    	}
		
    }

	render() {
		return (
			<div className="container bgbox">
			 	<div className="bg" ><img src={Bg2} alt="我的星座背景" /></div>
			 	<div className="starseatcon">
			 		<div className="leftmy">
			 			<p><span>守护星</span>{this.state.starinfo.ruler}</p>
			 			<p><span>幸运石</span>{this.state.starinfo.lucky_stone}</p>
			 		</div>
			 		<div className="star-imgmark" onClick={this.starzmask}>
			 			<i className={'star-i-'+this.state.starinfo.id}></i>
			 		</div>
			 		<div className="itstars" data-name={this.state.starinfo.name}>
						<img data-tag="cy" src={star1} alt="yellow" />
						<img data-tag="jk" src={star2} alt="green" />
						<img data-tag="sy" src={star4} alt="blue" />
						<img data-tag="aq" src={star3} alt="red" />
			 		</div>
			 		<div className="itdetail">
			 			<p>{this.state.starinfo.name}-{this.state.starinfo.stars}</p>
			 			<p>幸运石：{this.state.starinfo.lucky_stone}</p>
			 			<p>守护星：{this.state.starinfo.ruler}</p>
			 			<p>{this.state.starinfo.name}的你：{this.state.starinfo.content}</p>
			 		</div>
			 		<div className="shakebox hide"><i></i></div>
			 		<div className="enter-share " onClick={this.showSharebox}></div>
			 	</div>
			 	<div className="mask hide" onClick={this.closeSharebox}></div>
			 	<div className="sharebox hide">
			 		<i></i>
			 		<i></i>
			 		<i></i>
			 		<i></i>
			 	</div>
			 	<div className="sharesuccfullbox hide">
			 		<h3>恭喜您，分享成功</h3>
			 		<img src={shescfull} alt="恭喜您，分享成功" />
			 		<div className="backresult" onClick={this.backResult}>返回查看解读</div>
			 	</div>
			</div>
		);
	}
}

export default My;