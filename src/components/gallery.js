var React = require("react"),
    _ = require("lodash"),
    members = require("../data/members").members,
    icons = require("../data/icons.json"),
    Icon = require("./icon"),
    Badge = require("./badge"),
    usedicons = _.reduce(members,function(ret,data,id){
        return Object.assign(ret,{[data.icon]:data.id});
    },{});

var Gallery = React.createClass({
    
    getInitialState:function(){
        return {
            iconFilterFunction: () => true
        };
    },
    
    setIconFilterFunction: function(filterOn){
    
        switch(filterOn){
            case 'taken':
                this.setState({iconFilterFunction: (icon) => { return usedicons.hasOwnProperty(icon);}});
                break;
            case 'available':
                this.setState({iconFilterFunction: (icon) => { return usedicons.hasOwnProperty(icon) === false;}});
                break;
            default:
                this.setState({iconFilterFunction: () => true});
                break;
        }
    },
        
    getIconBoxesHTML: function(){
        
        return icons.filter(this.state.iconFilterFunction).map(function(icon,n){

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
    
    render: function(){
        
        return (
            <div>
                <p>These are the icons you can choose from, apart from the red ones as they are already taken!</p>
                <form>
                    <label>
                        Show all
                        <input type="radio" name="icon-filter" defaultChecked onClick={this.setIconFilterFunction.bind(this, 'all')}/>
                    </label>
                    <label>
                        Show taken
                        <input type="radio" name="icon-filter" onClick={this.setIconFilterFunction.bind(this, 'taken')}/>
                    </label>
                    <label>
                        Show available
                        <input type="radio" name="icon-filter" onClick={this.setIconFilterFunction.bind(this, 'available')}/>
                    </label>
                </form>
                <div className="iconboxes">{this.getIconBoxesHTML()}</div>
            </div>
        );
    }
});

module.exports = Gallery;