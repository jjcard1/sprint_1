const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin= require('mini-css-extract-plugin')


module.exports = {
   entry: './sprint_1/ToDoList/frontend/app.js',
   mode: 'development',
   output: {
      path: path.resolve(__dirname, './dist'),
      filename: 'bundle.js'
   },
   module: {
      rules: [
         {
            test: /\.css$/,
            use: [MiniCssExtractPlugin.loader, 'css-loader']
         }
      ]
   },
   plugins:[
      new HtmlWebpackPlugin({
         template: './sprint_1/ToDoList/frontend/src/index.html',
         minify: {
            collapseWhitespace: true
         }
      }),
      new MiniCssExtractPlugin({
         filename: 'main.css'
      })
   ]
}