var React = require("react"),
    _ = require("lodash"),
    Badge = require("./badge"),
    members = require("../data/members").members;

var Roster = React.createClass({
    getInitialState(){
        return {
            orderBy: "name",
            blogposts: -1,
            name: 1,
            prs: -1
        };
    },
    getOrderedMembers(){
        var filters = {
            "name": "name",
            "blogposts": (member) => member.blogposts.length,
            "prs": (member) => member.pullrequests.length
        };
        var index = this.state[this.state.orderBy];
        var order = _.sortBy(members, filters[this.state.orderBy]);

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
    render: function () {
        var orderedMembers = this.getOrderedMembers();
        var rows = _.map(orderedMembers, (info, n) => {
            var id = info.id;
            return (
                <tr key={id}>
                    <td><Badge id={id}/></td>
                    <td>{info.blogposts.length}</td>
                    <td>{info.pullrequests.length}</td>
                </tr>
            );
        });

        var headerTargets = {
            "name": "Name",
            "blogposts": "Posts",
            "prs": "PR:s"
        };

        headerTargets[this.state.orderBy] += `${this.state[this.state.orderBy] < 0 ? '↓' : '↑'}`;

        var headers = ["name", "blogposts", "prs"].map((type, index) => <th className="cursor-click" style={{width: "25%"}}
                   onClick={this.setOrderBy.bind(null, type)} key={index}>{headerTargets[type]}</th>);

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
