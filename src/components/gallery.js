var React = require("react"),
    _ = require("lodash"),
    members = require("../data/members").members,
    icons = require("../data/icons.json"),
    Icon = require("./icon"),
    Badge = require("./badge"),
    Navigation = require("react-router").Navigation,
    usedicons = _.reduce(members,function(ret,data,id){
        return Object.assign(ret,{[data.icon]:data.id});
    },{}),
    FILTER_ALL = "all",
    FILTER_TAKEN = "taken",
    FILTER_AVAILABLE = "available";

var Gallery = React.createClass({
    
    mixins: [Navigation],
 
    getIconBoxesHTML: function(){
        
        var filterFunction = {
                [FILTER_AVAILABLE]: (icon) => usedicons.hasOwnProperty(icon) === false,
                [FILTER_TAKEN]: (icon) => usedicons.hasOwnProperty(icon)
            }[this.props.params.filter] || (() => true);
        
        return icons.filter(filterFunction).map(function(icon,n){
                
            return (
                <span key={n} className={usedicons[icon]?"icon chosen":"icon"}>
                    {
                        usedicons[icon] ?
                        <Badge id={usedicons[icon]} /> :
                        <Icon icon={icon} />
                    }
                </span>
            ); 
        });
    },
    
    redirectToFilter: function(filter){
        this.props.history.pushState(null, "/gallery/" + filter);
    },
    
    getRenderButtonsHTML: function(){
        
        var labels = {
            [FILTER_ALL]:"Show all",
            [FILTER_AVAILABLE]:"Show available",
            [FILTER_TAKEN]:"Show taken"
        };
        
        return _.map(labels, function(labelText, filtername){
            return (
                <label key={filtername}>
                    {labelText}
                    <input 
                        type="radio" 
                        name="icon-filter" 
                        checked={this.props.params.filter === filtername} 
                        onChange={this.redirectToFilter.bind(this, filtername)}/>
                </label>);
        }, this);
    },
    
    render: function(){
        return (
            <div>
                <p>These are the icons you can choose from, apart from the red ones as they are already taken!</p>
                <form>
                    {this.getRenderButtonsHTML()}
                </form>
                <div className="iconboxes">{this.getIconBoxesHTML()}</div>
            </div>
        );
    }
});

module.exports = Gallery;