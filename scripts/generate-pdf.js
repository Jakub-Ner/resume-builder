import fs from "node:fs/promises";
import path from "node:path";
import { chromium } from "playwright";

const PROJECT_ROOT = path.resolve(process.cwd());
const PAGES_DIR = path.join(PROJECT_ROOT, "src", "pages");
const OUTPUT_DIR = path.join(PROJECT_ROOT, "out");
const BASE_URL = process.env.PDF_BASE_URL ?? "http://localhost:4321";

const getRoutes = async () => {
  const entries = await fs.readdir(PAGES_DIR, { withFileTypes: true });

  return entries
    .filter(
      (entry) =>
        entry.isFile() &&
        entry.name.endsWith(".md") &&
        entry.name !== "index.md",
    )
    .map((entry) => {
      const slug = entry.name.replace(/\.md$/, "");

      return {
        slug,
        route: `/${slug}/`,
      };
    });
};

const renderPdf = async (page, route, filePath) => {
  await page.goto(new URL(route, BASE_URL).toString(), {
    waitUntil: "networkidle",
  });
  await page.waitForLoadState("networkidle");
  await page.evaluate(async () => {
    await document.fonts.ready;
  });

  await page.emulateMedia({ media: "print" });

  await page.pdf({
    path: filePath,
    printBackground: true,
    preferCSSPageSize: true,
  });
};

const main = async () => {
  await fs.mkdir(OUTPUT_DIR, { recursive: true });

  const routes = await getRoutes();

  if (routes.length === 0) {
    console.log(
      "No markdown CV pages found in src/pages (excluding index.md).",
    );
    return;
  }

  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    for (const { slug, route } of routes) {
      const filePath = path.join(OUTPUT_DIR, `${slug}.pdf`);
      await renderPdf(page, route, filePath);
      console.log(
        `Generated ${path.relative(PROJECT_ROOT, filePath)} from ${route}`,
      );
    }
  } finally {
    await context.close();
    await browser.close();
  }
};

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
