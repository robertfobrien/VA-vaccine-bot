import next from "next";

const puppeteer = require("puppeteer");
const ig = require('instagram-scraping');

export default (req, res) => {


    const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch({headlass: false})
  const page = await browser.newPage()
  
  await page.goto('https://www.cvs.com/vaccine/intake/store/covid-screener/covid-qns')
  
  await page.setViewport({ width: 1440, height: 746 })
  
  await page.waitForSelector('.form-group:nth-child(3) > fieldset > .radio-btn-wrapper > .radioBtn-control:nth-child(2) > label')
  await page.click('.form-group:nth-child(3) > fieldset > .radio-btn-wrapper > .radioBtn-control:nth-child(2) > label')
  
  await page.waitForSelector('.form-group:nth-child(4) > fieldset > .radio-btn-wrapper > .radioBtn-control:nth-child(2) > label')
  await page.click('.form-group:nth-child(4) > fieldset > .radio-btn-wrapper > .radioBtn-control:nth-child(2) > label')
  
  await page.waitForSelector('.form-group:nth-child(5) > fieldset > .radio-btn-wrapper > .radioBtn-control:nth-child(2) > label')
  await page.click('.form-group:nth-child(5) > fieldset > .radio-btn-wrapper > .radioBtn-control:nth-child(2) > label')
  
  await page.waitForSelector('.imz-bg > cvs-covid-questionnaire > #content > .footer-content-wrapper > .btn-control')
  await page.click('.imz-bg > cvs-covid-questionnaire > #content > .footer-content-wrapper > .btn-control')
  
  await page.waitForSelector('.form-group > .row > .radio-btn-wrapper > .radioBtn-control:nth-child(1) > label')
  await page.click('.form-group > .row > .radio-btn-wrapper > .radioBtn-control:nth-child(1) > label')
  
  await page.waitForSelector('.imz-bg > cvs-covid-dose-selection > #content > .footer-content-wrapper > .btn-control')
  await page.click('.imz-bg > cvs-covid-dose-selection > #content > .footer-content-wrapper > .btn-control')
  
  await page.waitForSelector('#generic #jurisdiction')
  await page.click('#generic #jurisdiction')
  
  await page.select('#generic #jurisdiction', '42: EID_VA')
  
  await page.waitForSelector('.imz-bg > cvs-eligibility-covid > #content > .footer-content-wrapper > .btn-control')
  await page.click('.imz-bg > cvs-eligibility-covid > #content > .footer-content-wrapper > .btn-control')
  
  await page.waitForSelector('fieldset #q1_0')
  await page.click('fieldset #q1_0')
  
  await page.waitForSelector('.form-group > .radio-btn-wrapper > .radio-btn-wrapper > .radioBtn-control:nth-child(1) > label')
  await page.click('.form-group > .radio-btn-wrapper > .radio-btn-wrapper > .radioBtn-control:nth-child(1) > label')
  
  await page.waitForSelector('fieldset #consentText')
  await page.click('fieldset #consentText')
  
  await page.waitForSelector('.imz-bg > cvs-eligibility-questionnaire > #content > .footer-content-wrapper > .btn-control')
  await page.click('.imz-bg > cvs-eligibility-questionnaire > #content > .footer-content-wrapper > .btn-control')
  
  await page.waitForSelector('.imz-bg > cvs-cvd-how-to-schedule > #content > .footer-content-wrapper > .btn-control')
  await page.click('.imz-bg > cvs-cvd-how-to-schedule > #content > .footer-content-wrapper > .btn-control')
  
  await page.waitForSelector('#generic #address')
  await page.click('#generic #address')
  
  await page.waitForSelector('.form-group > .row > .flex-container > .search-icon > img')
  await page.click('.form-group > .row > .flex-container > .search-icon > img')
  
  await browser.close()
})()


    res.status(200).json({ info: 'scrape page', name: req.body.name })
  }
  