/* eslint-disable */
module.exports = {
  collectCoverage: true,
  projects: [
    {
      displayName: "test",
      transform: {
        "^.+\\.tsx?$": "ts-jest",
        "^.+\\.jsx?$": "<rootDir>/jest-preprocess.js"
      },
      testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.([tj]sx?)$",
      moduleNameMapper: {
        ".+\\.(css|styl|less|sass|scss)$": "identity-obj-proxy",
        ".+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
          "<rootDir>/__mocks__/file-mock.js"
      },
      moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
      testPathIgnorePatterns: ["node_modules", ".cache"],
      transformIgnorePatterns: ["node_modules/(?!(gatsby)/)"],
      globals: {
        __PATH_PREFIX__: ""
      },
      testURL: "http://localhost",
      setupFiles: ["<rootDir>/loadershim.js"],
      snapshotSerializers: ["jest-emotion"],
      collectCoverage: true,
      coverageReporters: ["json", "text"]
    },
    {
      runner: "jest-runner-eslint",
      displayName: "lint:eslint",
      testMatch: ["<rootDir>/src/**/*.tsx", "<rootDir>/src/**/*.ts"]
    },
    {
      runner: "jest-runner-prettier",
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
      runner: "jest-runner-stylelint",
      displayName: "lint:stylelint",
      testMatch: ["<rootDir>/src/**/*.tsx", "<rootDir>/src/**/*.ts"]
    }
  ]
};
