const debug    = process.env.NODE_ENV !== "production";
const webpack  = require('webpack');
const path     = require('path');

const SRC_DIR  = path.resolve(__dirname, './src/')
const DIST_DIR = path.resolve(__dirname, '.')

module.exports = {
  devtool: debug ? "source-map" : null,
  entry:  SRC_DIR + "/app.jsx",
  resolveLoader: {
    modules: ['node_modules', __dirname + '/client/node_modules'],
    moduleExtensions: ['-loader']
  },
  module: {
    noParse: [
      /aws\-sdk/,
    ],
    loaders: [
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'stage-0']
        }
      },
      {
        test: /\.css$/,
        loader: 'style!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]'
      },
      {
        test: /\.scss$/,
        loaders: ['style', 'css?sourceMap', 'sass?sourceMap']
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
            'file?hash=sha512&digest=hex&name=[hash].[ext]',
            'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
        ]
      }
    ]
  },
  output: {
    path: __dirname + '/public/assets',
    filename: 'bundle.js'
  },
  plugins: debug ? [] : [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin(),
  ],
};
