const merge = require('webpack-merge');
const nodeExternals = require('webpack-node-externals');
const baseConfig = require('./webpack.base.config');
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin');

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
				use: [
					'vue-style-loader',
					{
						loader: 'css-loader',
						options: {
							importLoaders: 0,
							sourceMap: true,
							onlyLocals: false,
						},
					},
				],
			},
			{
				test: /\.sass$/i,
				// use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
				use: [
					'vue-style-loader',
					{
						loader: 'css-loader',
						options: {
							importLoaders: 1,
							sourceMap: true,
							onlyLocals: false,
						},
					},
					{
						loader: 'sass-loader',
						options: {
							sassOptions: {
								indentedSyntax: true,
							},
							sourceMap: false,
						},
					},
				],
			},
		],
	},

	plugins: [new VueSSRServerPlugin()],
});
