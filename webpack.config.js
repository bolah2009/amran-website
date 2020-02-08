const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FixStyleOnlyEntriesPlugin = require('webpack-fix-style-only-entries');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const fs = require('fs');

const include = filePath => {
  return fs.readFileSync(filePath).toString();
};

const pages = ['index', 'who-we-are', 'what-we-do'];

const pagesConfig = () =>
  pages.map(
    entryName =>
      new HtmlWebpackPlugin({
        filename: `${entryName}.html`,
        template: `./src/pages/template.ejs`,
        templateParameters: {
          body: 'This is the body',
          partial: include(`./src/pages/${entryName}.ejs`),
          include,
        },
      }),
  );

module.exports = {
  mode: 'development',
  entry: {
    main: './src/index.js',
    styles: './src/css/styles.css',
    display: './src/css/display.css',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
  },
  devServer: {
    contentBase: 'public',
    hot: true,
    watchOptions: {
      ignored: /node_modules/,
    },
  },
  module: {
    rules: [
      { test: /\.css$/, use: [MiniCssExtractPlugin.loader, 'css-loader'] },
    ],
  },
  plugins: [
    ...pagesConfig(),
    new MiniCssExtractPlugin({ filename: '[name].css' }),
    new FixStyleOnlyEntriesPlugin(),
    new OptimizeCSSAssetsPlugin({}),
    new WorkboxPlugin.GenerateSW({
      clientsClaim: true,
      skipWaiting: true,
    }),

    new CopyPlugin([{ from: './src/assets', to: '.' }]),
  ],
  watch: true,
};
