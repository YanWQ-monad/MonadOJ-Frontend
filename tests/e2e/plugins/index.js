// https://docs.cypress.io/guides/guides/plugins-guide.html
const webpack = require('@cypress/webpack-preprocessor')

module.exports = (on, config) => {
  on('file:preprocessor', webpack({
    // This line cases test:e2e unable to run
    // webpackOptions: require('@vue/cli-service/webpack.config'),
    watchOptions: {}
  }))

  return Object.assign({}, config, {
    fixturesFolder: 'tests/e2e/fixtures',
    integrationFolder: 'tests/e2e/specs',
    screenshotsFolder: 'tests/e2e/screenshots',
    videosFolder: 'tests/e2e/videos',
    supportFile: 'tests/e2e/support/index.js'
  })
}