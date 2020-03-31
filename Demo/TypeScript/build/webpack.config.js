/*
 *  Description: webpack配置文件
 *  Author: LuckRain7
 *  Date: 2020-03-31 23:22:13
 */

const HtmlWebpackPlugin = require('html-webpack-plugin')

const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
    // 配置入口文件
    entry: './src/index.ts',
    // 输出文件
    output: {
        filename: 'main.js',
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js'], //配置js ts tsx文件
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/, //忽略解析node_modules中文件
            },
        ],
    },
    devtool:
        process.env.NODE_ENV === 'production' ? false : 'inline-source-map',
    devServer: {
        contentBase: './dist',
        stats: 'errors-only',
        compress: false,
        host: 'localhost',
        port: 8089,
    },
    plugins: [
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: ['./dist'],
        }),
        new HtmlWebpackPlugin({
            template: './src/template/index.html',
        }),
    ],
}

// const HtmlWebpackPlugin = require('html-webpack-plugin'),
//     CleanWebpackPlugin = require('clean-webpack-plugin')
