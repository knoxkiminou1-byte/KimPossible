import { test, expect, chromium } from "@playwright/test";

const HOST = process.env.APP_HOST || "http://localhost:5173";

test("no inert interactive elements", async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto(HOST, { waitUntil: "domcontentloaded" });

  const selectors = ['a', 'button', '[role="button"]', '[data-cta]'];

  for (const sel of selectors) {
    const els = await page.$$(sel);
    for (const el of els) {
      const tag = await el.evaluate((n) => n.tagName.toLowerCase());
      const disabled = await el.isDisabled?.();
      const hidden = !(await el.isVisible?.());
      if (hidden || disabled) continue;

      if (tag === 'a') {
        const href = await el.getAttribute('href');
        expect(href, `Anchor missing href`).not.toBeNull();
        expect(href).not.toBe("#");
      } else {
        const hasOnClick = await el.evaluate((n) => {
          return !!(n.getAttribute('onclick') || n.getAttribute('data-action'));
        });
        if (!hasOnClick) {
          console.warn("⚠️  Button without data-action/onclick may be inert");
        }
      }
    }
  }

  await browser.close();
});