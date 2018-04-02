module.exports = {
  extends: "standard",
  overrides: [
    {
      files: ["**/*.js"],
      excludedFiles: "webpack.config.js"
    }
  ],
  env: {
    node: true,
    mocha: true
  }
};
