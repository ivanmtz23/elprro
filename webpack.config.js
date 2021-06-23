const path = require('path');
const nodeExternals = require('webpack-node-externals');
const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    mode: `${process.env.NODE_ENV || 'production'}`,
    devtool: 'source-map',
    context: path.resolve(__dirname, './src'),
    entry: './index.js',
    target: "node",
    externals: [nodeExternals()],   
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader' 
        }
      ]
    },
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
      },    
  };