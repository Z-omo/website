/**
 * Webpack configuration file for colintester.com project.
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
const webpack = require('webpack');
const path = require('path');
const srcDir = __dirname + '/src/';
const webRoot = __dirname + '/';
const ExtractTextPlugin = require('extract-text-webpack-plugin');

//Only load this for production build, as webpack -p throws an error when processing ES6.
//const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

const config = {
  resolve: {
    alias: {
      jsLogger: srcDir + 'js/js-logger.js',
    }
  },

  entry: {
    main: [srcDir + 'js/bootstrap.js', srcDir + 'sass/bootstrap.sass'],
    //critical: srcDir + 'sass/critical.sass'
  },

  output: {
    path: webRoot,
    filename: 'js/[name].js'//,
    //publicPath: './'
  },

  module: {
    rules: [
      {
        test: /\.sass$/,
        include: [path.resolve(__dirname, 'src/sass')],
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
      },

      {
        test: /\.js$/,
        include: [path.resolve(__dirname, 'src/js')],
        use: [{
          loader: 'babel-loader',
          options: { presets: ['env'] }
        }]
      }
    ]
  },

  plugins: [
    /*
     * plugin operates to produce output to the destination defined in 
     * config.output.path above, therefore, our actual path for
     * CSS output is: webRoot + 'css/main.css'.
     */
    new ExtractTextPlugin('css/[name].css', { allChunks: true }),
    // new UglifyJSPlugin({
    //   exclude: /\/node_modules/,
    //   uglifyOptions: { ecma: 6, mangle: true, compress: true }
    // })

    /*
     * with webpack 3: provides scope hoisting feature, where appropriate.
     */
    new webpack.optimize.ModuleConcatenationPlugin()
  ]
};

module.exports = config;
