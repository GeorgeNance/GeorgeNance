require("isomorphic-unfetch");

const { promises: fs } = require("fs");
const path = require("path");

let Parser = require('rss-parser');
let parser = new Parser();

async function getQuote() {
  const url =
    "https://raw.githubusercontent.com/skolakoda/programming-quotes-api/master/Data/quotes.json";
  let response = await fetch(url);
  let json = await response.json();

  json = json[Math.floor(Math.random() * (json.length + 1))];

  return {
    text: json["en"],
    author: json["author"]
  };
}

async function main() {
  const readmeTemplate = (
    await fs.readFile(path.join(process.cwd(), "./README.template.md"))
  ).toString("utf-8");


  

  
  let feed = await parser.parseURL('https://georgenance.com/rss.xml');
  let blogPosts = "";

  feed.items.slice(0, 5).map(item => {
    blogPosts = blogPosts.concat("\n",`* [${item.title}](${item.link})`)
  });
    console.log(blogPosts);
  
  //Date
var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',hour:'numeric',minute:'numeric',timeZone: 'America/Phoenix'};
const date = new Date()
  const qoth =  await getQuote()
  const readme = readmeTemplate
    .replace("{qoth}", qoth.text)
    .replace("{qoth_author}", qoth.author)
    .replace("{blog_posts}", blogPosts)
    .replace("{build_date}", date.toLocaleString("en-US",options))

  await fs.writeFile("README.md", readme);
}

main();
