const express = require('express');
const app = express();
const puppeteer = require('puppeteer');

var port = process.env.PORT || 8000

app.get("/", async (request, response) => {
    try {
        const browser = await puppeteer.launch({
            args: ['--no-sandbox']
        });
        const page = await browser.newPage();
        await page.goto(request.query.url); // Read url query parameter.
        const image = await page.screenshot({ fullPage: true });
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