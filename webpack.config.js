const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: './public/index.js',
  mode: 'development',
  module: {
    rules: [
      { test: /\.svg$/, use: 'svg-inline-loader' },
      { test: /\.scss$/, use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'] },
      { test: /\.(js)$/, use: 'babel-loader' },
      { test: /\.hbs$/, use: 'handlebars-loader' },
    ],
  },
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, './public/components/'),
      '@modules': path.resolve(__dirname, './public/modules/'),
      '@pages': path.resolve(__dirname, './public/pages/'),
    },
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve('./public/index.html'),
      filename: 'index.html',
    }),
    new MiniCssExtractPlugin({
      filename: 'style.css',
    }),
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index_bundle.js',
  },
  devServer: {
    hot: true,
    port: 3000,
    historyApiFallback: true,
    compress: false,
  },
};
