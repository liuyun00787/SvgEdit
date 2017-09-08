const path = require('path')
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
  webpackConfig.module.rules.push({
    test: /\.css$/,
    exclude: [path.resolve(__dirname, './src')],
    use: ['style-loader', 'css-loader', 'postcss-loader'],
  });
  return webpackConfig;
};
