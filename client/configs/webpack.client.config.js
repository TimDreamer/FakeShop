const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.config');
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin');

module.exports = merge(baseConfig, {
	entry: [
		'@babel/polyfill',
		'unfetch',
		'intersection-observer',
		'./src/entry-client.js',
	],
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
	plugins: [new VueSSRClientPlugin()],
});
