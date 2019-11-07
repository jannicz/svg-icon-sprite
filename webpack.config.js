const webpack = require('webpack');
const path = require('path');

module.exports = [{
  name: 'default',
  mode: 'development',
  entry: './src/svg-icon.webcomponent.ts',
  devtool: 'inline-source-map',
  output: {
    path: path.resolve(__dirname),
    filename: 'dist/svg-icon-sprite.js',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ],
  }
}, {
  name: 'prod',
  mode: 'production',
  entry: './src/svg-icon.webcomponent.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'svg-icon-sprite.js'
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })
  ]
}];
