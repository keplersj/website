/* eslint-disable */
module.exports = {
  collectCoverage: true,
  coverageReporters: ["json", "text"],
  projects: [
    {
      displayName: "test",
      preset: "jest-preset-gatsby/typescript",
      snapshotSerializers: [
        "jest-emotion",
        "<rootDir>/.jest/react-helmet-serializer.tsx",
        "<rootDir>/.jest/ld-json-serializer.tsx"
      ],
      collectCoverage: true,
      coverageReporters: ["json", "text"],
      coveragePathIgnorePatterns: ["/node_modules/", "<rootDir>/.jest/"]
    },
    {
      runner: "eslint",
      displayName: "lint:eslint",
      testMatch: ["<rootDir>/src/**/*.tsx", "<rootDir>/src/**/*.ts"]
    },
    {
      runner: "prettier",
      displayName: "lint:prettier",
      moduleFileExtensions: [
        "js",
        "jsx",
        "json",
        "ts",
        "tsx",
        "css",
        "less",
        "scss",
        "graphql",
        "md",
        "markdown"
      ],
      testMatch: [
        "**/*.js",
        "**/*.jsx",
        "**/*.json",
        "**/*.ts",
        "**/*.tsx",
        "**/*.css",
        "**/*.less",
        "**/*.scss",
        "**/*.graphql",
        "**/*.md",
        "**/*.markdown"
      ],
      testPathIgnorePatterns: [
        "/.cache/",
        "/coverage/",
        "/content/", // Because the markdown files are likely to be written in CMS don't worry about this.
        "/node_modules/",
        "/public/",
        "/reports/",
        "/static/",
        "/package-lock.json",
        "package.json",
        "/schema.json"
      ]
    },
    {
      runner: "stylelint",
      displayName: "lint:stylelint",
      testMatch: ["<rootDir>/src/**/*.tsx", "<rootDir>/src/**/*.ts"]
    }
  ]
};
