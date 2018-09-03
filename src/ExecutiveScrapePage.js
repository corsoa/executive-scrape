class ExecutiveScrapePage {
  constructor(browser, url) {
    this.browser = browser;
    this.url = url;
  }

  async handlePage() {
    console.log('handling page');
    const page = await this.browser.newPage();
    await page.goto(this.url);
  }
}
export default ExecutiveScrapePage;
