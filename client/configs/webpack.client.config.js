const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.config');
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = merge(baseConfig, {
	entry: ['@babel/polyfill', './src/entry-client.js'],
	output: {
		chunkFilename: '[name].[chunkhash:7].js',
	},
	resolve: {
		modules: ['node_modules'],
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				loader: 'css-loader',
			},
			{
				test: /\.s[ac]ss$/i,
				use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
			},
		],
	},
	plugins: [new VueSSRClientPlugin()],
});
