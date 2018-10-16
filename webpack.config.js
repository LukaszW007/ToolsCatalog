const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
//const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const OptimizeJsPlugin = require('optimize-js-plugin');
const env = process.env.NODE_ENV || 'development';

var plugins = [
    new HtmlWebpackPlugin({
        template: 'src/index.html',
        filename: 'index.html',
        inject: 'body'
    })
];
console.log('NODE_ENV:', env);

if (env === 'production') {
    plugins.push(
        new webpack.optimize.UglifyJsPlugin(),
        new OptimizeJsPlugin({
            sourceMap: false
        })
    );
}
module.exports = {
    entry: ['react-hot-loader/patch', './src/index.js'],
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'app.bundle.js'
    },
    devtool: 'cheap-module-eval-source-map',
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: "babel-loader",
                exclude: /node_modules/,
                options: {
                    presets: ['es2015', 'react'],
                    plugins: ["react-hot-loader/babel"]
                }
            },
            //CSS loader, you should install package by: npm install --save-dev style-loader css-loader
            //documentation: https://webpack.js.org/loaders/sass-loader/
            {
                test: /\.css$/,
                use: [
                    {loader: 'style-loader'},
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true
                        }
                    }
                ]
            },
            {
                test: /\.sass$/,
                use: [
                    {loader: 'style-loader'},
                    {loader: 'sass-loader'}
                ]
            }
        ]
    },
    devServer: {
        contentBase: './build',
        hot: true
    },
    plugins


};