import React from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./styles/tokens.css";
import "./styles/base.css";
import "./styles/site.css";
import "./styles/studio.css";
import "./styles/content.css";
import "./styles/pages.css";

const container = document.getElementById("root");
const tree = (
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

/* The production build ships prerendered markup inside #root so crawlers see
   the full copy; hydrate it instead of throwing it away. In dev the container
   is empty, so fall back to a normal client render. */
if (container.hasChildNodes()) {
  hydrateRoot(container, tree);
} else {
  createRoot(container).render(tree);
}
