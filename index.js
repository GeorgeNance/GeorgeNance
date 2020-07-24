require("isomorphic-unfetch");

const { promises: fs } = require("fs");
const path = require("path");

let parser = require('rss-parser');

async function main() {
  const readmeTemplate = (
    await fs.readFile(path.join(process.cwd(), "./README.template.md"))
  ).toString("utf-8");

  const { en: qoth, author: qoth_author } = await (
    await fetch("https://programming-quotes-api.herokuapp.com/quotes/random")
  ).json();
  
  const feed = await (await parser.parseURL('https://georgenance.com/rss.xml'));
  
  let blogPosts = ""
  
  feed.items.slice(0, 5)(item => {
    blogPosts+=`({item.title})[item.link]`
  });

  const readme = readmeTemplate
    .replace("{qoth}", qoth)
    .replace("{qoth_author}", qoth_author)
    .replace("{blog_posts}", blogPosts)

  await fs.writeFile("README.md", readme);
}

main();
