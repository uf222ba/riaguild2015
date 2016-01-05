var React = require("react"),
    _ = require("lodash"),
    Badge = require("./badge"),
    members = require("../data/members").members,
    issueTracker = require("../utils/issueTracker");

var Roster = React.createClass({
    getInitialState(){
        return {
            orderBy: "name",
            blogposts: -1,
            name: 1,
            prs: -1,
            snippets: 1,
            issuesHeader: 1,
            issues: {}
        };
    },
    componentDidMount(){
        _.each(members, function(member){
            if(member.github && member.projectrepo){
                issueTracker.getIssues(member.github, member.projectrepo, this.setIssues);    
            }    
        }, this);
    },
    getOrderedMembers(){
        var filters = {
            "name": (member) => member.name,
            "issuesHeader": (member) => this.state.issues[member.github] ? this.state.issues[member.github].length : 0,
            "blogposts": (member) => member.blogposts.length,
            "prs": (member) => member.pullrequests.length,
            "snippets": (member) => member.snippets.length
        };
        var index = this.state[this.state.orderBy];
        var order = _.sortBy(members, filters[this.state.orderBy], this);

        if (index === -1) {
            order.reverse();
        }
        return order;
    },
    setOrderBy(method){
        var options = {orderBy: method};
        var orderBy = this.state.orderBy;

        if (orderBy === method) {
            options[orderBy] = this.state[orderBy] * (-1);
        }
        this.setState(options);
    },
    setIssues: function(userName, response){
        this.state.issues[userName] = response;
        this.setState(this.state);
    },
    render: function () {
        var orderedMembers = this.getOrderedMembers();
        var rows = _.map(orderedMembers, (info) => {
            var id = info.id;
            var issuesLink = 'https://github.com/' + info.github + '/' + info.projectrepo + '/issues';
            var issueTag = info.github && info.projectrepo && this.state.issues[info.github] && this.state.issues[info.github].length ? <a href={issuesLink}> {this.state.issues[info.github].length}</a> : '';
            return (
                <tr key={id}>
                    <td><Badge id={id}/></td>
                    <td>{issueTag}</td>
                    <td>{info.blogposts.length}</td>
                    <td>{info.pullrequests.length}</td>
                    <td>{info.snippets.length}</td>
                </tr>
            );
        }, this);

        var headerTargets = {
            "name": "Name",
            "issuesHeader": "Issues",
            "blogposts": "Posts",
            "prs": "PR:s",
            "snippets": "Snippets"
        };

        headerTargets[this.state.orderBy] += `${this.state[this.state.orderBy] < 0 ? '↓' : '↑'}`;

        var headers = ["name", "issuesHeader", "blogposts", "prs", "snippets"].map((type) => <th className="cursor-click" style={{width: "20%"}}
                   onClick={this.setOrderBy.bind(null, type)} key={type}>{headerTargets[type]}</th>);

        return (
            <div>
                <p>These are the {rows.length} members of the RIA guild:</p>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            {headers}
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

module.exports = Roster;
