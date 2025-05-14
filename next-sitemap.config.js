/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || "https://garagedoorspringsrepairfl.com",
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/*"],
      },
    ],
    additionalSitemaps: [`${process.env.SITE_URL || "https://garagedoorspringsrepairfl.com"}/sitemap.xml`],
  },
  changefreq: "weekly",
  priority: 0.7,
  exclude: ["/thank-you"],
}
