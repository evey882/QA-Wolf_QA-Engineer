// required dependencies
const { chromium } = require("playwright");
const scraper = require("./scraper");
const sortCheck  = require("./sortCheck");
const { HACKER_NEWS_URL } = require("./config");

describe('Launch Browser', () => {
    test("Open HackerNews", async () => {
        const browser = await chromium.launch();
        const context = await browser.newContext();
        let page = await context.newPage();
        page.goto(HACKER_NEWS_URL);
    })
});

describe('Scrapes the necessary data from the html', () => {
    let browser;
    let page;
    let ages = [];
    let listOfAges = '';

    beforeAll(async() => {
        browser = await chromium.launch();
        page = await browser.newPage();
    });

    test("Scrapes the data", async () => {
        const startingAge = new Date("2024-10-14T15:19:12.000000Z");
        for (let i = 0; i < 15; i++){
            const timeStamp = new Date("2024-10-14T15:19:12.000000Z");
            timeStamp.setHours(startingAge.getHours() - (i * i));

            listOfAges += `<span class="age" title="${timeStamp.toISOString()}"></span>\n`;
        }

        await page.setContent(`
            <html>
            <body>
                ${listOfAges}
            </body>
            </html>
        `
        );

        await scraper(ages, page);
    });

    describe('Sorts an array of collected dates with times - checks for ascending', () =>{
        let ages = [
            '2024-10-14T15:19:12.000Z',
            '2024-10-14T14:19:12.000Z',
            '2024-10-14T11:19:12.000Z',
            '2024-10-14T06:19:12.000Z',
            '2024-10-13T23:19:12.000Z',
            '2024-10-13T14:19:12.000Z',
            '2024-10-13T03:19:12.000Z',
            '2024-10-12T14:19:12.000Z',
            '2024-10-11T23:19:12.000Z',
            '2024-10-11T06:19:12.000Z',
            '2024-10-10T11:19:12.000Z',
            '2024-10-09T14:19:12.000Z',
            '2024-10-08T15:19:12.000Z',
            '2024-10-07T14:19:12.000Z',
            '2024-10-06T11:19:12.000Z'
        ];

        test("Determines if the list is newest to oldest", async()=>{
            let verdict = sortCheck(ages);
            expect(verdict).toBe("Posts are sorted from newest to oldest");
        })
    })
});

describe('Scrapes the necessary data from the html', () => {
    let browser;
    let page;
    let ages = [];
    let listOfAges = '';

    beforeAll(async() => {
        browser = await chromium.launch();
        page = await browser.newPage();
    });

    test("Scrapes the data", async () => {
        const startingAge = new Date("2024-10-14T15:19:12.000000Z");
        for (let i = 0; i < 15; i++){
            const timeStamp = new Date("2024-10-14T15:19:12.000000Z");
            timeStamp.setHours(startingAge.getHours() - (i * i));

            listOfAges += `<span class="age" title="${timeStamp.toISOString()}"></span>\n`;
        }

        await page.setContent(`
            <html>
            <body>
                ${listOfAges}
            </body>
            </html>
        `
        );

        await scraper(ages, page);
    });

    describe('Sorts an array of collected dates with times - checks for ascending', () =>{
        let ages = [
            '2024-10-06T11:19:12.000Z',
            '2024-10-07T14:19:12.000Z',
            '2024-10-08T15:19:12.000Z',
            '2024-10-09T14:19:12.000Z',
            '2024-10-10T11:19:12.000Z',
            '2024-10-11T06:19:12.000Z',
            '2024-10-11T23:19:12.000Z',
        ];

        test("Determines if the list is newest to oldest", async()=>{
            let verdict = sortCheck(ages);
            expect(verdict).toBe("Posts are not sorted from newest to oldest");
        })
    });
});

describe("Scraping athing data and the ages", () => {
    let browser;
    let page;
    let ages = [];
    let listOfAges = '';
    let listofAthings = '';

    beforeAll(async() => {
        browser = await chromium.launch();
        page = await browser.newPage();
    });

    test("scrapes the data", async() => {
        const startingAge = new Date ("2024-10-24T15:19:12.000000Z");
        let startingId = 41963932;
        for (let i = 0; i < 15; i++){
            const timeStamp = new Date("2024-10-14T15:19:12.000000Z");
            timeStamp.setHours(startingAge.getHours() - (i * i));

            listOfAges += `<span class="age" title="${timeStamp.toISOString()}"></span>\n`;

            if(i > 1){
                listofAthings +=  `<tr class="athing" id="${startingId}"></tr>`;
                startingId += 1;
            };
        };

        await page.setContent(`
            <html>
            <body>
                ${listofAthings}
                ${listOfAges}
            </body>
            </html>
        `);

        let verdict = await scraper(ages, page);

        expect(verdict).toBe("There is a post without a timestamp");
    });
})