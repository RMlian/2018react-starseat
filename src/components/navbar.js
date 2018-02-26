import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class Navbar extends Component {

	render() {
		return(
			<div className="navbar">
				<ul className="cf">
					<li><span className="btn btn-navbar btn-navbar-back" onClick={this.props.changeNavbar}></span></li>
					<li className="title">魔法星座</li>
					<li className="fr ermenu">
						<span className="btn btn-navbar btn-er-menu-i" onClick={this.props.changeNavbar}></span>
						<div className="er-menu">
							<Link to="/rule"><i>探索秘籍</i></Link>
							<Link to="/constellation/history"><i>我的探索历史</i></Link>
						</div>
					</li>
				</ul>
			</div>
		);
	}
}

export default Navbar;