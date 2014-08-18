var github = require('octonode'),
	open = require('open');





if(process.argv[2] && process.argv[3]){
	 var client = github.client({
	  username: process.argv[2],
	  password: process.argv[3]
	});
}else{
	console.log("ERROR-Provide git credentials");
}

//Security access credentials
var accessLogin={"user":"Kuasars","pass":"Macnomola"};
var noSecurity=false;

//API GITHUG
var ghorg, ghrepo, ghme   = client.me();


// USING on core
var repo=[];
var mySize=10;

// ADDING SERVER

var express = require('express');
var app = express();

app.listen(3000);





app.get('/', function(req,res) {
	res.sendfile('public/index.html');
});

app.get('/panel', function(req,res) {
	res.sendfile('public/panel.html');
});

app.get('/zepto.min.js', function(req,res) {
  res.sendfile('public/zepto.min.js');
});



app.get('/my.css', function(req,res) {
  res.sendfile('public/my.css');
});


app.get('/status', function(req, res){
  res.send('GIT Nightwatcher ready');
});


app.get('/repolist', function(req, res){
  res.send(repo);
});


//example
//http://localhost:3000/commits?repo=group/repo

//https://developer.github.com/v3/
//API github only return 30 commits maximun, and have no pagination :(

app.get('/commits', function(req, res) {
	console.log(req.query.repo);

	var ghrepo=client.repo(req.query.repo);
	var commits=[];

	ghrepo.commits(function(err, data, headers) {
		console.log("******** **************** ******** **************** ******** ****************");
		//console.log("******** Commits from "+this.name);
		
		if(err){ 
			 console.log("error: " + err);
			 res.send("error: " + err);
		}else{

			console.log("typeof data");

			console.log(typeof data);
			//console.log(data);
			console.log("SIZE:"+data.length);
			var size= data.length>mySize ? mySize : data.length;

				if(typeof data != undefined ){
					for (var p=0;p<size;p++){
						var sha=data[p]["sha"] ? data[p]["sha"] : "";
						var message=data[p].commit.message ? data[p].commit.message : "";
						var name=data[p].commit.committer.name ? data[p].commit.committer.name : "";
						var date=data[p].commit.committer.date ? data[p].commit.committer.date: "";

				 		commits.push({"sha":sha,"date":date,"sms":message,"commiter":name});
			 		}
			 		res.send(commits);
				}else{
					res.send(data);
				}
	 	 		
			 	
		}
		

		//console.log(ghrepo);									
	 	
	});

  
});





//LOGIN
client.get('/users/alextrebolle', {}, function (err, status, body, headers) {

			
		//Getting ORG
		ghme.orgs(function(err, data, headers) {
				if(err){ 
					 console.log("error: " + err);
				}
			 	console.log("ORGANIZATION **********");
			 	console.log(data);

			 	 var youOrg=data[0].login
			 	  ghorg = client.org(youOrg);

			 	 
				//Getting REPOS
			 	  ghorg.repos(function(err, data, headers) {
						if(err){ 
							 console.log("error: " + err);
						}
					 	console.log("REPOS ORG **********");
					 	 //console.log(data);
					 	 var obj=data;
					 	 

					 	 for (var key in obj) {						 
							//console.log(key + " -> " + obj[key]);
							repo.push(obj[key]["full_name"]);
							//repo.push(obj[key]);  
						}
							console.log(repo);

							//After loading repos, open the site
							open('http://localhost:3000');
					}); 	
		});

});




















