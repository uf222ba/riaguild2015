
var React = require("react"),
	_ = require("lodash"),
	Badge = require("./badge"),
	mem = require("../data/members"),
	members = mem.members,
	heroes = mem.heroes;

var Heroes = React.createClass({
	render: function(){
		return (
			<div>
				<p>These are the current heroes of the guild. Make sure to pay them proper reverence in the Slack channel!</p>
				<table className="table table-striped">
					<thead>
						<tr><th style={{width: 25+"%"}}>What</th><th>Who</th></tr>
					</thead>
					<tbody>
						<tr>
							<td>Our <strong>most prolific bloggers</strong> <br/> have written {heroes.blogposts[0]} posts:</td>
							<td>{ _.map(heroes.blogposts[1],function(id){ return <Badge key={id} id={id} />}) }</td>
						</tr>
						<tr>
							<td>Our <strong>most helpful members</strong> <br/> have made {heroes.pullrequests[0]} pull requests:</td>
							<td>{ _.map(heroes.pullrequests[1],function(id){ return <Badge key={id} id={id} />}) }</td>
						</tr>
						<tr>
							<td>Our <strong>wisest members</strong> have <br/> written {heroes.sageadvice[0]} sage advice:</td>
							<td>{ _.map(heroes.sageadvice[1],function(id){ return <Badge key={id} id={id} />}) }</td>
						</tr>
						<tr>
							<td>Our <strong>most generous coders</strong> have <br/> written {heroes.snippets[0]} code snippets:</td>
							<td>{ _.map(heroes.snippets[1],function(id){ return <Badge key={id} id={id} />}) }</td>
						</tr>
					</tbody>
				</table>
			</div>
		);
	}
});

module.exports = Heroes;
