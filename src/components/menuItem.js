var React = require('react')
    NavItem = require('react-bootstrap').NavItem,
    LinkContainer = require('react-router-bootstrap').LinkContainer,
    IndexLinkContainer = require('react-router-bootstrap').IndexLinkContainer;

var MenuItem = React.createClass({
    
    render: function(){

    	if (this.props.isIndexLink) {
    		return (
    			<IndexLinkContainer to={this.props.path}><NavItem>{this.props.linkText}</NavItem></IndexLinkContainer>
    		);
    	} else {
    		return (
    			<LinkContainer to={this.props.path}><NavItem>{this.props.linkText}</NavItem></LinkContainer>
    		);
    	}
	}
});

module.exports = MenuItem;