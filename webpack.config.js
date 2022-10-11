const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './src/main.ts',
  devtool: 'inline-source-map',
  plugins: [
    new webpack.ProvidePlugin({
      PIXI: 'pixi.js'
    })
  ],
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      }
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  }
};