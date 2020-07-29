const merge = require('webpack-merge');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const webpackBaseConfig = require('./webpack.common.config.js');


module.exports = merge(webpackBaseConfig, {
    optimization: {
        minimizer: [
            new UglifyJsPlugin(),
            new OptimizeCSSAssetsPlugin()
        ]
    }
});
module.exports = merge(webpackBaseConfig, {
    plugins: [
        new HTMLInlineCSSWebpackPlugin({
            replace: {
                removeTarget: true,
                target: '<!--{{inline_css_plugin}}-->',
            },
        }),
    ]
});