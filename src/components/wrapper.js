/*
This is our top-level component. Sub-components matching specific routes will be
contained in `this.props.children` and rendered out.
*/

var React = require('react'),
    AsdNav = require('asd-nav');

var Wrapper = React.createClass({
	render: function() {
        var AsdNavConf = {
            bootstrap: {
                brand: {
                    href: '/',
                    image: {
                        src: 'src/images/guild-logo.svg'
                    }
                }
            }
        };
		return (
			<div className="wrapper">
				<AsdNav routes={this.props.routes} config={AsdNavConf} />
                {this.props.children}
			</div>
		);
	}
});

module.exports = Wrapper;