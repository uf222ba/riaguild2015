
var React = require("react"),
	_ = require("lodash"),
	Icon = require("./icon"),
	Badge = require("./badge"),
	// transform to array and sort by name
	members = _.sortBy(_.map(require("../data/members").members,_.identity),"name");

var Roster = React.createClass({
	render: function(){
		var rows = _.map(members,function(info,n){
			var id = info.id;
			return (
				<tr key={id}>
					<td><Badge id={id} /></td>
					<td>{info.blogposts.length}</td>
					<td>{info.pullrequests.length}</td>
				</tr>
			);
		});
		return (
			<div>
				<p>These are the {rows.length} members of the RIA guild:</p>
				<table className="table table-striped">
					<thead>
						<tr><th style={{width: 25+"%"}}>Name</th><th style={{width: 25+"%"}}>Posts</th><th>PR:s</th></tr>
					</thead>
					<tbody>
						{rows}
					</tbody>
				</table>
			</div>
		);
	}
});

module.exports = Roster;
