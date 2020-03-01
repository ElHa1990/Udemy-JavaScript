const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: ['babel-polyfill','./src/js/index.js'],  //polyfill: used to make stuff that was not present in ES5. Adds this to our code.   
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/bundle.js'
    },

    devServer: {
        contentBase: './dist',
    },

    plugins: [
        new HtmlWebpackPlugin ({
            filename: 'index.html',
            template: './src/index.html'
        })
    ],
    module: {
        rules: [
            {
                test: /\.js$/,       //test all of the files for js files.
                exclude: /node_module/,
                use: {
                    loader: 'babel-loader'
                } 
            }
        ]
    }
};