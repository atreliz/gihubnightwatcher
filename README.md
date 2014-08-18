GITHUB NIGHTWATCHER
=================

*"Keep and easy control of your Github Account repositories"* 

This is a node server that comunicate with github, and send info to a front side website.

Login credentials is made on server starting, and conexion with Github is via backend using octonode library.(https://github.com/pksunkara/octonode)

**SERVER:**

Install the packages with:

	npm install
	
Run the server using your credentials

	node gitreader.js [USER] [PASSWORD]
	
This will open a url on your browser.

	http://localhost:3000
	
**FRONT**

Will be two different pages.

	http://localhost:3000/

Here you choose your repo from a side bar, and the last commits will be displayed.

	http://localhost:3000/panel

Here you all repos will be dispalyed at the same time, with in it's last commits.

Others will be:
http://localhost:3000/panel  ->> response with a status
http://localhost:3000/repolist  ->> list of repos

**LIMITATIONS:**
Actually with the GITHUB API, commits are not paginated, and developers are only able to get the 30 last commits of each repo.


	
	
	
	

	
	