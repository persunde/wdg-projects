# wdg-projects
A list of /wdg/ personal projects

Inspired by an /adg/ project found here: http://recap.agdg.io/info

## If you want to contribute
1. Build a scraper
	- Find the posts containing /wdg/ users personal projects
	- Follow the post format used by /adg/ as seen here: http://recap.agdg.io/info
	```text
	:: [title] ::
	dev ::
	tools ::
	web ::
	progress ::
	```
	- Someone needs to host the server
2. Build the frontend
	- Lets host it on GitHub Pages for free
	- Setup a CDN?
	- Buy a proper domain?

## How to contribute?
Please open an issue where you say what you are going to do to avoid multiple people working on the same things.

If you don't want to do that, just send a pull-request and it will be merged into the repo on the owner / maintainers discretion.

# Tech-stack
## Scraper
### Language:
One of the following:
- Go
- Node
- Python

### Database 
Will use **Sqlite**

The scraper should be the easy part. The 4chan API is easy to use. 
The scraper will use Sqlite as its database. The Scraper will update the DB when it finds new projects in a /wdg/ post. Then it should the Sqlite .db file to this or another repo.

Once the Scraper have found a new project, updated the DB and pushed all updates to the repo, it should trigger an event that re-generates the (static) website so that the website is constantly updated with the newest projects. This will be done **using Github Actions**.

## Frontent 
Will be built using a static site generator like Nextjs, Gatsby or something else. I recommend Nextjs.
- Static Site Generator
	- React with Nextjs / Gatsby?
	- Vue? If people want to use that, then make it. If I have to make the frontend, I will use Nextjs.
- Hosted on GitHub Pages for free hosting


## Need to get in touch through private channels?
Send me an email at wdg@iloveoss.com 
- NOTE: it is a forwarding address, so I will reply from another email account