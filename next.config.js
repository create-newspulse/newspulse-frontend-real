// next.config.js

module.exports = {
  reactStrictMode: true,

  images: {
    domains: [
      'cdn.newsapi.org',
      'images.unsplash.com',
      'media.licdn.com',
      'static.toiimg.com',
      'gnews.io',
      'cdn.gulte.com',
    ],
  },

  env: {
    NEWSAPI_KEY: process.env.NEWSAPI_KEY,
    NEWSDATA_API_KEY: process.env.NEWSDATA_API_KEY,
    THENEWSAPI_TOKEN: process.env.THENEWSAPI_TOKEN,
    MEDIASTACK_API_KEY: process.env.MEDIASTACK_API_KEY,
    GNEWS_API_KEY: process.env.GNEWS_API_KEY,
  },

  headers: async () => [
    {
      source: "/(.*)",
      headers: [
        {
          key: "X-Frame-Options",
          value: "DENY",
        },
        {
          key: "X-Content-Type-Options",
          value: "nosniff",
        },
        {
          key: "Referrer-Policy",
          value: "strict-origin-when-cross-origin",
        },
      ],
    },
  ],
};
