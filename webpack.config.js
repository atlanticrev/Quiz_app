const path = require("path");
const webpack = require("webpack");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: "./src/index.js",
    mode: "development",
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: path.resolve(__dirname, 'public'),
        filename: "bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader, // user style-loader for development
                        options: {
                            // hmr: process.env.NODE_ENV === 'development',
                            publicPath: path.join(__dirname, 'dist')
                        },
                    },
                    'css-loader',
                    'resolve-url-loader',
                    {
                        loader: "sass-loader",
                        options: {
                            implementation: require('node-sass')
                        },
                    }
                ],
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    'file-loader',
                ],
            },
        ]
    },
    devServer: {
        contentBase: path.join(__dirname, 'public'),
        publicPath: path.join(__dirname, 'dist'),
        port: 3000,
        hotOnly: true
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new MiniCssExtractPlugin({
            filename: '[name].css'
        }),
    ]
};