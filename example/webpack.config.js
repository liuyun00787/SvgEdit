const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = function webpackConfig(webpackConfig, env) {
  webpackConfig.plugins.push(
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './public/index.ejs',
      hash: true,
      production: true,
    }),
  );
  return webpackConfig;
};
