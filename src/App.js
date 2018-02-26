import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import $ from "jquery";

import Utils from "./lib/utils";

import Navbar from "./components/navbar";
import Home from "./view/home";
import My from "./view/my";
import History from "./view/constellation/history";
import HistoryDetails from "./view/constellation/historydetails";
import Rule from "./view/rule";

class App extends Component {
  constructor(props) {
      super(props);
      this.state = {

      }
  }

  componentDidMount() {
      var token = Utils.url.getParam("token");
      if (token) {
        localStorage.token = token;
      }else{
        if (typeof localStorage.token === "undefined") {
          $("div.app").html('<div class="alert">缺少参数: token不能为空</div>');
        }
      }
  }

  changeNavbar = (e) => {
    // 返回
    if ($(e.target).hasClass("btn-navbar-back")) {
        window.history.back();
    }else if($(e.target).hasClass("btn-er-menu-i")){ 
        $(e.target).siblings('.er-menu').fadeToggle(800);   
    }
  }

  render() {
    return (
      <Router>
        <div className="app">
          <Navbar changeNavbar={this.changeNavbar} />
          <Route exact path="/" component={Home} />
          <Route path="/my" component={My} />
          <Route path="/constellation/history" component={History} />
          <Route path="/constellation/historydetails" component={HistoryDetails} />
          <Route path="/rule" component={Rule} />
        </div>
      </Router>
    );
  }
}

export default App;
