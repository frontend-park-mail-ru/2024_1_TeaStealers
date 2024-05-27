const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = {
  entry: './public/index.js',
  mode: 'development',
  module: {
    rules: [
      { test: /\.svg$/, use: 'svg-inline-loader' },
      { test: /\.scss$/, use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'] },
      { test: /\.(js|jsx|ts|tsx)$/, exclude: /node_modules/, use: { loader: 'babel-loader', options: { presets: ['@babel/preset-env', '@babel/preset-react'] } } },
      { test: /\.hbs$/, use: 'handlebars-loader' },
    ],
  },
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, './public/components/'),
      '@pages': path.resolve(__dirname, './public/pages/'),
      '@models': path.resolve(__dirname, './public/models/'),
      '@views': path.resolve(__dirname, './public/views/'),
      '@controllers': path.resolve(__dirname, './public/controllers/'),
      '@modules': path.resolve(__dirname, './public/modules/'),
      '@': path.resolve(__dirname, './public/'),
    },
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        test: /\.m?js$/,
        exclude: /(node_modules|dist)/,
        minify: TerserPlugin.uglifyJsMinify,
        terserOptions: {
          compress: true,
          mangle: true,
        },
      }),
      new CssMinimizerPlugin({
        minify: CssMinimizerPlugin.esbuildMinify,
      }),
    ],
    minimize: true,
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
    publicPath: '/',
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
