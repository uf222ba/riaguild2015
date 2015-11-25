var React = require("react"),
	_ = require("lodash"),
	Icon = require("./icon"),
	Badge = require("./badge"),
	mem = require("../data/members").members,
	// transform to array and sort by name
	members = _.sortBy(_.map(mem,_.identity),"name");

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
	collaboratorFilterFunction: function(info) {
		var seeking = this.state.filterCollaborator;
		if (!seeking) { // If we're not filtering - the only case in which repos with no collaborators are shown
			return true;
		} else if (info.received) {
			var index = -1;
			info.received.some(function(pr, n) {
				if (mem[pr.by].name.toUpperCase().indexOf(seeking.toUpperCase()) > -1) {
					index = n;
					return true;
				}
			});
			if (index > -1) {
				return true;
			}
		}
		return false;
	},
	getInitialState: function() {
		return { filterName: "", filterProject: "", filterCollaborator: "" };
	},
	handleNameFilterChange: function(event) {
		this.setState({ filterName: event.target.value });
	},
	handleProjectFilterChange: function(event) {
		this.setState({ filterProject: event.target.value });
	},
	handleCollaboratorFilterChange: function(event) {
		this.setState({ filterCollaborator: event.target.value });
	},
	render: function(){
		var rows = _.map(members.filter(this.nameFilterFunction).filter(this.projectFilterFunction).filter(this.collaboratorFilterFunction),function(data,n){
			var id = data.id;
			if (data.projectrepo) {
				var receivedPRs = (_.uniq(data.received, 'by') || []).map(function(pr,n){
					var authoruser = mem[pr.by];
					return <Badge id={authoruser.github} key={n}/>;
				});
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
						<td>
							{receivedPRs}
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
						<tr><th style={{width: 25+"%"}}>Name</th><th>Project</th><th>Collaborators</th></tr>
						<tr>
							<th><input type="text" placeholder="Filter..." value={this.state.filterName} onChange={this.handleNameFilterChange} /></th>
							<th><input type="text" placeholder="Filter..." value={this.state.filterProject} onChange={this.handleProjectFilterChange} /></th>
							<th><input type="text" placeholder="Filter..." value={this.state.filterCollaborator} onChange={this.handleCollaboratorFilterChange} /></th>
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
