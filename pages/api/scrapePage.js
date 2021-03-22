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
        let browser = await puppeteer.launch({headless: false, args: ['--window-size=1920,1080']}); //turn to FALSE to debug
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


        var numVideos = 15; 
        const videoHref = await page.evaluate(() => {
            var hrefs = [];
            for(i = 0; i < numVideos; i++)
                {
                    if(document.querySelectorAll('#items > ytd-grid-video-renderer')[i] != null)
                        hrefs[i] = document.querySelectorAll('a[id="video-title"]')[i].getAttribute('href');
                    else
                        numVideos = i; 
                }
            return hrefs;
        })

        var videoEmbed = []; 
        for(var j = 0; j < 15; j++)
            videoEmbed[j] = '<iframe width="560" height="315" src="https://www.youtube.com/embed/' + videoHref[j].slice(9) + '" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
        
        page.setViewport({ width: 1280, height: 1400 });

        for(var j = 0; j < 15; j++)
            {
                //TODO sometime the waituntil will not do everything we need it to and sometimes cannot see the page yet when searching later. 
            await page.goto('https://www.youtube.com' + videoHref[j], {waitUntil: 'networkidle0'});
            //waits for special selector to load

            await page.waitForSelector('span[class="view-count style-scope ytd-video-view-count-renderer"]', {
                visible: true,
              });
            await page.waitForSelector('yt-formatted-string[class="count-text style-scope ytd-comments-header-renderer"] > span', {
                visible: true,
              });
            

            let videoStats = await page.evaluate(() => 
            {
                let videoViews = document.querySelector('span[class="view-count style-scope ytd-video-view-count-renderer"]').innerText;
                let videoTitle = document.querySelector('h1[class="title style-scope ytd-video-primary-info-renderer"]').innerText;
                let videoPosted = document.querySelectorAll('yt-formatted-string[class="style-scope ytd-video-primary-info-renderer"]')[1].innerText;
                let videoLikes = document.querySelectorAll('yt-formatted-string[class="style-scope ytd-toggle-button-renderer style-text"]')[0].getAttribute('aria-label');
                let videoDislikes = document.querySelectorAll('yt-formatted-string[class="style-scope ytd-toggle-button-renderer style-text"]')[1].getAttribute('aria-label');
                var videoComments = document.querySelector('yt-formatted-string[class="count-text style-scope ytd-comments-header-renderer"] > span').innerText;

                function stringToNum(str) {
                    if(str == '')
                        return
                    str = str.slice(0,str.search(" "));
                    while(str.search(",") != -1)
                            str = str.replace(',','');
                    return str
                  }

                videoViews = parseInt(stringToNum(videoViews));
                videoLikes = parseInt(stringToNum(videoLikes));
                videoDislikes = parseInt(stringToNum(videoDislikes));
                videoPosted = new Date("" + videoPosted + ' 00:00:00');
                videoComments = parseInt(stringToNum(videoComments));

                return{
                    "title": videoTitle,
                    "views": videoViews,
                    "posted": videoPosted.toString(), //this is a Date object, so it will show up as a {} when it prints out
                    "likes": videoLikes,
                    "dislikes": videoDislikes,
                    "comments": videoComments,
                    }
            });

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

        page.setViewport({ width: 1280, height: 1400 });

        let facebookStats = await page.evaluate(() => {

            window.scrollTo(0,window.innerHeight);

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
            var numPosts = 5;
            var posts = [], postText = [], postMedia = [], postLikes = [], postComments = [], postShares = [];
            for(i = 0; i < numPosts; i++)
                {
                if(document.querySelectorAll('div[class="_5va1 _427x')[i] != null)
                    {
                    //start of media section 
                    var medias = [];
                    var photos = [];
                    var videos = [];
                    
                    //gets all the photos from the post until it finds an icon (with width 18)
                    var j = 0;
                    while(document.querySelectorAll('div[class="du4w35lb k4urcfbm l9j0dhe7 sjgh65i0"]')[i].querySelectorAll('img')[j].getAttribute('width') != 18)
                        {
                            photos[j] = document.querySelectorAll('div[class="du4w35lb k4urcfbm l9j0dhe7 sjgh65i0"]')[i].querySelectorAll('img')[j].getAttribute('src');
                            j++
                        }

                    //logs all the videos in a post till the videos are returning null
                        j=0;
                    while(document.querySelectorAll('div[class="du4w35lb k4urcfbm l9j0dhe7 sjgh65i0"]')[i].querySelectorAll('video')[j] != undefined)
                    {
                         videos[j] = document.querySelectorAll('div[class="du4w35lb k4urcfbm l9j0dhe7 sjgh65i0"]')[i].querySelectorAll('video')[j].getAttribute('src');
                         j++
                    }
                    j=0;
                    
                    medias = [photos, videos];
                    postmedia[i] = medias; 
                    //end of media searching

                    postText[i] = document.querySelectorAll('div[class="kvgmc6g5 cxmmr5t8 oygrvhab hcukyx3x c1et5uql ii04i59q"] > div')[i].innerText;
                    postLikes[i] = document.querySelectorAll('div[class="du4w35lb k4urcfbm l9j0dhe7 sjgh65i0"]')[i].querySelectorAll('span[class="gpro0wi8 pcp91wgn"]')[0].innerText;
                    postComments[i] = document.querySelectorAll('div[class="du4w35lb k4urcfbm l9j0dhe7 sjgh65i0"]')[i].querySelectorAll('div[class="gtad4xkn"]')[0].innerText;
                    postShares[i] = document.querySelectorAll('div[class="du4w35lb k4urcfbm l9j0dhe7 sjgh65i0"]')[i].querySelectorAll('div[class="gtad4xkn"]')[1].innerText;

                    post[i] = {
                        postText,
                        postMedia, 
                        postLikes, 
                        postComments,
                        postShares,
                        }
                    }
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
  