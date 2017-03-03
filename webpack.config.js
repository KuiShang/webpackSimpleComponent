var path = require('path')
var webpack = require('webpack');
var production = process.env.NODE_ENV === 'production';//判断是不是生产环境， window下可以在cmd 通过set NODE_ENV=production/development来改变环境变量 是生产/开发环境
var CleanPlugin = require('clean-webpack-plugin');//清除一个文件夹下的文件
var ExtractPlugin = require('extract-text-webpack-plugin');//把css抽取到单独的文件
var HtmlWebpackPlugin = require('html-webpack-plugin');//自动生成html文件

var plugins = [
    new HtmlWebpackPlugin(),
    new ExtractPlugin('bundle.css'),
    new webpack.optimize.CommonsChunkPlugin({
        name: 'main',
        // Move dependencies to our main file
        children: true,
        // Look for common dependencies in all children,
        minChunks: 2,
        // How many times a dependency must come up before being extracted
    }),];

if (production) {
    plugins = plugins.concat([
        // Production plugins go here
        // This plugin looks for similar chunks and files
        // and merges them for better caching by the user
        /* new webpack.optimize.DedupePlugin(),*/

        // This plugins optimizes chunks and modules by
        // how much they are used in your app
        /* new webpack.optimize.OccurenceOrderPlugin(),*/

        // This plugin prevents Webpack from creating chunks
        // that would be too small to be worth loading separately
        new webpack.optimize.MinChunkSizePlugin({
            minChunkSize: 51200,
            // ~50kb
        }),

        // This plugin minifies all the Javascript code of the final bundle
        new webpack.optimize.UglifyJsPlugin({
            mangle: true,
            compress: {
                warnings: false,
                // Suppress uglification warnings
            },
        }),

        // This plugins defines various variables that we can set to false
        // in production to avoid code related to them from being compiled
        // in our final bundle
        new webpack.DefinePlugin({
            __SERVER__: !production,
            __DEVELOPMENT__: !production,
            __DEVTOOLS__: !production,
            'process.env': {
                BABEL_ENV: JSON.stringify(process.env.NODE_ENV),
            },
        }),
        /*    new webpack.LoaerOptionPlugin({
         debug:false
         }),*/
        new CleanPlugin('dist'),
    ]);
}
module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, './dist'),
        publicPath: '/dist/',
        filename: production ? '[name]-[hash].js' : 'bundle.js',
        chunkFilename: '[name]-[chunkhash].js',
    },
    /*    devServer: {
     hot: true,
     },*/
    module: {
        rules: [
            {
                test: /\.html$/,
                loader: 'html-loader'
            },
            {
                test: /\.scss$/,

                loader: ExtractPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader!sass-loader'
                }),
                include: /src/

            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                include: /src/
            },
            {
                test: /\.(png|gif|jpe?g|svg)$/i,
                loader: 'url-loader',
                query: {
                    limit: 10000
                }
            },
        ]
    },
    plugins: plugins,

    devtool: production ? false : 'eval',

}




