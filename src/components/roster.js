var React = require("react"),
    _ = require("lodash"),
    Badge = require("./badge"),
// transform to array and sort by name
    members = require("../data/members").members;

var orderings = {
    bi: 1,
    ni: -1, //
    pi: 1,
    getBPIndex(){
        this.bi *= (-1);
        return this.bi;
    },
    getPRIndex(){
        this.pi *= (-1);
        return this.pi;
    },
    getNameIndex(){
        this.ni *= (-1);
        return this.ni;
    }
};

var Roster = React.createClass({
    getInitialState(){
        return {orderBy: "name"};
    },
    getOrderedMembers(){
        var index;
        switch (this.state.orderBy) {
            case "name":
                index = orderings.getNameIndex();
                var order = _.sortBy(members, "name");
                if (index < 0) {
                    order.reverse();
                }
                return order;
            case "blogposts":
                index = orderings.getBPIndex();
                return _.sortBy(members, (n)=> {
                    return index * n.blogposts.length;
                });
            case "prs":
                index = orderings.getPRIndex();
                return _.sortBy(members, (n)=> {
                    return index * n.pullrequests.length;
                });
            default:
                return members;
        }
    },
    setOrderBy(method){
        this.setState({orderBy: method});
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
        switch (this.state.orderBy) {
            case "name":
                nameTH = `Name${orderings.ni < 0 ? '↓' : '↑'}`;
                break;
            case "blogposts":
                blogpostTH = `Posts${orderings.bi < 0 ? '↓' : '↑'}`;
                break;
            case "prs":
                prTH = `PR:s${orderings.pi < 0 ? '↓' : '↑'}`;
                break;
        }

        var nameRow = <th className="cursor-click" style={{width: 25+"%"}} onClick={this.setOrderBy.bind(null, "name")}>{nameTH}</th>;
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
