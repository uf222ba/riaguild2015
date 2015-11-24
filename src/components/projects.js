var React = require("react"),
	_ = require("lodash"),
	Icon = require("./icon"),
	Badge = require("./badge"),
	// transform to array and sort by name
	members = _.sortBy(_.map(require("../data/members").members,_.identity),"name");

var Projects = React.createClass({
	nameFilterFunction: function(info) {
		return info.name.toUpperCase().indexOf(this.state.filterName.toUpperCase()) > -1;
	},
	projectFilterFunction: function(info) {
		if (info.projectdesc) {
			return info.projectdesc.toUpperCase().indexOf(this.state.filterProject.toUpperCase()) > -1;
		} else {
			return "<no description given>".toUpperCase().indexOf(this.state.filterProject.toUpperCase()) > -1;
		}
	},
	getInitialState: function() {
		return { filterName: "", filterProject: "" };
	},
	handleNameFilterChange: function(event) {
		this.setState({ filterName: event.target.value });
	},
	handleProjectFilterChange: function(event) {
		this.setState({ filterProject: event.target.value });
	},
	render: function(){
		var rows = _.map(members.filter(this.nameFilterFunction).filter(this.projectFilterFunction),function(data,n){
			var id = data.id;
			if (data.projectrepo) {
				var pubappURL = (data.projectrepo === data.github+".github.io" ? data.projectrepo : data.github+".github.io/"+data.projectrepo+"/"+(data.projectentry||""));
				return (
					<tr key={id}>
						<td><Badge id={id} /></td>
						<td>
							<div>
								{(data.projectdesc || "<no description given>")+" "}<br />
						 		(<a href={"http://github.com/"+data.github+"/"+data.projectrepo} target="_blank">code</a>) 
						  		(<a href={"http://"+pubappURL} target="_blank">run</a>) 
							</div>
						</td>
					</tr>
				);
			}
		});
		return (
			<div>
				<p>These are the projects of current guild members:</p>
				<table className="table table-striped">
					<thead>
						<tr><th style={{width: 25+"%"}}>Name</th><th>Project</th></tr>
						<tr>
							<th><input type="text" placeholder="Filter..." value={this.state.filterName} onChange={this.handleNameFilterChange} /></th>
							<th><input type="text" placeholder="Filter..." value={this.state.filterProject} onChange={this.handleProjectFilterChange} /></th>
						</tr>
					</thead>
					<tbody>
						{rows}
					</tbody>
				</table>
			</div>
		);
	}
});

module.exports = Projects;
