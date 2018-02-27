const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path'); 
// the path(s) that should be cleaned
let pathsToClean = [
  'dist'
]

// the clean options to use
let cleanOptions = {
  //exclude:  ['shared.js'],
  verbose:  true,
  dry:      false
}

module.exports =
  {
    name: 'Front-End main side, output to ./dist',
    entry: ['./src/frontend/index.js'],
    output: {
      filename: './js-bundles/bundle.js'
    },
    module: {
        rules: [
            // the url-loader uses DataUrls.
            // the file-loader emits files.
            //Load fonts with url loader.
            {test: /\.woff$/, loader: 'url-loader?limit=65000&mimetype=application/font-woff&name=dist/fonts/[name].[ext]' },
            {test: /\.woff2$/, loader: 'url-loader?limit=65000&mimetype=application/font-woff2&name=dist/fonts/[name].[ext]' },
            {test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" },
             //Load less files
            {test: /\.less$/, loader: 'style-loader!css-loader!less-loader' }, // use ! to chain loaders
            //Load css files
            {test: /\.css$/, loader: 'style-loader!css-loader' }
    ]
    },
    plugins: [
          //Plugin for clean 'dist/' folder before compile all the bundles and files again with webpack.
        new CleanWebpackPlugin(pathsToClean, cleanOptions),
        //Copy all files that webpack does not move from /frontend folder to /dist folder.
        new CopyWebpackPlugin([
            {from: '**/*', to: '', ignore: ['*.js']}
        ], {context: 'src/frontend/'})
    ]
};