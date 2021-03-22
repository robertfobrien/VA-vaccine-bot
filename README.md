## The Mediakits.com Ghost Scraper

## Overview
This scraper is an internal tool to create “ghost” mediakits by pulling information publicly available on their profiles. A user will input relevant social media links, and it will process publicly available information and store that in the form of a media kit on our end, later to be marketed to prospective users.
Users will then be able to claim the “ghost” profiles made for them as their own, and connect in privately available data to build a more informative kit. 

## How to use this tool

run to install all the packages we use
```
yarn
```
then...
Run the development server:

```bash
npm run dev
# or
yarn dev
```


Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Then, type the name and links into the textbox and press
```bash
submit
```

After, check your console log to see what's spit out

This README will be updates as I build out this tool.

## Background

This tool is intended to give prospective users the ability to claim their media kits and easily build up their account right after creating an account. Marketing a media kit to a prospective user with their own personal information will make users much more inclined to use the service. We are basing this model off of how Yelp blew up their site online:

	Yelp, “purchased a database of over 20 million business locations. This database was old and inaccurate, but it created the framework for what Yelp called “claimed business locations ” (Jordan Bowman)

[Yelp Article](https://medium.com/swlh/building-yelp-bc4e62c4db3b)

With our ghost-profile we would take the best of Yelp’s system and improve upon it. The tool will scrape data from public and free data to be able to produce unclaimed media kits. The data we collect will also be up to date and accurate, as opposed to Yelp’s model. 

## Design
Primary technologies used
	Node.js, JavaScript, Puppeteer, HTML
Information collected
	Facebook: followers, likes, recent post data, category, website
	Youtube: subscribers, views, category, popular video stats, website 
	Instagram: followers, following, recent post data, website, bio

## APIs

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

