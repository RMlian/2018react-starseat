import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import Slider from "react-slick";
import $ from "jquery";

import Bg5 from '../../resource/images/s-detialbg.jpg';

import Utils from "../../lib/utils";
import Config from "../../config";
class Historydetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            starscontent:{},//详情列表显示
            starscontSY:{},
            starscontCY:{},
            starscontJK:{},
            starscontAQ:{}
        };
    }

    componentDidMount() {
        // 导航条显示
        $("li.title").text("魔法星座");
        $("li.ermenu").css("display", "block");

        // 详情显示
        var token = "";
        if (typeof localStorage.token !== "undefined") {
            token = localStorage.token;
        }
        var starid = Utils.url.getParam("starsid");
        if(starid === "underfined"){
            alert("星座数据正在规划中。。。");
            return false;
        }

        // 加载星座详情数据
        var t = this;
        $.ajax({
            url: Config.apiUrl + "/activity/star/detail",
            data: {token:token,sid:starid},
            success: function(data) {
                if (data.code === 0) {
                        t.setState({starscontent:data.data,starscontSY:data.data.SY,starscontCY:data.data.CY,starscontJK:data.data.JK,starscontAQ:data.data.AQ});
                }else{
                    alert(data.msg);
                }
            }
        });
    }
    
    render() {
        var settings = {
            centerMode: true,
            centerPadding: '40px',
            slidesToShow:1,
            slidesToScroll:1,
            arrows: false,
            afterChange:function(index){
                $('.constell-tag').find('span').eq(index).addClass('active');
                $('.constell-tag').find('span').eq(index).siblings('span').removeClass('active');   
            }
        };
        return (
            <div className="container bgbox hisdetail">
                <div className="bg"><img src={Bg5} alt="背景" /></div>
                <div className="starseatcon maincon">
                    <div className="constell-title">
                        <div className="photo"><i className={'stars-s-'+this.state.starscontent.star_id}></i></div>
                        <h3>{this.state.starscontent.star_name}</h3>
                        <p>{this.state.starscontent.start_date}号-{this.state.starscontent.end_date}号</p>
                        <nav className="constell-tag">
                            <span className="active" data-tag="0">事业</span>
                            <span data-tag="1">财运</span>
                            <span data-tag="2">健康</span>
                            <span data-tag="3">情感</span>
                        </nav>
                    </div>
                    <div className="constelldetail-con">
                        <Slider {...settings}>
                            <div className="detailcon-item">
                                <div className="item-con">
                                    <i className="sy"></i>
                                    <div>
                                        <p>{this.state.starscontSY.content}</p>
                                        <p>影响星座：{this.state.starscontSY.touch_star}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="detailcon-item">
                                <div className="item-con">
                                    <i className="cy"></i>
                                    <div>
                                        <p>{this.state.starscontCY.content}</p>
                                        <p>影响星座：{this.state.starscontCY.touch_star}</p>
                                    </div>
                                </div>
                            </div>    
                            <div className="detailcon-item">
                                <div className="item-con">
                                    <i className="jk"></i>
                                    <div>
                                        <p>{this.state.starscontJK.content}</p>
                                        <p>影响星座：{this.state.starscontJK.touch_star}</p>
                                    </div>
                                </div>
                            </div>    
                            <div className="detailcon-item">
                                <div className="item-con">
                                    <i className="aq"></i>
                                    <div>
                                        <p>{this.state.starscontAQ.content}</p>
                                        <p>影响星座：{this.state.starscontAQ.touch_star}</p>
                                    </div>
                                </div>
                            </div>   
                        </Slider>
                    </div>
                    <div className="again-enterbtn">
                        <Link to="/"></Link>
                    </div>

                </div>
            </div>
        );
    }
}

export default Historydetails;