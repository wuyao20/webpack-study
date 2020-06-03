const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack')

module.exports = {
    mode: 'development',
    devtool: 'source-map',
    entry: {
        main: './src/index.js'
    },
    devServer: {
        contentBase: './dist',
        open: true,
        hot: true,
        hotOnly: true
    },
    module: {
        rules: [
            {
                test: /\.(jpg|png|jif)$/,
                use: {
                    loader: "url-loader",
                    options: {
                        // placeholder 占位符
                        name: "[name].[ext]",
                        outputPath: 'images/',
                        limit: 2048 //2048byte 2kb
                    }
                }
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    {
                        loader: "css-loader",
                        options: {
                            importLoaders: 2,
                           // modules: true
                        }
                    },
                    'sass-loader',
                    'postcss-loader'
                ]
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'postcss-loader'
                ]
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
    output: {
        // publicPath: "/",
        filename: "[name].js",
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new CleanWebpackPlugin({
            verbose: true
        }),
        new webpack.HotModuleReplacementPlugin()
    ]
}
