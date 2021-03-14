const puppeteer = require("puppeteer");
const ig = require('instagram-scraping');

export default (req, res) => {

    (async () => { 
        let browser = await puppeteer.launch({headless: true}); //turn to FALSE to debug
        console.log('SCRAPING...')
        let page = await browser.newPage(); 

        if(req.body.youtubelink != "")
        {
        await page.goto(req.body.youtubelink + '/about', {waitUntil: 'networkidle2'});
        
        let youtubeStats = await page.evaluate(() => {

            var name = document.querySelector('#channel-name > div > div').innerText;
            var description = document.querySelector('#description').innerText;
            var subscriberString = document.querySelector('#subscriber-count').innerText;
            subscriberString = subscriberString.slice(0, subscriberString.length-12);

            var endLetter = document.querySelector('#subscriber-count').innerText.slice(0,document.querySelector('#subscriber-count').innerText.length-12);
            endLetter = endLetter.slice(endLetter.length-1);

            var subscriberPrefix = subscriberString.slice(0,subscriberString.length-1);

            if (endLetter == "K")
                var subscriberNum = parseInt(parseFloat(subscriberPrefix)*1000);
            else if (endLetter == "M")
                var subscriberNum = parseInt(parseFloat(subscriberPrefix)*1000000);
            else 
                var subscriberNum = parseInt(subscriberString);


            var viewsString = document.querySelectorAll('#right-column > yt-formatted-string')[2].innerText;
            viewsString = viewsString.slice(0,viewsString.length-6);
            viewsString = viewsString.replace(',', '');
            viewsString = viewsString.replace(',', '');
            viewsString = viewsString.replace(',', '');
            var type = 'youtube';

            var viewsNum = parseInt(viewsString);

            return {
                type,
                name,
                description,
                //viewsString,
                viewsNum,
                subscriberString,
                subscriberNum,
            }
        })

        await page.goto(req.body.youtubelink + "/featured", {waitUntil: 'networkidle2'});

        let videoStats = await page.evaluate(() => {
            var videos = [];
            for(i = 0; i < 10; i++)
                {
                videos[i] = document.querySelectorAll('#items > ytd-grid-video-renderer')[i].innerText;
                }
            var type = 'youtube-videos';
            return {
                type,
                videos,
            }
        })

        console.log(youtubeStats);
        console.log(videoStats);
        }

    if(req.body.instagramlink != "")
    {    
        
        // using username for scraping
        const positionOfUser = req.body.instagramlink.search('.com/');
        let instaUser = req.body.instagramlink.slice(positionOfUser+5); //26
        const positionOfSlash = instaUser.search('/');
        instaUser = instaUser.slice(0,positionOfSlash);

        var username, numFollowers, numFollowing, bio, website, numPosts, posts, fullName; 

        let instagramStats = ig.scrapeUserPage(instaUser).then(result => {
            username = instaUser;
            numFollowers = result.user.edge_followed_by.count;
            numFollowing =  result.user.edge_follow.count;
            bio = result.user.biography;
            website = result.user.external_url;
            posts = [];
            numPosts = result.total; 

            

            for(var i = 0; i < result.total; i++)
            {
                var numLikes = result.medias[i].like_count;
                var numComments = result.medias[i].comment_count;
                posts[i] = {
                    numLikes,
                    numComments,
                }
            }
            fullName = user.full_name;

            //testing print it this way instead of printing 
            //"instagramStats" due to it printing a promise and not a 
            // json format
            console.log("{");
            console.log("username: '" + username + "',");
            console.log("fullName: '" + fullName + "',");
            console.log("numFollowers: '" + numFollowers+ "',");
            console.log("numFollowing: '" + numFollowing+ "',");
            console.log("bio: '" + bio + "',");
            console.log("website: '" + website + "',");
            console.log("posts: " + posts + ",");
            console.log("numPosts: " + numPosts + ",");
            console.log("}");

            return {
                fullName,
                username, 
                numPosts,
                numFollowers,
                numFollowing,
                bio,
                website,
                posts,
            }
        })

        console.log(instagramStats);
    }
 
        await browser.close();

        })();


    res.status(200).json({ info: 'scrape page', name: req.body.name })
  }
  