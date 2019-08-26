module.exports = {
  collectCoverage: true,
  coverageReporters: ["json", "text"],
  projects: [
    {
      displayName: "test",
      preset: "jest-preset-gatsby/typescript",
      snapshotSerializers: [
        "jest-emotion",
        "jest-serializer-react-helmet",
        "jest-serializer-json-ld-script"
      ],
      collectCoverage: true,
      coverageReporters: ["json", "text"],
      coveragePathIgnorePatterns: ["/node_modules/", "<rootDir>/.jest/"]
    },
    {
      runner: "eslint",
      displayName: "lint:eslint",
      testMatch: [
        "<rootDir>/**/*.jsx",
        "<rootDir>/**/*.js",
        "<rootDir>/**/*.tsx",
        "<rootDir>/**/*.ts"
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
        "/package.json"
      ]
    },
    {
      preset: "jest-runner-prettier",
      displayName: "lint:prettier",
      testPathIgnorePatterns: [
        "/.cache/",
        "/.forestry/", // Forestry is handling these programatically, not bother Prettier with it
        "/coverage/",
        "/content/", // Because the markdown files are likely to be written in CMS don't worry about this.
        "/node_modules/",
        "/public/",
        "/reports/",
        "/static/",
        "/package-lock.json",
        "/package.json"
      ]
    },
    {
      runner: "stylelint",
      displayName: "lint:stylelint",
      testMatch: ["<rootDir>/src/**/*.tsx", "<rootDir>/src/**/*.ts"]
    }
  ]
};
