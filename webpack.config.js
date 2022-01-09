const path = require("path");

module.exports = {
  entry: "./frontend/src/index.js",
  output: {
    path: path.join(__dirname, "./frontend/static/frontend"),
    filename: "[name].js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
  optimization: {
    minimize: true,
  },
};
