/*
To join the guild, add yourself to this object using github id as key and requiring your json as value.
Check users/krawaller.json for an example on what your file should look like!
*/

var members = {
	krawaller: require("./users/krawaller.json"),
	Dagashi: require("./users/dagashi.json"),
	OskarKlintrot: require("./users/OskarKlintrot.json"),
	MoombaDS: require("./users/MoombaDS.json"),
	uf222ba: require("./users/uf222ba.json"),
	afrxx09: require("./users/afrxx09.json"),
	drager: require("./users/drager.json"),
	SheriefBadran: require("./users/SheriefBadran"),
	Grenmyr: require("./users/DavidGrenmyr.json"),
	em222iv: require("./users/em222iv.json"),
	mw222rs: require("./users/mw222rs.json"),
	jn222na: require("./users/jn222na.json"),
	Pajn: require("./users/Pajn.json"),
	JesperHolmstrom: require("./users/JesperHolmstrom.json"),
	ek222mw: require("./users/ek222mw.json"),
	me222rs: require("./users/me222rs.json"),
	Angamanga: require("./users/Angamanga.json"),
	mn22nw: require("./users/mn22nw.json"),
	as223jx: require("./users/as223jx.json"),
	swoot1: require("./users/swoot1.json"),
	EleonorL: require("./users/EleonorL.json"),
    ViktorJ: require("./users/ViktorJ.json"),
    Eldraev: require("./users/Eldraev.json"),
	bc222az: require("./users/bc222az.json"),
    js22gz: require("./users/js22gz.json"),
	diggo16: require("./users/diggo16.json"),
	Janste: require("./users/Janste.json"),
	as223my: require("./users/as223my.json"),
	mattiaslj: require("./users/mattiaslj.json"),
	ea222pu: require("./users/ea222pu.json"),
	weibinyu: require("./users/weibinyu.json"),
	carlpagelsLNU: require("./users/carlpagelsLNU.json"),
	GamingCrewX: require("./users/GamingCrewX.json"),
	ch222kv: require("./users/ch222kv.json")
};

var _ = require("lodash");

// add id and received pull requests to each member
members = _.reduce(members,function(ret,data,id){
	_.each(data.pullrequests || [],function(pr,n){
		var target = (pr.url.match("^https:\/\/github\.com\/([^\/]*)\/") || [])[1];
		pr.by = id;
		if (ret[target]){
			ret[id].pullrequests[n].target = target;
			ret[target].received = (ret[target].received || []).concat(pr);
		} else {
			console.log(id,"Unknown PR target",target);
		}
	});
	ret[id].id = id;
	return ret;
},members);

// fix sage advice;

var sageadvice = [
	["afrxx09",1], // Andreas, Redux example
	["Pajn",2], // Rasmus, CI
	["drager",3], // Jesper, TypeScript
	["mw222rs",1], // Mattias W, ESLint
	["swoot1",1], // Elin, build script
	["swoot1",2], // Elin, ES6
	["mw222rs",2], // Mattias W, Sublime
	["swoot1",7], // Elin, state vs props vs static
]; // David's divine opinion :P

members = _.mapValues(members,function(data){
	var filtered = sageadvice.filter(function(i){ return i[0] === data.id; }),
		plucked = _.pluck(filtered,1);
	return Object.assign({},data,{
		sageadvice: plucked,
		blogposts: _.map(data.blogposts,function(post,n){
			return Object.assign({
				sageadvice: _.contains(plucked,n)
			},post);
		})
	});
});


// lift out action log

var counter = {post:0,pr:0,snippet:0},
	typeToKey = {post:"blogposts",pr:"pullrequests",snippet:"snippets"}

var actions = _.reduce(members,function(ret,data,id){
	return _.reduce(typeToKey,function(mem,jsonkey,type){
		return mem.concat(_.map(data[jsonkey]||[],function(obj,n){
			counter[type]++;
			return Object.assign({
				type: type,
				description: obj.description || obj.title,
				by: id,
				number: n+1
			},obj);
		}));
	},ret);
},[]);


// find heroes

var heroes = _.reduce(members,function(ret,user){
	return _.mapValues(ret,function(current,aspect){
		user[aspect] = user[aspect] || [];
		if (user[aspect].length > current[0]){
			return [user[aspect].length,[user.id]];
		} else if (user[aspect].length === current[0]){
			return [user[aspect].length,current[1].concat(user.id)];
		} else {
			return current;
		}
	});
},{blogposts:[0,[]],pullrequests:[0,[]],sageadvice:[0,[]],snippets:[0,[]]});

//console.log("MEMBERS",members);

module.exports = {
	members: members,
	actions: _.sortBy(actions,"when").reverse(),
	heroes: heroes,
	sageadvice: sageadvice,
	numberofposts: counter.post,
	numberofprs: counter.pr,
	numberofsnippets: counter.snippet
};
