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
    await browser.close();
  });
}
run();
