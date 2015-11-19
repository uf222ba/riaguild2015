/*
This is the "sitemap" of our app! 
*/

var React = require('react'),
    ReactRouter = require('react-router'),
    Route = ReactRouter.Route,
    IndexRoute = ReactRouter.IndexRoute,
    Wrapper = require('./components/wrapper'),
    Home = require('./components/home'),
    Roster = require('./components/roster'),
    Member = require('./components/member'),
    Gallery = require('./components/gallery'),
    Actions = require('./components/actions'),
    Advice = require('./components/advice');

module.exports = (
    <Route path="/" component={Wrapper}>
        <IndexRoute component={Home} />
        <Route path="/members/">
            <IndexRoute component={Roster} />
            <Route path="/member/:name" component={Member} />
        </Route>
        <Route path="/gallery">
            <IndexRoute component={Gallery} />
            <Route path="/gallery/:filter" component={Gallery} />
        </Route>
        <Route path="/actions" component={Actions} />
        <Route path="/advice" component={Advice} />
    </Route>
);
