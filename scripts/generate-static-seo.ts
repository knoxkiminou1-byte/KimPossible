import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { getStaticSeoPaths, injectSeo } from "../server/seo";

const dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(dirname, "..");
const distDir = path.join(rootDir, "dist", "public");
const indexPath = path.join(distDir, "index.html");

function routeFileTargets(routePath: string) {
  if (routePath === "/") {
    return [indexPath];
  }

  const cleanPath = routePath.replace(/^\/+/, "");

  return [
    path.join(distDir, `${cleanPath}.html`),
    path.join(distDir, cleanPath, "index.html"),
  ];
}

async function writeRouteHtml(routePath: string, html: string) {
  const targets = routeFileTargets(routePath);

  await Promise.all(
    targets.map(async (target) => {
      await fs.mkdir(path.dirname(target), { recursive: true });
      await fs.writeFile(target, html, "utf-8");
    }),
  );
}

async function main() {
  const baseHtml = await fs.readFile(indexPath, "utf-8");

  await Promise.all(
    getStaticSeoPaths().map((routePath) => writeRouteHtml(routePath, injectSeo(baseHtml, routePath))),
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
