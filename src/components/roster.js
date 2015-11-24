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
        var index = this.state[this.state.orderBy];
        switch (this.state.orderBy) {
            case "name":
                var order = _.sortBy(members, "name");
                if (index < 0) {
                    order.reverse();
                }
                return order;
            case "blogposts":
                return _.sortBy(members, (n)=> {
                    return index * n.blogposts.length;
                });
            case "prs":
                return _.sortBy(members, (n)=> {
                    return index * n.pullrequests.length;
                });
            default:
                return members;
        }
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
        var nameTH = "Name";
        var blogpostTH = "Posts";
        var prTH = "PR:s";

        var orderBy = this.state.orderBy;

        switch (orderBy) {
            case "name":
                nameTH += `${this.state[orderBy] < 0 ? '↓' : '↑'}`;
                break;
            case "blogposts":
                blogpostTH += `${this.state[orderBy] < 0 ? '↓' : '↑'}`;
                break;
            case "prs":
                prTH += `${this.state[orderBy] < 0 ? '↓' : '↑'}`;
                break;
        }

        var nameRow = <th className="cursor-click" style={{width: 25+"%"}}
                          onClick={this.setOrderBy.bind(null, "name")}>{nameTH}</th>;
        var blogpostRow = <th className="cursor-click" style={{width: 25+"%"}}
                              onClick={this.setOrderBy.bind(null, "blogposts")}>{blogpostTH}</th>;
        var prRow = <th className="cursor-click" onClick={this.setOrderBy.bind(null, "prs")}>{prTH}</th>;

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
