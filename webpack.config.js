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

 // Note: __dirname refers to the path where webpack.config.js file is located.
const srcDir = __dirname + '/src/';
const webRoot = __dirname + '/';
const ExtractTextPlugin = require('extract-text-webpack-plugin');

console.log('__dirname: ', __dirname);

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
    /*
     * plugin operates to produce output to the destination defined in 
     * config.output.path above , therefore, our actual path for
     * CSS output is: webRoot + 'css/main.css'.
     */
    new ExtractTextPlugin('css/[name].css') 
  ]
};

module.exports = config;
