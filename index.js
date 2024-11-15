const { chromium } = require("playwright");
const { HACKER_NEWS_URL } = require("./config");

const scraper = require("./scraper");
const sortCheck = require("./sortCheck");

async function sortHackerNewsArticles(){
    const browser = await chromium.launch({headless: false});
    const context = await browser.newContext();
    const page = await context.newPage();
    let ages = [];

    try {
        await page.goto(HACKER_NEWS_URL);
        await page.waitForLoadState('networkidle');
        await scraper(ages, page);
        console.log(sortCheck(ages));
    } catch(e) {
        console.log("Error encountered:", e);
    } finally {
        await browser.close();
    }
}

(async () => {
    await sortHackerNewsArticles();
})();