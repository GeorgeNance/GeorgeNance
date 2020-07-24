require("isomorphic-unfetch");
const { promises: fs } = require("fs");
const path = require("path");


async function main() {
  const readmeTemplate = (
    await fs.readFile(path.join(process.cwd(), "./README.template.md"))
  ).toString("utf-8");

  const { en: qoth, author: qoth_author } = await (
    await fetch("https://programming-quotes-api.herokuapp.com/quotes/random")
  ).json();

  const readme = readmeTemplate
    .replace("{qoth}", qoth)
    .replace("{qoth_author}", qoth_author)

  await fs.writeFile("README.md", readme);
}

main();
