const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
    entry: ['webpack-dev-server/client?http://0.0.0.0:80', path.resolve(__dirname, './index.jsx')],
    output: {
        path: path.resolve(__dirname + '/build'),
        filename: '[bundle].js',
        publicPath: '/'
    },
    resolve: {
        alias: {
            Redux: path.resolve(__dirname + '/src/redux'),
            Common: path.resolve(__dirname + '/src/common')
        },
        extensions: [".jsx", ".js"],
    },
    module: {
        rules: [{
            test: /\.jsx$/,
            exclude: '/node_modules/',
            loader: 'babel-loader'
        }]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html',
        }),
        new CopyPlugin({
            patterns: [
                {
                    from: './data/randomPurchases.json',
                    to: 'public'
                },
                {
                    from: './data/randomUsers.json',
                    to: 'public'
                }
            ]
        })
    ]
}