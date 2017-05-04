// webpack.config.js for JSX and CSS
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
  template: path.join(__dirname, '/src/index.html'),
  filename: 'index.html',
  inject: 'body'
})

module.exports = {
  entry: [
    './src/app.js'
  ],
  module: {
    loaders: [
      {test: /\.js$/, include: path.join(__dirname, '/src'), loader: 'babel-loader'},
      {test: /\.json$/, include: path.join(__dirname, '/src'), loader: 'json-loader'},
      {test: /\.css$/, loader: 'style!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]'}
    ]
  },
  output: {
    filename: 'app_bundle.js',
    path: __dirname + '/dist'
  },
  plugins: [HTMLWebpackPluginConfig],
  node: {
    console: true,
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  }
}
