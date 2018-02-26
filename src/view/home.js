import React, { Component } from 'react';
import PropTypes from 'prop-types';

import DatePicker from 'react-mobile-datepicker';
import Moment from "moment";
import $ from "jquery";

import Bg1 from '../resource/images/bg-1.png';
import Angeli from '../resource/images/mfxz-text.png';

import Particle from "../lib/particle";

import Utils from "../lib/utils";

// import Config from "../config";
class Home extends Component {
	constructor(props) {
        super(props);
        this.state = {
            time: new Date(),
            isPopup:false,
            isOpen: true,
            dateFormat:['MM', 'DD'],
            showHeader:false,
            theme:'android-dark',
            confirmText:''
        };
    }

    static contextTypes = {
        router: PropTypes.object.isRequired
    };

    componentDidMount() {
        // 导航条显示
        $("li.title").text("魔法星座");
        $("li.ermenu").css("display", "block");

        // 星空粒子效果
        //配置
        var partconfig = {
            vx: 2,  //小球x轴速度,正为右，负为左
            vy: 2,  //小球y轴速度
            height: 2,  //小球高宽，其实为正方形，所以不宜太大
            width: 2,
            count: 140,     //点个数
            color: "101, 133, 200",     //点颜色
            stroke: "144,174,207",      //线条颜色
            dist: 4000,     //点吸附距离
            e_dist: 20000,  //鼠标吸附加速距离
            max_conn: 10    //点到点最大连接数
        }

        //调用
        Particle.canvasInit(partconfig, $('.particlebox'));
    }

    // 选择日期
    handleSelect = (time) => {
        this.setState({ time, isOpen: false });
        var dateval = Moment(time).format('YYYY-MM-DD');
        var token = "";
        if (typeof localStorage.token !== "undefined") {
            token = localStorage.token;
        } else {
            token = Utils.url.getParam("token");
        }
        if(dateval){
            localStorage.date = dateval;
        }
        var path = '/my?dateval='+dateval+'&token='+token;
        this.context.router.history.push(path);
        // this.context.router.goForward();

    }
	render() {
		return (
			<div className="container bgbox">
                <div className="bg"><img src={Bg1} alt="背景" /></div>
                <div className="starseatcon">
                    <div className="staranim particlebox"></div>
                    <div className="angel-datebox angelanim">
                        <abbr><img src={Angeli} alt="天使图片" /></abbr>
                        <div className="dateselect">
                            <p>请选择你来到地球的时间</p>
                            <DatePicker
                                isPopup={this.state.isPopup}
                                showHeader={this.state.showHeader}
                                value={this.state.time}
                                isOpen={this.state.isOpen}
                                dateFormat={this.state.dateFormat}
                                onSelect={this.handleSelect}
                                theme={this.state.theme}
                                confirmText={this.state.confirmText}
                                ></DatePicker>
                        </div>
                    </div>
                </div>
			</div>
		);
	}
}

export default Home;