import { Puppeteer } from "puppeteer"


// This is the script
// based on req.body, call some api to get a webpage
// scrap page
// return json here
export default (req, res) => {

    const puppeteer = require("puppeteer");

    (async () => { 
    var browser = await puppeteer.launch({headless: false});
    var page = await browser.newPage(); 

    //gos to the facebook link
    await page.goto(req.body.facebooklink, {waitUntil: 'networkidle2'});

    let facebookStats = await page.evaluate(() => {
        var name = document.querySelector('a[class="_64-f"]').innerText;
        var likes = document.querySelectorAll('div[class="_4-u2 _6590 _3xaf _4-u8"] > div')[1].innerText;
        var followers = document.querySelectorAll('div[class="_4-u2 _6590 _3xaf _4-u8"] > div')[2].innerText;
        var website = document.querySelector('#u_0_q_x4').innerText;
        var category = document.querySelectorAll('div[class="_4-u2 _u9q _3xaf _4-u8"] > div ')[3].innerText;

        var type = 'facebook';
        var url = req.body.facebooklink;

        return {
            type,
            url,
            likes,
            followers,
            website,
            category,
        }
    })

    console.log(facebookStats);

    //goes to the youtube link 
    const ytAboutLink = req.body.youtubelink + '/about';
    await page.goto(ytAboutLink);
    //makes sure the page is loaded
    await document.querySelector('#channel-name').innerText;

    let youtubeStats = await page.evaluate(() => {

        var name = document.querySelector('#channel-name').innerText;
        var description = document.querySelector('#description').innerText;
        //var rightColumn = document.querySelectorAll('#right-column > yt-formatted-string')[2].innerText;
        var views = '100,000';
        var subscribers = document.querySelector('#subscriber-count').innerText;


        var type = 'youtube';
        var url = req.body.youtubelink;

        return {
            type,
            url,
            name,
            description,
            views,
            subscribers,
        }
    })

    console.log(youtubeStats);

    //go to instagram
    await page.goto(req.body.instagramlink, {waitUntil: 'networkidle2'});

    let instagramStats = await page.evaluate(() => {

        const mainStats = document.querySelectorAll('span[class="g47SY "]');
        
        var username = document.querySelector('h2[class="_7UhW9       fKFbl yUEEX   KV-D4              fDxYl     "]').innerText;
        var name = document.querySelector('h1[class="rhpdm"]').innerText;

        //change title to innerText to be formatted the way instagram does. 
        var numPosts = mainStats[0].innerText; 
        var numFollowers = mainStats[1].title;
        var numFollowing = mainStats[2].innerText;

        var bio = document.querySelector('div[class="-vDIg"] > span').innerText;
        var website = document.querySelector('div[class="-vDIg"] > a').innerText;

        var type = 'instagram';
        var url = req.body.instagramlink;

        return {
            type,
            url,
            name,
            username,
            numFollowers,
            numPosts,
            numFollowing,
            bio, 
            website,
        }
    })

    console.log(instagramStats);


    await browser.close();

    })();


    

    res.status(200).json({ info: 'scrape page', name: req.body.name })
  }
  