import React, { Component } from 'react';
// import {Link} from 'react-router-dom';
import $ from "jquery";

import Bg2 from '../resource/images/bg-2.png';

class Rule extends Component {
	constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount() {
        // 导航条显示
        $("li.title").text("探索秘籍");
        $("li.ermenu").css("display", "none");
    }
	render() {
		return (
			<div className="container bgbox">
                <div className="bg"><img src={Bg2} alt="背景"/></div>
                <div className="starseatcon maincon">
                    <div className="rulebox">
                        <p>欢迎来到魔法星座，在这里你可以亲临宇宙，找寻你的星座，探索我们为你私人订制的事业、财运、健康、爱情星语，跟随引路天使的脚步，去探索你的命运星语吧……</p>
                        <p>稍后天使为你展示出命运年轮，选择你的出生日期，我们将定位你的星座，在那里你可以摇到与你有缘的星星。</p>
                        <p>星星分为四种颜色：蓝色代表事业；金色代表财富；绿色代表健康；粉色代表感情，每一颗星星都有自己的星语，每个颜色的星星你只能摇出一颗，星星的星语代表不同的含义，所以你要尽快分享，解读星语，这样星运才会稳定，你的好运也会在星语的破解中得以一一实现，现在，出发去探索你的命运星语吧。</p>
                    </div>
                </div>
			</div>
		);
	}
}

export default Rule;