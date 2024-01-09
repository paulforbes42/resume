const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ESLintWebpackPlugin = require('eslint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: './src/index.jsx',
  devtool: 'source-map',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(jsx)$/,
        resolve: {
          extensions: ['.jsx'],
        },
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
          'webpack-import-glob-loader',
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    compress: true,
    port: 3002,
    historyApiFallback: true,
    proxy: {
      '/api': 'http://localhost:3000',
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: 'index.html',
      basename: '/',
    }),
    new MiniCssExtractPlugin({
      filename: 'style.css',
    }),
    new ESLintWebpackPlugin({
      extensions: ['.js', '.jsx'],
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: './public/profile1.jpeg', to: './' },
        { from: './public/profile2.jpeg', to: './' },
      ],
    }),
  ],
};
