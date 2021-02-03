# wdg-projects
A list of /wdg/ personal projects

Inspired by an /adg/ project found here: http://recap.agdg.io/info

See the project homepage here: https://wdg.one/

## How does wdg.one work?
The crawler reads the /wdg/ threads for posts containing the specific syntax and then updates the DB with the info in the post.

Once the Scraper have found a new project, it updates the DB and re-generates the (static) website so that the website is constantly updated with the newest projects from /wdg/.

If you want your project featured on https://wdg.one post comments with this syntax. Make sure the title is always the same, as it will be used to identify which project each post belongs to, so that you can see the progress on wdg.one

```
:: my-project-title ::
dev:: anon
tools:: node, react, etc
link:: https://my.website.com
repo:: github.com/user/repo
progress:: This is the progress update text where you can write whatever you want. But keep it on one line for now, otherwise the content will be cut.
```

## If you want to contribute
Look at the Issues and see if you want to help with any of those.

If you have any ideas you want to add, please open an issue and start developing away. Create a pull-request once you are done and it will hopefully be merged into the repo on the owner / maintainers discretion.

## The two components in this monorepo
There are two components to run.
1. The **Crawler**
	This program will go through the active /wdg/ threads and look for comments that follow the format specified in [How does wdg.one work?](#How-does-wdg.one-work?)
	Then it will add the data from these comments to the Database
2. The **Frontend**
	This is the website. It is fully static (no server side code) and built using Nextjs.
	When it is built, it gets all the data from the DB and creates the sub-pages for each project that have been fetched by the Crawler.

## Perquisites
### Crawler:
* Install Golang >= 1.14 
	* https://golang.org/doc/install
* Install the Golang dependencies
	```sh
	cd crawler/
	go get -u ./...
	#the -u parameter also updates any existing packages
	```
### Frontend
Install Node, and Yarn or NPM:
* https://www.npmjs.com/get-npm
	* See section: **Use a Node.js version manager**	
* https://classic.yarnpkg.com/en/docs/install/

```sh
cd frontend/
npm install
# or
yarn install
```

## To run the Crawler
```sh
go run main.go
```
The program will update the SQLite database database/wdgprojects.db

## To run the Frontend
```sh
npm run dev
# or 
yarn dev
```

You can now access the website here:
```
http://localhost:3000
```

# Tech-stack
## Scraper
### Language:
[Golang](https://golang.org/)

### Database 
**Sqlite**

## Frontent 
Will be built using a Nextjs as our static site generator. The deploy script is setup.
- Static Site Generator
	- Nextjs - SSG with React
- Hosted on GitHub Pages for free hosting


## Need to get in touch through private channels?
Send me an email at anon@wdg.one
- NOTE: it is a forwarding address, so I will reply from another email account