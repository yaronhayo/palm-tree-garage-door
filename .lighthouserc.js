module.exports = {
  ci: {
    collect: {
      startServerCommand: "npm run start",
      url: ["http://localhost:3000/"],
      numberOfRuns: 3,
    },
    upload: {
      target: "temporary-public-storage",
    },
    assert: {
      preset: "lighthouse:recommended",
      assertions: {
        "categories:performance": ["error", { minScore: 0.95 }],
        "categories:accessibility": ["error", { minScore: 0.95 }],
        "categories:best-practices": ["error", { minScore: 1 }],
        "categories:seo": ["error", { minScore: 1 }],
        "first-contentful-paint": ["error", { maxNumericValue: 2000 }],
        "largest-contentful-paint": ["error", { maxNumericValue: 2500 }],
        "cumulative-layout-shift": ["error", { maxNumericValue: 0.1 }],
        "total-blocking-time": ["error", { maxNumericValue: 300 }],
      },
    },
    budgets: {
      performance: [
        {
          resourceSizes: [
            {
              resourceType: "document",
              budget: 20,
            },
            {
              resourceType: "stylesheet",
              budget: 50,
            },
            {
              resourceType: "font",
              budget: 50,
            },
            {
              resourceType: "image",
              budget: 300,
            },
            {
              resourceType: "script",
              budget: 200,
            },
          ],
          resourceCounts: [
            {
              resourceType: "third-party",
              budget: 10,
            },
          ],
        },
      ],
    },
  },
}
