const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
   entry: {
       main: path.join(__dirname, 'src', 'main.js')
   },
   output: {
       path: path.join(__dirname, 'dist'),
       filename: '[name].js'
   },

   module: {
       rules: [
           {
               test: /\.js$/,
               exclude: /node_modules/,
               use: {
                   loader: 'babel-loader',
                   options: {
                       presets: ['@babel/preset-env']
                   }
               }
           },
           {
               test: /\.html$/,
               use: {
                   loader: 'html-loader',
                   options: { minimize: true }
               }
           },
           {
               test: /\.(woff|woff2|eot|ttf|otf)$/,
               use: ['file-loader']
           }
       ]
   },
   plugins: [
       new HtmlWebpackPlugin({
           template: './src/index.html'
       })
   ]
};