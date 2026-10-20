import { test, expect } from "@playwright/test";

const ROUTES = ["/", "/books", "/books/hopeless-romantic", "/books/boys-raised-in-silence", "/speaking", "/podcast", "/sports", "/press", "/contact"];

// Every route shows a full-screen "First Edition" welcome overlay on a
// visitor's first-ever page view (see FirstEditionOverlay.tsx). Mark it
// as already-seen so tests exercise the actual page, same as a returning
// visitor would see, instead of racing the overlay's mount timing.
test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem("kiminou-first-edition-seen", "1");
    sessionStorage.setItem("kiminou-green-room-entered", "1");
  });
});

for (const route of ROUTES) {
  test(`${route} loads without console errors and renders an H1`, async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (err) => errors.push(err.message));
    page.on("console", (msg) => {
      if (msg.type() === "error") errors.push(msg.text());
    });

    const response = await page.goto(route);
    expect(response?.ok()).toBeTruthy();
    await expect(page.locator("h1").first()).toBeVisible({ timeout: 10_000 });

    expect(errors, `console/page errors on ${route}:\n${errors.join("\n")}`).toEqual([]);
  });
}

test("skip link points at a real, focusable landmark", async ({ page }) => {
  await page.goto("/");
  const skipLink = page.getByRole("link", { name: /skip to content/i });
  await expect(skipLink).toHaveAttribute("href", "#main-content");
  await expect(page.locator("#main-content")).toHaveCount(1);
});

test("primary nav links all resolve to a real page (no 404s)", async ({ page, request }) => {
  await page.goto("/");
  const nav = page.getByRole("navigation", { name: /main navigation/i });
  await expect(nav).toBeVisible({ timeout: 10_000 });
  const hrefs = await nav.locator("a[href^='/']").evaluateAll((links) =>
    links.map((l) => (l as HTMLAnchorElement).getAttribute("href")).filter(Boolean),
  );

  expect(hrefs.length).toBeGreaterThan(0);

  for (const href of hrefs as string[]) {
    const response = await request.get(href!);
    expect(response.ok(), `${href} returned ${response.status()}`).toBeTruthy();
  }
});

test("footer links all resolve (internal routes only)", async ({ page, request }) => {
  await page.goto("/");
  const footer = page.locator("footer");
  await expect(footer).toBeVisible({ timeout: 10_000 });
  const hrefs = await footer.locator("a[href^='/']").evaluateAll((links) =>
    links.map((l) => (l as HTMLAnchorElement).getAttribute("href")).filter(Boolean),
  );

  const unique = [...new Set(hrefs as string[])];
  expect(unique.length).toBeGreaterThan(0);

  for (const href of unique) {
    const response = await request.get(href);
    expect(response.ok(), `${href} returned ${response.status()}`).toBeTruthy();
  }
});

test("/podcast lists episodes from the build-time feed with playable audio", async ({ page }) => {
  await page.goto("/podcast");
  await expect(page.getByRole("heading", { level: 1, name: "KimYaps" })).toBeVisible({ timeout: 10_000 });
  const episodes = page.locator("ol > li");
  await expect(episodes.first()).toBeVisible({ timeout: 10_000 });
  expect(await episodes.count()).toBeGreaterThan(5);
  await expect(episodes.first().locator("audio source")).toHaveAttribute("src", /^https:\/\//);
});

test("every book cover image on /books resolves", async ({ page, request }) => {
  const response = await request.get("/books.json");
  const books = (await response.json()) as { id: string; cover: string }[];
  for (const book of books) {
    const cover = await request.get(book.cover);
    expect(cover.ok(), `${book.id} cover ${book.cover} returned ${cover.status()}`).toBeTruthy();
  }
});
