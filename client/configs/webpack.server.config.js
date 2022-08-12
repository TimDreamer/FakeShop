const merge = require('webpack-merge');
const nodeExternals = require('webpack-node-externals');
const baseConfig = require('./webpack.base.config');
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = merge(baseConfig, {
	entry: ['@babel/polyfill', './src/entry-server.js'],

	target: 'node',

	output: {
		libraryTarget: 'commonjs2',
	},

	externals: [
		nodeExternals({
			whitelist: [/\.css$/, /\?vue&type=style/],
		}),
	],

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

	plugins: [new VueSSRServerPlugin()],
});
