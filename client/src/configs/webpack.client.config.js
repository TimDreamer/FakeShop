const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.conf');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin');

module.exports = merge(baseConfig, {
	entry: {
		client: path.resolve(__dirname, '../src/entry-client.js'),
	},
	plugins: [
		new VueSSRClientPlugin(),
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, '../src/template/index.html'),
			filename: 'index.html',
		}),
	],
});
