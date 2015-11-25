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
            "blogposts": (member)=> {
                return member.blogposts.length;
            },
            "prs": (member)=> {
                return member.pullrequests.length;
            }
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
    getTHRow(headerTargets, orderBy, options){
        return <th className="cursor-click" {...options}
                   onClick={this.setOrderBy.bind(null, orderBy)}>{headerTargets[orderBy]}</th>;
    },
    render: function () {
        var orderedMembers = this.getOrderedMembers();
        var rows = _.map(orderedMembers, function (info, n) {
            var id = info.id;
            return (
                <tr key={id}>
                    <td><Badge id={id}/></td>
                    <td>{info.blogposts.length}</td>
                    <td>{info.pullrequests.length}</td>
                </tr>
            );
        });
        var orderBy = this.state.orderBy;

        var headerTargets = {
            "name": "Name",
            "blogposts": "Posts",
            "prs": "PR:S"
        };

        headerTargets[orderBy] += `${this.state[orderBy] < 0 ? '↓' : '↑'}`;

        var nameRow = this.getTHRow(headerTargets, "name", {style:{width: "25%"}});
        var blogpostRow = this.getTHRow(headerTargets, "blogposts", {style:{width: "25%"}});
        var prRow = this.getTHRow(headerTargets, "prs");

        return (
            <div>
                <p>These are the {rows.length} members of the RIA guild:</p>
                <table className="table table-striped">
                    <thead>
                    <tr>
                        {nameRow}
                        {blogpostRow}
                        {prRow}
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
