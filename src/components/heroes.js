
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
							<td>Our <strong>most prolific bloggers</strong> <br/> have written <span className="gold-text">{heroes.blogposts[0][0]} posts</span>:
							<br />(Runners up have written <span className="silver-text">{heroes.blogposts[1][0]}</span> and <span className="bronze-text">{heroes.blogposts[2][0]}</span>)</td>
							<td>{ _.map(heroes.blogposts[0][1],function(id){ return <Badge honour="gold" key={id} id={id} />}) }
								{ _.map(heroes.blogposts[1][1],function(id){ return <Badge honour="silver" key={id} id={id} />}) }
								{ _.map(heroes.blogposts[2][1],function(id){ return <Badge honour="bronze" key={id} id={id} />}) }</td>
						</tr>
						<tr>
							<td>Our <strong>most helpful members</strong> <br/> have made <span className="gold-text">{heroes.pullrequests[0][0]} pull requests</span>:
							<br />(Runners up have made <span className="silver-text">{heroes.pullrequests[1][0]}</span> and <span className="bronze-text">{heroes.pullrequests[2][0]}</span>)</td>
							<td>{ _.map(heroes.pullrequests[0][1],function(id){ return <Badge honour="gold" key={id} id={id} />}) }
								{ _.map(heroes.pullrequests[1][1],function(id){ return <Badge honour="silver" key={id} id={id} />}) }
								{ _.map(heroes.pullrequests[2][1],function(id){ return <Badge honour="bronze" key={id} id={id} />}) }</td>
						</tr>
						<tr>
							<td>Our <strong>wisest members</strong> have <br/> written <span className="gold-text">{heroes.sageadvice[0][0]} sage advice</span>:
							<br />(Runners up have written <span className="silver-text">{heroes.sageadvice[1][0]}</span> and <span className="bronze-text">{heroes.sageadvice[2][0]}</span>)</td>
							<td>{ _.map(heroes.sageadvice[0][1],function(id){ return <Badge honour="gold" key={id} id={id} />}) }
								{ _.map(heroes.sageadvice[1][1],function(id){ return <Badge honour="silver" key={id} id={id} />}) }
								{ _.map(heroes.sageadvice[2][1],function(id){ return <Badge honour="bronze" key={id} id={id} />}) }</td>
						</tr>
						<tr>
							<td>Our <strong>most generous coders</strong> have <br/> written <span className="gold-text">{heroes.snippets[0][0]} code snippets</span>:
							<br />(Runners up have written <span className="silver-text">{heroes.snippets[1][0]}</span> and <span className="bronze-text">{heroes.snippets[2][0]}</span>)</td>
							<td>{ _.map(heroes.snippets[0][1],function(id){ return <Badge honour="gold" key={id} id={id} />}) }
								{ _.map(heroes.snippets[1][1],function(id){ return <Badge honour="silver" key={id} id={id} />}) }
								{ _.map(heroes.snippets[2][1],function(id){ return <Badge honour="bronze" key={id} id={id} />}) }</td>
						</tr>
					</tbody>
				</table>
			</div>
		);
	}
});

module.exports = Heroes;
