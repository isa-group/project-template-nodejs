const path = require("path");
const webpack = require("webpack");

module.exports = {
  mode: "development", //Development or production mode.
  name: "Front-End main side, output to ./src/frontend/js-bundles",
  entry: {
    main: "./src/frontend/index.js"
  },
  output: {
    path: __dirname + "/src/frontend/js-bundles/",
    filename: "[name]-bundle.js"
  },
  resolve: {
    //TODO: Documentation
    alias: {
      jquery: "jquery/src/jquery",
      $: "jquery/src/jquery"
    }
  },
  module: {
    rules: [
      // the url-loader uses DataUrls.
      // the file-loader emits files.
      //Load fonts with url loader.
      {
        test: /\.woff$/,
        loader:
          "url-loader?limit=65000&mimetype=application/font-woff&name=fonts/[name].[ext]"
      },
      {
        test: /\.woff2$/,
        loader:
          "url-loader?limit=65000&mimetype=application/font-woff2&name=fonts/[name].[ext]"
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "file-loader"
      },
      //Load less files
      { test: /\.less$/, loader: "style-loader!css-loader!less-loader" }, // use ! to chain loaders
      //Load css files
      { test: /\.css$/, loader: "style-loader!css-loader" },
      //Load html. (Required for some front-end modules)
      { test: /\.html$/, loader: "html-loader" }
    ]
  },
  //This makes the webbrowser debug possible mapping simulated source code files to generated bundle js file.
  //For more options (related to speed/correlation to original source code file) you can visit https://webpack.js.org/configuration/devtool/
  devtool: "cheap-module-eval-source-map",
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      }
    })
  ]
};
