/*
This is our top-level component. Sub-components matching specific routes will be
contained in `this.props.children` and rendered out.
*/

var React = require('react'),
	Router = require("react-router"),
	Link = Router.Link,
	IndexLink = Router.IndexLink;

var Wrapper = React.createClass({
	render: function() {
		return (
			<div className="wrapper">
				<h2>RIA course member guild 2015</h2>
				<ul className="nav">
					<li><IndexLink activeClassName="active" to="/">Home</IndexLink></li>
					<li><Link activeClassName="active" to="/members/">Roster</Link></li>
					<li><Link activeClassName="active" to="/actions/">Deeds</Link></li>
					<li><Link activeClassName="active" to="/advice/">Advice</Link></li>
					<li><Link activeClassName="active" to="/gallery/">Gallery</Link></li>
				</ul>
				{this.props.children}
			</div>
		);
	}
});

module.exports = Wrapper;