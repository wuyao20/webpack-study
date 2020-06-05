const merge = require('webpack-merge');
const commonConfig = require('./webpack.common');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const path = require('path');
const WorkboxPlugin  = require('workbox-webpack-plugin');

const prodConfig = {
    mode: 'production',
    // devtool: 'cheap-module-source-map',
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
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
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader'
                ]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: '[name].css',
            chunkFilename: '[id].css',
        }),
        new WorkboxPlugin.GenerateSW({
            clientsClaim: true,
            skipWaiting: true
        })
    ],
    optimization: {
        minimizer: [new OptimizeCSSAssetsPlugin({})],
        runtimeChunk: {
            name: 'runtime'
        }
    },
    output: {
        // publicPath: "/",
        filename: "[name].[contenthash].js",  //entry文件
        chunkFilename: "[name].[contenthash].js",
        path: path.resolve(__dirname, '../dist')
    }
}

module.exports = merge(commonConfig, prodConfig);
