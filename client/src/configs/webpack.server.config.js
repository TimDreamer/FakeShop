const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');
const nodeExternals = require('webpack-node-externals');
const baseConfig = require('./webpack.base.conf');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin');

module.exports = merge(baseConfig, {
	entry: {
		server: path.resolve(__dirname, '../entry-server.js'),
	},

	target: 'node',

	devtool: 'source-map',

	output: {
		libraryTarget: 'commonjs2',
	},

	externals: nodeExternals({
		allowlist: /\.css$/,
	}),

	plugins: [
		new VueSSRServerPlugin(),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify(
				process.env.NODE_ENV || 'development'
			),
			'process.env.VUE_ENV': '"server"',
		}),
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, '../index.ssr.html'),
			filename: 'index.ssr.html',
			inject: true,
			files: {
				js: 'client.js',
			},
			excludeChunks: ['server'],
		}),
	],
});
