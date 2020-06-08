const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
const fs = require('fs');

const plugins = [
  new HtmlWebpackPlugin({
    template: './src/index.html'
  }),
  new CleanWebpackPlugin({
    verbose: true,
    // root: path.resolve(__dirname, '../dist')
  })
];

const files = fs.readdirSync(path.resolve(__dirname, '../dll'));
files.forEach(file => {
  if(/.*\.dll.js/.test(file)){
    plugins.push(new AddAssetHtmlWebpackPlugin({
      filepath: path.resolve(__dirname, '../dll', file)
    }))
  }
  if(/.*\.manifest.json/.test(file)){
    plugins.push(new webpack.DllReferencePlugin({
      manifest: path.resolve(__dirname, '../dll', file)
    }))
  }
})

module.exports = {
  entry: {
    main: './src/index.js'
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [{
          loader: "babel-loader"
        }]
      },
      {
        test: /\.(jpg|png|jif)$/,
        use: {
          loader: "url-loader",
          options: {
            // placeholder 占位符
            name: "[name]_[hash].[ext]",
            outputPath: 'images/',
            limit: 2048 //2048byte 2kb
          }
        }
      },
      {
        test: /\.(eot|ttf|svg|woff)$/,
        use: {
          loader: "file-loader",
          options: {
            outputPath: 'font/'
          }
        }
      },
    ]
  },
  // plugins: [
  //   new HtmlWebpackPlugin({
  //     template: './src/index.html'
  //   }),
  //   new CleanWebpackPlugin({
  //     verbose: true,
  //     // root: path.resolve(__dirname, '../dist')
  //   }),
  //   new AddAssetHtmlWebpackPlugin({
  //     filepath: path.resolve(__dirname, '../dll/vendors.dll.js')
  //   }),
  //   new webpack.DllReferencePlugin({
  //     manifest: path.resolve(__dirname, '../dll/vendors.manifest.json')
  //   })
  // ],
  plugins: plugins,
  optimization: {
    splitChunks: {
      chunks: "all",
      minSize: 30000,
      // maxSize: 50000,对于大于50kb的库文件进行尝试再次分割
      minChunks: 1,  // 当模块被应用多少次，才被代码分割
      maxAsyncRequests: 5, //最大分割为5个js文件，超过不再分割
      maxInitialRequests: 3, // 入口文件最大3
      automaticNameDelimiter: '~', // 文件名链接符
      name: true,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          name: 'vendors'
        },
        default: {
          priority: -20,
          reuseExistingChunk: true
        }
      }
    },
    usedExports: true
  },
  performance: false
}
