import next from "next";

const puppeteer = require("puppeteer");
const ig = require('instagram-scraping');

export default (req, res) => {


    (async () => { 

        console.log('####################################################################################################################');
        console.log("{");
        console.log("type: '" + "name" + "',");
        console.log("name: '" + req.body.name + "',");
        console.log("}");
        let browser = await puppeteer.launch({headless: true}); //turn to FALSE to debug
        let page = await browser.newPage(); 

    if(req.body.youtubelink != "")
        {
        await page.goto(req.body.youtubelink + '/about', {waitUntil: 'networkidle2'});
        
        let youtubeStats = await page.evaluate(() => {

            var type, name,description,viewsString,viewsNum,subscriberString,subscriberNum, subscriberPrefix;

            var nameObj = document.querySelector('#channel-name > div > div');
            if(nameObj != null)
                name = nameObj.innerText;

            var descriptionObj = document.querySelector('#description');
            if(descriptionObj != null)
                description = descriptionObj.innerText;
            
            var subscriberStringObj = document.querySelector('#subscriber-count');
            if(subscriberStringObj != null)
            {
                subscriberString = subscriberStringObj.innerText;
                subscriberString = subscriberString.slice(0, subscriberString.length-12);
                subscriberPrefix = subscriberString.slice(0,subscriberString.length-1);
            }

            var endLetterObj = document.querySelector('#subscriber-count');
            if(endLetterObj != null)
            {
                var endLetter = document.querySelector('#subscriber-count').innerText.slice(0,document.querySelector('#subscriber-count').innerText.length-12);
                endLetter = endLetter.slice(endLetter.length-1);
                if (endLetter == "K")
                    subscriberNum = parseInt(parseFloat(subscriberPrefix)*1000);
                else if (endLetter == "M")
                    subscriberNum = parseInt(parseFloat(subscriberPrefix)*1000000);
                 else 
                subscriberNum = parseInt(subscriberString);
            }


            


        
            var viewStringObj = document.querySelectorAll('#right-column > yt-formatted-string')[2];
            if (viewStringObj != null)
            {
                viewsString = document.querySelectorAll('#right-column > yt-formatted-string')[2].innerText;
                viewsString = viewsString.slice(0,viewsString.length-6);
                viewsString = viewsString.replace(',', '').replace(',', '').replace(',', '');
                viewsNum = parseInt(viewsString);
            }

            var type = 'youtube';

            return {
                type,
                name,
                description,
                viewsString,
                viewsNum,
                subscriberString,
                subscriberNum,
            }
        })

        

        await page.goto(req.body.youtubelink, {waitUntil: 'networkidle2'});
        //Youtube video arrays and settings:
        var  videos = [];


        const videoHref = await page.evaluate(() => {
            var hrefs = [];
            for(i = 0; i < 5; i++)
                {
                    if(document.querySelectorAll('#items > ytd-grid-video-renderer')[i] != null)
                        hrefs[i] = document.querySelectorAll('a[id="video-title"]')[i].getAttribute('href');
                }
            return hrefs;
        })


        var videoEmbed = []; 
        for(var j = 0; j < 5; j++)
            videoEmbed[j] = '<iframe width="560" height="315" src="https://www.youtube.com/embed/' + videoHref[j].slice(9) + '" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';


        

        for(var j = 0; j < 5; j++)
            {
                //TODO sometime the waituntil will not do everything we need it to and sometimes cannot see the page yet when searching later. 
            await page.goto('https://www.youtube.com' + videoHref[j], {waitUntil: 'networkidle0'});
            let videoStats = await page.evaluate(() => 
            {
                
                let videoViews = document.querySelector('span[class="view-count style-scope ytd-video-view-count-renderer"]').innerText;
                let videoTitle = document.querySelector('h1[class="title style-scope ytd-video-primary-info-renderer"]').innerText;
                let videoPosted = document.querySelectorAll('yt-formatted-string[class="style-scope ytd-video-primary-info-renderer"]')[1].innerText;
                let videoLikes = document.querySelectorAll('yt-formatted-string[class="style-scope ytd-toggle-button-renderer style-text"]')[0].getAttribute('aria-label');
                let videoDislikes = document.querySelectorAll('yt-formatted-string[class="style-scope ytd-toggle-button-renderer style-text"]')[1].getAttribute('aria-label');

                function stringToNum(str) {
                    str = str.slice(0,str.search(" "));
                    while(str.search(",") != -1)
                        {
                            str = str.replace(',','');
                        }
                    return str
                  }

                videoViews = parseInt(stringToNum(videoViews));
                videoLikes = parseInt(stringToNum(videoLikes));
                videoDislikes = parseInt(stringToNum(videoDislikes));
                videoPosted = new Date("" + videoPosted + ' 00:00:00');

                return{
                    "title": videoTitle,
                    "views": videoViews,
                    "posted": videoPosted.toString(),
                    "likes": videoLikes,
                    "dislikes": videoDislikes,
                    }
            })

            const href = videoHref[j], embed = videoEmbed[j];
            videos[j] = {
                videoStats,
                href,
                embed,

            }
            console.log(videos[j]);

        }
        
        
        console.log(videos);
        console.log(youtubeStats);
        
        }

    if(req.body.instagramlink != "")
    {    
        
        // using username for scraping
        //cuts out just the username from the link
        const positionOfUser = req.body.instagramlink.search('.com/');
        var instaUser = req.body.instagramlink;

        if(positionOfUser != -1)
        {
            instaUser = req.body.instagramlink.slice(positionOfUser+5);
            const positionOfSlash = instaUser.search('/');
            instaUser = instaUser.slice(0,positionOfSlash);
        }

        ig.scrapeUserPage(instaUser).then(result => {
            console.dir(result);
          });
    }
 
    
    if(req.body.facebooklink != "")
    {    
        
        await page.goto(req.body.facebooklink , {waitUntil: 'networkidle2'});

        let facebookStats = await page.evaluate(() => {

            var type,
            name,
            likes,
            followers,
            website,
            category;

            if(document.querySelector('a[class="_64-f"] > span') != null)
                name = document.querySelector('a[class="_64-f"] > span').innerText;
            if(document.querySelectorAll('div[class="_4-u2 _6590 _3xaf _4-u8"] > div > div > div > div')[0] != null)
            {
                likes = document.querySelectorAll('div[class="_4-u2 _6590 _3xaf _4-u8"] > div > div > div > div')[0].innerText;
                likes = likes.slice(0,likes.length-17).replace(',', '').replace(',', '').replace(',', '');
            }
            if(document.querySelectorAll('div[class="_4-u2 _6590 _3xaf _4-u8"] > div > div > div._4bl9 > div')[1] != null)
            {
                followers = document.querySelectorAll('div[class="_4-u2 _6590 _3xaf _4-u8"] > div > div > div._4bl9 > div')[1].innerText;
                followers = followers.slice(0,followers.length-19).replace(',', '').replace(',', '').replace(',', '');
            }
            if(document.querySelectorAll('#u_0_q_Oa > div > a')[1] != null)
                website = document.querySelectorAll('#u_0_q_Oa > div > a')[1].innerText;
            if(document.querySelectorAll('div[class="_4bl9"] > div')[4] != null)
                {
                category = document.querySelectorAll('div[class="_4bl9"] > div')[4].innerText;
                //handles for some pages that added "contact on messenger"
                if(category.search('Contact') > -1)
                    category = document.querySelectorAll('div[class="_4bl9"] > div')[5].innerText;
                }
            var type = 'facebook';

            
            var likesNum = parseInt(likes);
            var followersNum = parseInt(followers);

            return {
                type,
                name,
                likesNum,
                followersNum,
                website,
                category,
            }
        })

        let postStats = await page.evaluate(() => {
            var posts = [];
            for(i = 0; i < 2; i++)
                {
                if(document.querySelectorAll('div[class="_5va1 _427x')[i] != null)
                    posts[i] = document.querySelectorAll('div[class="_5va1 _427x')[i].innerText;
                else
                    posts[i] = null;
                }
            var type = 'facebook-posts';
            return {
                type,
                posts,
            }
        })
        console.log(postStats);
        console.log(facebookStats);
}

        await browser.close();

        })();


    res.status(200).json({ info: 'scrape page', name: req.body.name })
  }
  