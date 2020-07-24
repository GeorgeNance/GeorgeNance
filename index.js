require("isomorphic-unfetch");

const { promises: fs } = require("fs");
const path = require("path");

let Parser = require('rss-parser');
let parser = new Parser();

async function main() {
  const readmeTemplate = (
    await fs.readFile(path.join(process.cwd(), "./README.template.md"))
  ).toString("utf-8");

  const { en: qoth, author: qoth_author } = await (
    await fetch("https://programming-quotes-api.herokuapp.com/quotes/random")
  ).json();
  

  
  let feed = await parser.parseURL('https://georgenance.com/rss.xml');
  let blogPosts = "";

  feed.items.slice(0, 5).map(item => {
    blogPosts = blogPosts.concat("\n",`* [${item.title}](${item.link})`)
  });
    console.log(blogPosts);
  
  //Date
var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',hour:'numeric',minute:'numeric',timeZone: 'America/Phoenix'};
const date = new Date()

  const readme = readmeTemplate
    .replace("{qoth}", qoth)
    .replace("{qoth_author}", qoth_author)
    .replace("{blog_posts}", blogPosts)
    .replace("{build_date}", date.toLocaleString("en-US",options))

  await fs.writeFile("README.md", readme);
}

main();
