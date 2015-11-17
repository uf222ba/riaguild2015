
var React = require("react"),
	_ = require("lodash"),
	members = require("../data/members").members,
	Icon = require("./icon"),
	Badge = require("./badge"),
	markdown = require("markdown").markdown;

var Member = React.createClass({
	render: function(){
		var data = members[this.props.params.name],
			posts = data.blogposts.map(function(post,n){
				return <li key={n}><a target="_blank" href={post.url}>{post.title+" ("+post.when+(post.sageadvice ? ", sage advice!":"")+")"}</a></li>;
			}),
			pullrequests = (data.pullrequests || []).map(function(pr,n){
				var targetuser = members[pr.target] || {github: null};
				return (
					<tr key={n}>
						<td><Badge id={targetuser.github} /></td>
						<td><a href={pr.url} target="_blank">{pr.description}</a></td>
					</tr>
				);
			}),
			snippets = (data.snippets || []).map(function(snippet,n){
				return <li key={n}><a target="_blank" href={snippet.url}>{snippet.description+" ("+snippet.when+")"}</a></li>;
			}),
			received = (data.received || []).map(function(pr,n){
				var authoruser = members[pr.by];
				return (
					<tr key={n}>
						<td><Badge id={authoruser.github} /></td>
						<td><a href={pr.url} target="_blank">{pr.description}</a></td>
					</tr>
				);
			}),
			pubappURL = (data.projectrepo === data.github+".github.io"
				// using special personal gh-pages url
				? data.projectrepo
				// using normal repo
				: data.github+".github.io/"+data.projectrepo+"/"+(data.projectentry||"")
			);
		return (
			<div>
				<h3>{data.name}</h3>

				<p><Icon icon={data.icon} /></p>				

				<div dangerouslySetInnerHTML={{__html:markdown.toHTML(data.presentation)}}/>
				<h3>Contact</h3>
				Github: {data.github}, Slack: {data.slack}
				{data.projectrepo && (
					<div>
						<h3>Project</h3>
						{(data.projectdesc || "<no description given>")+" "} 
						  (<a href={"http://github.com/"+data.github+"/"+data.projectrepo}>code</a>) 
						  (<a href={"http://"+pubappURL}>run</a>) 
					</div>
				)}
				<h3>Blog posts:</h3>
				<ul>{posts}</ul>
				{snippets.length && (
					<div>
						<h3>Code snippets</h3>
						<ul>{snippets}</ul>
					</div>
				) || ""}
				{pullrequests.length && (
					<div>
						<h3>Pull requests</h3>
						<table>
							<thead><tr><th>Target</th><th>Content</th></tr></thead>
							<tbody>{pullrequests}</tbody>
						</table>
					</div>
				) || ""}
				{received.length && (
					<div>
						<h3>Received pull requests</h3>
						<table>
							<thead><tr><th>By</th><th>Content</th></tr></thead>
							<tbody>{received}</tbody>
						</table>
					</div>
				) || ""}
			</div>
		);
	}
});

module.exports = Member;
