const debug    = process.env.NODE_ENV !== "production";
const webpack  = require('webpack');
const path     = require('path');

const SRC_DIR  = path.resolve(__dirname, './src/')
const DIST_DIR = path.resolve(__dirname, '.')

module.exports = {
  context: __dirname,
  devtool: debug ? "inline-source-map" : null,
  cache: true,
  entry:  SRC_DIR + "/app.jsx",
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /(node_modules|bower_components)/,
      loader: 'babel-loader',
      query: {
        presets: ['react', 'es2015', 'stage-0']
      }
    }]
  },
  output: {
    path: DIST_DIR,
    filename: "/app.min.js"
  },
  plugins: debug ? [] : [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin(),
  ],
};
