const path = require('path');
 
module.exports = {
  entry: {
    index:'./index.js'
  },
  output: {
    filename: 'join-array.min.js',
    path: path.resolve(__dirname, 'dist'),
    library:'joinArray',
    libraryTarget: 'umd',
    globalObject: 'this'
  },
  module: {
    rules: [
      {
        test: /\.js$/i,
        exclude:/(node_modules)/,
        loader:'babel-loader',
        options:{
          presets:['env']
        }
      }
    ]
  }
};