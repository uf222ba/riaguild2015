
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
							<td>Our <strong>most prolific bloggers</strong> <br/> have written <font className="gold-text">{heroes.blogposts[0]} posts</font>:
							<br />(Runners up have written <font className="silver-text">{heroes.blogposts[2]}</font>)</td>
							<td>{ _.map(heroes.blogposts[1],function(id){ return <Badge honour="gold" key={id} id={id} />}) }
								{ _.map(heroes.blogposts[3],function(id){ return <Badge honour="silver" key={id} id={id} />}) }</td>
						</tr>
						<tr>
							<td>Our <strong>most helpful members</strong> <br/> have made <font className="gold-text">{heroes.pullrequests[0]} pull requests</font>:
							<br />(Runners up have made <font className="silver-text">{heroes.pullrequests[2]}</font>)</td>
							<td>{ _.map(heroes.pullrequests[1],function(id){ return <Badge honour="gold" key={id} id={id} />}) }
								{ _.map(heroes.pullrequests[3],function(id){ return <Badge honour="silver" key={id} id={id} />}) }</td>
						</tr>
						<tr>
							<td>Our <strong>wisest members</strong> have <br/> written <font className="gold-text">{heroes.sageadvice[0]} sage advice</font>:
							<br />(Runners up have written <font className="silver-text">{heroes.sageadvice[2]}</font>)</td>
							<td>{ _.map(heroes.sageadvice[1],function(id){ return <Badge honour="gold" key={id} id={id} />}) }
								{ _.map(heroes.sageadvice[3],function(id){ return <Badge honour="silver" key={id} id={id} />}) }</td>
						</tr>
						<tr>
							<td>Our <strong>most generous coders</strong> have <br/> written <font className="gold-text">{heroes.snippets[0]} code snippets</font>:
							<br />(Runners up have written <font className="silver-text">{heroes.snippets[2]}</font>)</td>
							<td>{ _.map(heroes.snippets[1],function(id){ return <Badge honour="gold" key={id} id={id} />}) }
								{ _.map(heroes.snippets[3],function(id){ return <Badge honour="silver" key={id} id={id} />}) }</td>
						</tr>
					</tbody>
				</table>
			</div>
		);
	}
});

module.exports = Heroes;
