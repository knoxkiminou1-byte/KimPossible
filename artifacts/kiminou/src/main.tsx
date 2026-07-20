import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import App from "./App";
import "./index.css";

// Static route metadata remains available to crawlers without JavaScript. Once
// the app starts, Helmet becomes the single owner of route-level head tags so
// client-side navigation cannot leave stale canonical URLs or descriptions.
document.querySelectorAll("[data-seo-static]").forEach((element) => element.remove());

createRoot(document.getElementById("root")!).render(
  <HelmetProvider>
    <App />
  </HelmetProvider>
);
