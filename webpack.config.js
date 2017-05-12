// webpack.config.js for JSX and CSS
const path = require('path')

module.exports = {
  entry: {
    app: './src/app.js'
  },
  module: {
    loaders: [
      {test: /\.js$/, include: path.join(__dirname, '/src'), loader: 'babel-loader'},
      {test: /\.json$/, include: path.join(__dirname, '/src'), loader: 'json-loader'},
      {test: /\.css$/, loader: 'style!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]'}
    ]
  },
  output: {
    filename: '[name].bundle.js',
    path: path.join(__dirname, '/dist')
  },
  node: {
    console: true,
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  }
}
