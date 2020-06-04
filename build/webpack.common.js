const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

module.exports = {
    entry: {
        main: './src/index.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
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
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new CleanWebpackPlugin({
            verbose: true,
            // root: path.resolve(__dirname, '../dist')
        })
    ],
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
