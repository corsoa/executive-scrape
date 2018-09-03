import dotenv from 'dotenv';
import puppeteer from 'puppeteer';

dotenv.load();

const BASE_URL = `${process.env.BASE_PROTOCOL}://${process.env.BASE_DOMAIN}`;
const IS_HEADLESS = process.env.IS_HEADLESS !== 'false';

async function run() {
  puppeteer.launch({
    headless: IS_HEADLESS
  }).then(async (browser) => {
    const page = await browser.newPage();
    await page.goto(BASE_URL);
    const topLevelMenuSelector = 'ul.nav.navbar-nav>li:nth-child(2)>ul>li>a';
    page.$$(topLevelMenuSelector).then(async (results) => {
      const getLinkHrefs = [];
      results.map((elementHandle) => {
        getLinkHrefs.push(elementHandle.getProperty('href'));
      });
      Promise.all(getLinkHrefs).then((linkResults) => {
        const rawLinks = [];
        linkResults.map((linkResult) => {
          rawLinks.push(linkResult._remoteObject.value);
        });
        console.log(rawLinks);
        browser.close();
      });
    });
  });
}
run();
