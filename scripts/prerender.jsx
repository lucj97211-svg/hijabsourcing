/**
 * Build-time prerender.
 *
 * The site is a single-page React app, so the shipped index.html used to
 * contain an empty <div id="root">. Google can defer-render JS, but the AI
 * crawlers that matter for GEO (GPTBot, ClaudeBot, PerplexityBot, ...) largely
 * do not execute JavaScript — they saw 71 characters of text.
 *
 * This renders <App /> to static markup after `vite build` and injects it into
 * the built index.html, so the served HTML carries the full copy. The client
 * then hydrates the same tree, leaving runtime behaviour unchanged.
 */

import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

import React from "react";
import { renderToString } from "react-dom/server";

import App from "../src/App.jsx";

/* Resolved from the project root: this module is bundled into
   node_modules/.prerender/, so a path relative to import.meta.url would
   point at the wrong place. npm scripts always run from the package root. */
const indexPath = resolve(process.cwd(), "dist/index.html");

const html = readFileSync(indexPath, "utf8");
const marker = '<div id="root"></div>';

if (!html.includes(marker)) {
  console.error("prerender: could not find empty #root in dist/index.html");
  process.exit(1);
}

const markup = renderToString(React.createElement(App));
const out = html.replace(marker, `<div id="root">${markup}</div>`);

writeFileSync(indexPath, out, "utf8");

const textLength = markup
  .replace(/<script[\s\S]*?<\/script>/g, "")
  .replace(/<[^>]+>/g, " ")
  .replace(/\s+/g, " ")
  .trim().length;

console.log(
  `prerender: injected ${markup.length} bytes of markup ` +
    `(~${textLength} chars of crawlable text)`
);
