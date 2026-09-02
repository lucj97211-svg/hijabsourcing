/**
 * Build-time prerender — multi-route.
 *
 * For each route, renders <App /> with a StaticRouter pointing at that path,
 * then writes a corresponding HTML file into dist/. Vercel's cleanUrls:true
 * serves dist/process/index.html at /process automatically.
 *
 * Why static HTML matters: AI crawlers (GPTBot, ClaudeBot, PerplexityBot…)
 * largely skip JavaScript execution. Pre-rendered pages give every route its
 * full text content at request time.
 */

import { readFileSync, mkdirSync, writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";

import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";

import App from "../src/App.jsx";
import { BLOG_POSTS } from "../src/data/site.js";

const distDir = resolve(process.cwd(), "dist");
const templateHtml = readFileSync(resolve(distDir, "index.html"), "utf8");
const rootMarker = '<div id="root"></div>';

if (!templateHtml.includes(rootMarker)) {
  console.error("prerender: could not find empty #root in dist/index.html");
  process.exit(1);
}

/* Build the full list of routes to render */
const routes = [
  "/",
  "/customization",
  "/process",
  "/about",
  "/contact",
  "/blog",
  ...BLOG_POSTS.map((p) => `/blog/${p.slug}`),
];

let totalBytes = 0;
let totalChars = 0;

for (const route of routes) {
  const markup = renderToString(
    React.createElement(
      StaticRouter,
      { location: route },
      React.createElement(App)
    )
  );

  const out = templateHtml.replace(rootMarker, `<div id="root">${markup}</div>`);

  /* Determine output path:
     /           -> dist/index.html  (already exists, overwrite)
     /process    -> dist/process/index.html
     /blog/slug  -> dist/blog/slug/index.html  */
  let filePath;
  if (route === "/") {
    filePath = resolve(distDir, "index.html");
  } else {
    filePath = resolve(distDir, route.slice(1), "index.html");
    mkdirSync(dirname(filePath), { recursive: true });
  }

  writeFileSync(filePath, out, "utf8");

  const textLen = markup
    .replace(/<script[\s\S]*?<\/script>/g, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim().length;

  totalBytes += markup.length;
  totalChars += textLen;
  console.log(`prerender: ${route.padEnd(30)} -> ${markup.length} bytes (~${textLen} text chars)`);
}

console.log(`\nprerender: ${routes.length} routes — ${totalBytes} bytes total (~${totalChars} crawlable chars)`);
