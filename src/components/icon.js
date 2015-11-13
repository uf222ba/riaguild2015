var React = require("react");

var Icon = React.createClass({
	render: function(){

		var URL = null;

		if (this.props.icon.split("$")[0] === "ninjas"){
			URL = "http://units.wesnoth.org/1.10/pics/add-ons$Internet_Meme_Era$images$";
		} else if (this.props.icon.split("$")[0] === "demons") {
			URL = "http://units.wesnoth.org/1.10/pics/add-ons$After_the_Storm$images$units$";
		} else {
			URL = "http://units.wesnoth.org/1.10/pics/core$images$units$";
		}

		return (
			<span>
				<img src={URL+this.props.icon+".png"} alt={this.props.icon} title={this.props.icon} />
			</span>
			);
	}
});

module.exports = Icon;