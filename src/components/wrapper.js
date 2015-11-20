/*
This is our top-level component. Sub-components matching specific routes will be
contained in `this.props.children` and rendered out.
*/

var React = require('react'),
    Menu = require("./menu");

var Wrapper = React.createClass({
	render: function() {
		return (
			<div className="wrapper">
				<Menu />
                {this.props.children}
			</div>
		);
	}
});

module.exports = Wrapper;