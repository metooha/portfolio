#!/usr/bin/env node
import puppeteer from "puppeteer-core";

const url = process.argv[2] ?? "http://localhost:5173/case-study/6";

const browser = await puppeteer.launch({
  executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  headless: true,
});
const page = await browser.newPage();
const errors = [];
page.on("pageerror", (e) => errors.push(`PAGE: ${e.message}`));
page.on("console", (m) => {
  if (m.type() === "error") errors.push(`CONSOLE: ${m.text()}`);
});

await page.goto(url, { waitUntil: "networkidle0", timeout: 30000 });
await new Promise((r) => setTimeout(r, 3000));

const data = await page.evaluate(() => {
  const hero = document.querySelector('[data-name="Heading"]');
  const rect = hero?.getBoundingClientRect();
  const img = hero?.querySelector("img");
  return {
    text: document.body.innerText.slice(0, 400),
    heroFound: Boolean(hero),
    heroWidth: rect?.width ?? 0,
    heroHeight: rect?.height ?? 0,
    imgWidth: img?.naturalWidth ?? 0,
    imgHeight: img?.naturalHeight ?? 0,
    imgComplete: img?.complete ?? false,
    overviewFound: Boolean(document.getElementById("overview")),
    imgSrc: img?.getAttribute("src"),
    mainHtml: document.querySelector("main")?.innerHTML?.length ?? 0,
  };
});

console.log(JSON.stringify({ url, data, errors }, null, 2));
await browser.close();
