
var React = require("react"),
	_ = require("lodash"),
	Badge = require("./badge"),
	mem = require("../data/members"),
	members = mem.members,
	actions = mem.actions,
	Pagination = require("react-bootstrap").Pagination,
	DropdownButton = require("react-bootstrap").DropdownButton,
	MenuItem = require("react-bootstrap").MenuItem;

function ordernum(n){
	return n + ({1:"st",2:"nd",3:"rd"}[n % 10] || "th");
}

var Actions = React.createClass({
	nameFilterFunction: function(info) {
		return members[info.by].name.toUpperCase().indexOf(this.state.filterName.toUpperCase()) > -1;
	},
	whatFilterFunction: function(info) {
		return info.description.toUpperCase().indexOf(this.state.filterWhat.toUpperCase()) > -1;
	},
	typeFilterFunction: function(info) {
		switch (this.state.filterType) {
			case "posts":
				return info.type === "post";
			case "prs":
				return info.type === "pr";
			case "snippets":
				return info.type === "snippet";
			default:
				return true;
		}
	},
	getInitialState: function() {
		return { filterName: "", filterWhat: "", filterType: "all", activePage: 1, itemsPerPage: 25 };
	},
	handleNameFilterChange: function(event) {
		this.setState({ filterName: event.target.value });
	},
	handleWhatFilterChange: function(event) {
		this.setState({ filterWhat: event.target.value });
	},
	handleTypeFilterChange: function(filterBy) {
		this.setState({ filterType: filterBy });
	},
	handlePageSelect: function(event, selectedEvent) {
		this.setState({ activePage: selectedEvent.eventKey });
	},
	handleItemsPerPageSelect: function(event, selectedEvent) {
		this.setState({ itemsPerPage: selectedEvent });
	},
	render: function(){
		var rows = _.map(actions.filter(this.nameFilterFunction).filter(this.whatFilterFunction).filter(this.typeFilterFunction),function(info,id){
			var user = members[info.by],
				tuser = members[info.target] || {github: null};
			return (
				<tr key={id}>
					<td><Badge id={user.github} /></td>
					<td>{info.when.substr(0,10)}<br/>{info.when.substr(11)}</td>
					<td>
						{ {pr:"made",post:"wrote",snippet:"coded"}[info.type]+" "+ordernum(info.number)+" "+{pr:"PR",post:"post",snippet:"snippet"}[info.type]+(info.sageadvice?" (sage advice!)":"")+": " }
						<br/>
						<a href={info.url} target="_blank">{info.description}</a>
					</td>
					<td>{info.type ==='pr' && <span><Badge id={tuser.github} /></span> || ""}</td>
				</tr>
			);
		});
		var pagesCount = Math.ceil(rows.length/this.state.itemsPerPage);
		var activePage = (this.state.activePage > pagesCount) ? pagesCount : this.state.activePage;
		rows = (this.state.itemsPerPage > 0) ? _.drop(rows, (activePage - 1)*this.state.itemsPerPage).slice(0, this.state.itemsPerPage) : rows;
		return (
			<div>
				<p>There's been {mem.numberofposts} posts, {mem.numberofprs} pull requests and {mem.numberofsnippets} code snippets so far:</p>
				<table className="table table-striped">
					<thead>
						<tr><th>Who</th><th>When</th><th>What</th><th>Target (if PR)</th></tr>
						<tr>
							<th><input type="text" placeholder="Filter..." value={this.state.filterName} onChange={this.handleNameFilterChange} /></th>
							<th></th>
							<th><input type="text" placeholder="Filter..." value={this.state.filterWhat} onChange={this.handleWhatFilterChange} /></th>
							<th></th>
						</tr>
						<tr>
							<th colSpan="4">
								<form>
									<label>
										Show all
										<input type="radio" name="filter" defaultChecked onClick={ this.handleTypeFilterChange.bind(this, "all") } />
									</label>
									<label>
										Show posts
										<input type="radio" name="filter" onClick={ this.handleTypeFilterChange.bind(this, "posts") } />
									</label>
									<label>
										Show PR:s
										<input type="radio" name="filter" onClick={ this.handleTypeFilterChange.bind(this, "prs") } />
									</label>
									<label>
										Show snippets
										<input type="radio" name="filter" onClick={ this.handleTypeFilterChange.bind(this, "snippets") } />
									</label>
								</form>
							</th>
						</tr>
					</thead>
					<tbody>
						{rows}
					</tbody>
				</table>
				<div style={{textAlign:"left"}}>
					Items per page: 
					<DropdownButton 
						dropup
						bsStyle="primary" 
						title={(this.state.itemsPerPage > 0) ? this.state.itemsPerPage : "All"} 
						onSelect={this.handleItemsPerPageSelect}
						id={"itemsPerPage"}>
						<MenuItem eventKey="-1">All</MenuItem>
						<MenuItem eventKey="25">25</MenuItem>
						<MenuItem eventKey="50">50</MenuItem>
					</DropdownButton>
				</div>
				<div style={{textAlign:"center"}}>
					<Pagination
						activePage={activePage}
						bsSize="medium"
						items={pagesCount}
						onSelect={this.handlePageSelect}
					/>
				</div>
			</div>
		);
	}
});

module.exports = Actions;
