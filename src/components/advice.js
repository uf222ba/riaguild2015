
var React = require("react"),
	_ = require("lodash"),
	Badge = require("./badge"),
	mem = require("../data/members"),
	members = mem.members,
	actions = mem.actions;

var Advice = React.createClass({
	render: function(){
		var rows = _.map(mem.sageadvice.reverse(),function(advice,n){
			var user = members[advice[0]],
				post = user.blogposts[advice[1]];
			return (
				<tr key={n}>
					<td><Badge id={user.github} /></td>
					<td>{post.when.substr(0,10)}<br/>{post.when.substr(11)}</td>
					<td>
						sagely wrote about
						<br/>
						<a href={post.url} target="_blank">{post.title}</a>
					</td>
				</tr>
			);
		});
		return (
			<div>
				<p>
These are the writings that have been deemed worthy of the title "sage advice", which means they are of extra value for others to read.
				</p>
				<table className="table table-striped">
					<thead>
						<tr><th>Who</th><th>When</th><th>What</th></tr>
					</thead>
					<tbody>
						{rows}
					</tbody>
				</table>
			</div>
		);
	}
});

module.exports = Advice;
