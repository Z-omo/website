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
const path = require('path');
const srcDir = __dirname + '/src/';
const webRoot = __dirname + '/';
const ExtractTextPlugin = require('extract-text-webpack-plugin');

//Only load this for production build, as webpack -p throws an error when processing ES6.
//const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

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
    filename: 'js/[name].js'//,
    //publicPath: './'
  },

  module: {
    rules: [
      {
        test: /\.sass$/,
        //include: [path.resolve(__dirname, 'src/sass')],
        //exclude: [path.resolve(__dirname, 'resources/images')],
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
     * config.output.path above, therefore, our actual path for
     * CSS output is: webRoot + 'css/main.css'.
     */
    new ExtractTextPlugin('css/[name].css', { allChunks: true }),
    // new UglifyJSPlugin({
    //   exclude: /\/node_modules/,
    //   uglifyOptions: { ecma: 6, mangle: true, compress: true }
    // })
  ]
};

module.exports = config;
