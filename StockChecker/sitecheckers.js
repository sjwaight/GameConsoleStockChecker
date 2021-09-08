const { chromium } = require("playwright-chromium");
const { TimeoutError } = require("playwright-chromium/lib/errors");

class LookupResponse {
    constructor(consoleAvailable, pageLink) {
        this.consoleAvailable = consoleAvailable;
        this.pageLink = pageLink;
    }
}

module.exports = {

    CheckJayBee: async function(context) {

        var hasConsole = false;
        const url = 'https://www.jbhifi.com.au/pages/xbox-series-x';
        const browser =  await chromium.launch();
        const page = await browser.newPage();
        await page.goto(url);

        // find the first H4 element within this hierarchy. It should contain the product title that has "Xbox Series X" at the start
        const title = await page.innerText('div > div.ais-hit--details.product-tile__details > h4');

        if(title.startsWith("Xbox Series X"))
        {
            hasConsole = true;
            context.log("JayBee: XBox Series X in stock! :)");
        }
        else
        {
            context.log("JayBee: XBox X still out of stock. :(");
        }

        await browser.close();

        return new LookupResponse(consoleAvailable = hasConsole, pageLink = url);
    },

    CheckBigDoubleU: async function(context) {

        var hasConsole = false;
        const url = 'https://www.bigw.com.au/product/xbox-series-x-1tb-console/p/124385/';
        const browser =  await chromium.launch();
        const page = await browser.newPage();
        await page.goto(url);

        try
        {
            // try and find the "Add to cart" button on the page which is only present if you can buy the console.
            const elementValue = await page.innerText('#__next > div > div.StandardPage.ProductPage > main > div > div.ProductSummary > div.product-actions > div.ProductCartAndWishlist > div:nth-child(1) > button.Button.variant-primary.size-normal');
            hasConsole = true;
            context.log("BigDoubleU: XBox Series X in stock! :)");
        } 
        catch (e)
        {
            // if the element doesn't exist you will get a timeout
            if(e instanceof TimeoutError)
            {
                context.log("BigDoubleU: HTML Element doesn't exist, therefore, no stock available!");
            }
        }

        await browser.close();

        return new LookupResponse(consoleAvailable = hasConsole, pageLink = url);
    },

    CheckMSAU: async function(context) {

        var hasConsole = false;
        const url = 'https://www.microsoft.com/en-au/d/xbox-series-x/8wj714n3rbtl?activetab=pivot%3aoverviewtab';
        const browser =  await chromium.launch();
        const page = await browser.newPage();
        await page.goto(url);

        try
        {
            // find the element and retrieve the attribute that tells the browser if it can be clicked
            const elementValue = await page.getAttribute("#buttons_ConfigureDeviceButton", "aria-disabled");

            if(elementValue != "true")
            {
                hasConsole = true;
                context.log("MSAU: XBox Series X in stock! :)");
            }
            else
            {
                context.log("MSAU: XBox X still out of stock. :(");
            }
        } 
        catch (e)
        {
            if(e instanceof TimeoutError)
            {
                context.log("Took too long to find the element!");
            }
        }

        await browser.close();

        return new LookupResponse(consoleAvailable = hasConsole, pageLink = url);
    }
};