import { Puppeteer } from "puppeteer"


// This is the script
// based on req.body, call some api to get a webpage
// scrap page
// return json here
export default (req, res) => {

    const puppeteer = require("puppeteer");

    (async () => { 
    var browser = await puppeteer.launch({headless: true});
    var page = await browser.newPage(); 
    //gos to the facebook link
    await page.goto(req.body.facebooklink, {waitUntil: 'networkidle2'});

    let facebookStats = await page.evaluate(() => {
        var followers = document.querySelector('span[class="d2edcug0 hpfvmrgz qv66sw1b c1et5uql oi732d6d ik7dh3pa fgxwclzu a8c37x1j keod5gw0 nxhoafnm aigsh9s9 d9wwppkn fe6kdd0r mau55g9w c8b282yb iv3no6db jq4qci2q a3bd9o3v knj5qynh oo9gr5id hzawbc8m"]').innerText;
        var name = document.querySelector('h1[class="gmql0nx0 l94mrbxd p1ri9a11 lzcic4wl bp9cbjyn j83agx80"]').innerText;
        var website = document.querySelector('span[class="d2edcug0 hpfvmrgz qv66sw1b c1et5uql oi732d6d ik7dh3pa fgxwclzu a8c37x1j keod5gw0 nxhoafnm aigsh9s9 d9wwppkn fe6kdd0r mau55g9w c8b282yb iv3no6db jq4qci2q a3bd9o3v knj5qynh oo9gr5id hzawbc8m"] > a').innerText;
        //must be in the ' ....facebook.com..../about' page
        //var category = document.querySelector('div[class="ii04i59q a3bd9o3v jq4qci2q oo9gr5id"]').innerText;

        return {
            name,
            followers,
            website,
        }
    })

    console.log(facebookStats);

    })();


    

    res.status(200).json({ info: 'scrape page', name: req.body.name })
  }
  