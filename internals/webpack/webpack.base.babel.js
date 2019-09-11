/**
 * COMMON WEBPACK CONFIGURATION
 */

const path = require('path');
const webpack = require('webpack');
const coffee = require('coffee-loader');
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');

const getBabelOptions = (options = {}) => ({
  cacheDirectory: true,
  plugins: (options.plugins || []).concat([
    [
      '@babel/plugin-proposal-decorators',
       {
         legacy: true
       }
    ],
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-syntax-export-default-from',
  ]),
  presets: (options.presets || []).concat([
    '@babel/preset-env',
    '@babel/preset-react',
  ]),
})

module.exports = (options) => ({
  mode: process.env.NODE_ENV || 'development',
  entry: options.entry,
  output: Object.assign({
    path: path.resolve(process.cwd(), 'build'),
    publicPath: '/',
  }, options.output), // Merge with env dependent settings
  module: {
    rules: [
      {
        test: /\.coffee$/,
        loader: [
          {
            loader: 'babel-loader',
            options: Object.assign(
              options.babelQuery || {},
              getBabelOptions(options.babelQuery)
            ),
          },
          'coffee-loader',
        ],
        exclude: [
          path.resolve(process.cwd(), 'node_modules')
        ],
      },
      {
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: [
        path.resolve(process.cwd(), 'node_modules')
      ],
      options: Object.assign(
        options.babelQuery || {},
        getBabelOptions(options.babelQuery)
      ),
    }, {
      // Do not transform vendor's CSS with CSS-modules
      // The point is that they remain in global scope.
      // Since we require these CSS files in our JS or CSS files,
      // they will be a part of our compilation either way.
      // So, no need for ExtractTextPlugin here.
      test: /\.css$/,
      include: /node_modules/,
      loaders: ['style-loader', 'css-loader'],
    }, {
      type: 'javascript/auto',
      test: /\.(json|html)$/,
      exclude: [
        path.resolve(process.cwd(), 'node_modules')
      ],
      loader: 'html-loader',
    }, {
      test: /\.(mp4|webm)$/,
      loader: 'url-loader',
      options: {
        limit: 10000,
      },
    },
    {
      test: /\.(eot|svg|ttf|woff|woff2)$/,
      loader: 'file-loader',
    }, {
      test: /\.(jpg|png|gif)$/,
      loaders: [
        'file-loader',
        {
          loader: 'image-webpack-loader',
          query: {
            progressive: true,
            optimizationLevel: 7,
            interlaced: false,
            pngquant: {
              quality: '65-90',
              speed: 4,
            },
          },
        },
      ],
    },
  ]},
  plugins: options.plugins.concat([
    new webpack.ProvidePlugin({
      // make fetch available
      fetch: 'exports-loader?self.fetch!whatwg-fetch',
    }),
    new webpack.ProvidePlugin({
      WaveSurfer: 'wavesurfer.js'
    }),

    // Always expose NODE_ENV to webpack, in order to use `process.env.NODE_ENV`
    // inside your code for any environment checks; UglifyJS will automatically
    // drop any unreachable code.
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        SLACK_WEBHOOK_URL: JSON.stringify(process.env.SLACK_WEBHOOK_URL),
      },
    }),
    new webpack.NamedModulesPlugin(),
    new MomentLocalesPlugin(),
  ]),
  resolve: {
    alias: {
      wavesurfer: require.resolve('wavesurfer.js'),
      moment$: path.resolve(process.cwd(), 'node_modules/moment/moment.js'),
    },
    modules: ['app', 'node_modules'],
    extensions: [
      '.js',
      '.jsx',
      '.react.js',
    ],
    mainFields: [
      'browser',
      'jsnext:main',
      'main',
    ],
  },
  devtool: options.devtool,
  target: 'web', // Make web variables accessible to webpack, e.g. window
  performance: options.performance || {},
  node: {
    console: true,
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  },
  optimization: options.optimization || {},
});
