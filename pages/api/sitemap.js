export default async function handler(req, res) {
  const baseUrl = "https://newspulse.co.in";

  const staticPages = [
    "",
    "news",
    "editorial",
    "about",
    "contact"
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${staticPages
      .map(
        (page) => `
      <url>
        <loc>${baseUrl}/${page}</loc>
        <changefreq>daily</changefreq>
        <priority>1.0</priority>
      </url>
    `
      )
      .join("")}
  </urlset>`;

  res.setHeader("Content-Type", "text/xml");
  res.write(sitemap);
  res.end();
}
