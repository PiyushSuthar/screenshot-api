const express = require('express');
const app = express();
const puppeteer = require('puppeteer');

var port = process.env.PORT || 8000

app.get("/", async (request, response) => {
    var url;
    if (request.query.url.slice(0,4) === "http" ) {
        url = request.query.url
    } else {
        url = `http://${request.query.url}`
    }
    try {
        const browser = await puppeteer.launch({
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
              ],
        });
        const page = await browser.newPage();
        // await page.setViewport({
        //     width: 1200,
        //     height: 700
        //   });
        await page.goto(url); // Read url query parameter.
        const image = await page.screenshot({ fullPage: true});
        await browser.close();
        response.set('Content-Type', 'image/png');
        response.send(image);
    } catch (error) {
        console.log(error);
        response.set('Content-Type', 'application/json');
        response.json({"error":"Please Check Your Url!"})
    }
});

app.listen(port);