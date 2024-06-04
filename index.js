import cors from "cors";
import express from "express"
import RSSParser from "rss-parser";

const feedURL = "https://www.actugaming.net/feed";
const feedURL2 = "https://www.01net.com/feed/";
const feedUrl3 = "https://www.welcometothejungle.com/fr/articles.rss"
const parser = new RSSParser();

let articles = [];
let articles2 = [];
let articles3 = [];

const parse = async url => {
    const feed = await parser.parseURL(url)

    feed.items.forEach(item => {
        articles.push({ item })
    })
}

const parse2 = async url => {
    const feed = await parser.parseURL(url)

    feed.items.forEach(item => {
        articles2.push({ item })
    })
}

const parse3 = async url => {
    const feed = await parser.parseURL(url)

    feed.items.forEach(item => {
        articles3.push({ item })
    })
}

parse(feedURL);
parse2(feedURL2);
parse3(feedUrl3);

let app = express();
app.use(cors());

app.get('/', (req, res) => {
    res.send(articles)
})

app.get('/net', (req, res) => {
    res.send(articles2)
})

app.get('/welcometo', (req, res) => {
    res.send(articles3)
})

const server = app.listen("4000", () => {
    console.log("App is listening at http://localhost:4000")
})

export default server;