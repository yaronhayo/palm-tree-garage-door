/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || "https://palmtreegaragedoor.com",
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
      },
      {
        userAgent: "*",
        disallow: ["/admin/", "/thank-you/"],
      },
    ],
  },
  exclude: ["/admin/*", "/thank-you"],
}
