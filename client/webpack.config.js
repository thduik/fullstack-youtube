const path = require("path");
const HWP = require("html-webpack-plugin");
const webpack = require('webpack')


module.exports = {
  entry: path.join(__dirname, "/src/index.jsx"),
  output: {
    filename: "build.js",
    path: path.join(__dirname, "/dist"),
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        loader: "file-loader",
      }
    ],
  },
  devtool: 'eval-source-map',
  devServer: {
    port: 3000,
    open: true,
    historyApiFallback: true,
  },
  plugins: [
    new HWP({ template: path.join(__dirname, "/public/index.html") }),
    new webpack.DefinePlugin({
      'process.env': {
        CUSTOM_PATH: JSON.stringify(process.env.CUSTOM_PATH)
      }
    })
  ],
  resolve: {
    extensions: ['', '.js', '.jsx'],
  }
};
