const { MAX_ARTICLES } = require("./config");

async function scraper(ages, page){
    while( ages.length < MAX_ARTICLES ){
        let timestamps = page.locator('span.age');
        let posts = page.locator('.athing');

        // gets the count of timestamps and post rows in the curr page
        const timestampCount = await timestamps.count();
        const postCount = await posts.count();

        // error handling for when there is a post with no corresponding timestamp
        if (timestampCount !== postCount){
            return ("There is a post without a timestamp");
        };

        for (let item = 0; item < timestampCount; item++){
            const timestampTitleValue = await timestamps.nth(item).getAttribute('title');
            ages.push(timestampTitleValue);

            if (ages.length >= 100){
                break;
            };
        };

        const moreButton = page.getByRole('link', { name: 'More', exact: true });
        // if there is no more button and we haven't gotten all 100 posts we will still check they follow the guidelines
        if(await moreButton.count() > 0){
            await moreButton.click();
        } else{
            break;
        }
    }
};

module.exports = scraper;