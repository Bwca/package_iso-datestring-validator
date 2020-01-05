const path = require('path');

module.exports = {
  entry: './src/iso-datestring-validator.ts',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  output: {
    filename: 'iso-datestring-validator.js',
    path: path.resolve(__dirname, 'dist'),
  },
};
