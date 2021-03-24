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

        console.dir(youtubeStats);

        

        await page.goto(req.body.youtubelink, {waitUntil: 'networkidle2'});
        //Youtube video arrays and settings:
        var  videos = [];


        const videoHref = await page.evaluate(() => {
            var hrefs = [];
            //at max, 6 videos or however many they have, if they have less. 
            for(i = 0; i < 6; i++)
                {
                    if(document.querySelectorAll('a[id="video-title"]')[i] != undefined)
                        hrefs[i] = document.querySelectorAll('a[id="video-title"]')[i].getAttribute('href');
                    else
                        return hrefs;
                }
            return hrefs;
        })

        var videoEmbed = []; 
        for(var j = 0; j < videoHref.length; j++)
            videoEmbed[j] = '<iframe width="560" height="315" src="https://www.youtube.com/embed/' + videoHref[j].slice(9) + '" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
        
        page.setViewport({ width: 1280, height: 1400 });

        for(var j = 0; j < videoHref.length; j++)
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
        
        
        console.dir(videos);
        
    }//end of youtube scrape

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
    }//end of instafram scrape

    if(req.body.facebooklink != "")
    {    
        //   '/pg/' ensures that the link goes to a page, and not a profile.
        // Any person who's stats matter will be on a page, not a profile. This forces that.
        await page.goto( 'https://www.facebook.com/pg/' + req.body.facebooklink.slice(req.body.facebooklink.search('.com/')+5) , {waitUntil: 'networkidle2'});

        
        page.setViewport({ width: 1280, height: 1400 });

        let facebookStats = await page.evaluate(() => {

            var type,
            name,
            likes,
            followers,
            website,
            category;

            function stringToNum(str) {
                if(str == '')
                    return
                str = str.slice(0,str.search(" "));
                while(str.search(",") != -1)
                        str = str.replace(',','');
                return str;
              }

            //loads a few more posts
            window.scrollTo(0,window.innerHeight*2);
            
            //type
            type = 'facebook';

            //name
            name = document.querySelectorAll('title')[0].innerText;
            name = name.slice(0, name.search(' - '));

                //like count ✔️
                var j=0; 
                while(j>=0)
                    {
                        if (document.querySelectorAll('div > div[class="_4bl9"]')[j] != null && document.querySelectorAll('div > div[class="_4bl9"]')[j].innerText.contains('people like this'))
                            {
                            likes = document.querySelectorAll('div > div[class="_4bl9"]')[j].innerText;
                            j=-2;
                            }
                        j++;
                    }
                    likes = stringToNum(likes);


                //follower count ✔️
                j=0; 
                while(j>=0)
                    {
                        if (document.querySelectorAll('div > div[class="_4bl9"]')[j] != null && document.querySelectorAll('div > div[class="_4bl9"]')[j].innerText.contains('people follow this'))
                            {
                            followers = document.querySelectorAll('div > div[class="_4bl9"]')[j].innerText;
                            j=-2;
                            }
                        j++;
                    }
                    followers= stringToNum(followers);

                //website
                j=0; 
                while(j>=0 && j<50)
                    {
                        if (document.querySelectorAll('div > div > a')[j].innerText.contains('www.'))
                            {
                            website = document.querySelectorAll('div > div > a')[j].innerText;
                            j=-2;
                            }
                        j++;
                    }
                
                             
                
                //category
                j=10;
                while(j>=0)
                    {
                        if (document.querySelectorAll('div > div > a')[20].hasAttribute('href') && document.querySelectorAll('div > div > a')[j].getAttribute('href').contains('/pages/category/'))
                            {
                            category = document.querySelectorAll('div > div > a')[j].innerText;
                            j=-2;
                            }
                        j++;
                    }
                    
            return {
                type,
                name,
                likes,
                followers,
                website,
                category,
            }
        })
        console.dir(facebookStats);

        /**
         * let postStats = await page.evaluate(() => {
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
         */

        
    }//end of facebook scrape 

    if(req.body.twitterlink != "")
    {        
        await page.goto(req.body.twitterlink, {waitUntil: 'networkidle2'});
        page.setViewport({ width: 1280, height: 1400 });
        
        let twitterStats = await page.evaluate(() => {
            const link = document.URL;
            const username = link.slice(link.indexOf('.com/')+5);
            var type = 'twitter';
            var followers = document.querySelectorAll('[href="/' + username + '/followers"]')[0].innerText;
            var following = document.querySelectorAll('[href="/' + username + '/following"]')[0].innerText;
            
            
            function strToNum(str) 
            {
                var numberStr = str.slice(0, str.search(" "));
                        //e.x. '23.4K'
                var numPrefix = numberStr.slice(0,numberStr.length-1);
                var endLetter = numberStr.slice(numberStr.length-1);
                        //e.x. 'K'
                if (endLetter == "K")
                    return parseInt(parseFloat(numPrefix)*1000);
                else if (endLetter == "M")
                    return parseInt(parseFloat(numPrefix)*1000000);
                 else 
                    return parseInt(numPrefix);
            }

            followers = strToNum(followers);
            following = strToNum(following);

            return{
                type,
                link,
                username,
                followers,
                following,
            }
        })
        console.log(twitterStats);
    }//end of twitter scrape
    
    if(req.body.tiktoklink != "")
    {
        
        await page.goto(req.body.tiktoklink, {waitUntil: 'networkidle2'});
        page.setViewport({ width: 1280, height: 1400 });
        let tiktokStats = await page.evaluate(() => {

            var website = document.querySelectorAll('.share-links')[0].innerText;
            var followers = document.querySelectorAll('strong[title="Followers"]')[0].innerText;
            var likes = document.querySelectorAll('strong[title="Likes"]')[0].innerText;
            var following = document.querySelectorAll('strong[title="Following"]')[0].innerText;
            var description = document.querySelectorAll('.share-desc')[0].innerText;
            var username = document.querySelectorAll('.share-title')[0].innerText

            //get the tiktokHrefs
            var tiktokHrefs = [];
            for(var i = 0; i < 6; i++)
            {
                if(document.querySelectorAll('.video-feed-item')[i] != undefined)
                    tiktokHrefs[i] = document.querySelectorAll('.video-feed-item')[i].querySelectorAll('a')[0].getAttribute('href');
                else
                    return tiktokHrefs; 
            }

            return{
                username,
                followers, 
                following,
                likes,
                website, 
                description,
                tiktokHrefs,
            }
        });
        console.log(tiktokStats);


        //loop goes through each video, retrieves stats. 
        var tiktokVideoStats = [];
        for(var i = 0; i < tiktokStats.tiktokHrefs.length; i++)
        {
            await page.goto(tiktokStats.tiktokHrefs[i], {waitUntil: 'networkidle2'});
            let videoStats = page.evaluate(() => {
                var vidLikes = document.querySelectorAll('[title="like"]')[0].innerText;
                var vidComments = document.querySelectorAll('[title="comment"]')[0].innerText;
                var vidShares = document.querySelectorAll('[title="share"]')[0].innerText;
                var vidCaption = document.querySelectorAll('.tt-video-meta-caption')[0].innerText;
                var vidMusicLink = document.querySelectorAll('.video-music-wrapper')[0].getAttribute('href');
                var vidMusicName = document.querySelectorAll('.video-music-wrapper')[0].innerText;

                return{
                    vidLikes,
                    vidComments, 
                    vidShares,
                    vidCaption, 
                    vidMusicName, 
                    vidMusicLink,
                }
        })
        tiktokVideoStats[i] = videoStats;
        }
        console.log(tiktokVideoStats);
    }//end of tiktok scrape
        await browser.close();
        })();


    res.status(200).json({ info: 'scrape page', name: req.body.name })
  }
  