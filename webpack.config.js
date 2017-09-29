/**
 * Webpack configuration file for website.com project.
 *
 * @package     Website
 * @author      Colin Tester <office@z-omo.com>
 * 
 * This file forms part of the installed @package and should not be copied 
 * and/or distributed without the written consent from the file's author.
 *
 * @copyright: Please see: <https://en.wikipedia.org/wiki/Berne_Convention>
 *
 * This file and its @package are under version control.
 */

const path = require('path');
const nodeMod = path.join(__dirname, 'node_modules/');
const srcDir = __dirname + '/src/';
const webRoot = __dirname + '/';
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const config = {
  resolve: {
    alias: {
      jsLogger: srcDir + 'js/js-logger.js',
    }
  },

  entry: {
    main: srcDir + 'js/bootstrap.js'
  },

  output: {
    path: webRoot,
    filename: 'js/[name].js'
  },

  module: {
    rules: [
      {
        test: /\.sass$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
      }
    ]
  },

  plugins: [
    new ExtractTextPlugin('css/[name].css')
  ]
};

module.exports = config;
