var React = require("react"),
    _ = require("lodash"),
    Badge = require("./badge"),
    members = require("../data/members").members;

var Roster = React.createClass({
    getInitialState(){
        return {
            orderBy: "name",
            bi: -1,
            ni: 1,
            pi: -1
        };
    },
    getBPIndex(){
        return this.state.bi;
    },
    getPRIndex(){
        return this.state.pi;
    },
    getNameIndex(){
        return this.state.ni;
    },
    getOrderedMembers(){
        var index;
        switch (this.state.orderBy) {
            case "name":
                index = this.getNameIndex();
                var order = _.sortBy(members, "name");
                if (index < 0) {
                    order.reverse();
                }
                return order;
            //We could of couse do the reversal of the arrays by first sorting,
            // and then just call reverse on it, but that isn't fun is it?
            case "blogposts":
                index = this.getBPIndex();
                return _.sortBy(members, (n)=> {
                    return index * n.blogposts.length;
                });
            case "prs":
                index = this.getPRIndex();
                return _.sortBy(members, (n)=> {
                    return index * n.pullrequests.length;
                });
            default:
                return members;
        }
    },
    setOrderBy(method){
        var options = {orderBy: method};
        if(this.state.orderBy === method){
            switch(method){
                case "name":
                    options.ni = this.state.ni * (-1);
                case "blogposts":
                    options.bi = this.state.bi * (-1);
                case "prs":
                    options.pi = this.state.pi * (-1);
            }
            this.setState(options);
        } else {
            this.setState(options);
        }
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
                nameTH = `Name${this.state.ni < 0 ? '↓' : '↑'}`;
                break;
            case "blogposts":
                blogpostTH = `Posts${this.state.bi < 0 ? '↓' : '↑'}`;
                break;
            case "prs":
                prTH = `PR:s${this.state.pi < 0 ? '↓' : '↑'}`;
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
