const path = require('path');

module.exports = {
    mode: 'development',
    entry: {
        main: './src/index.js'
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
                    'css-loader',
                    'sass-loader',
                    'postcss-loader'
                ]
            },
        ]
    },
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, 'dist')
    }
}
