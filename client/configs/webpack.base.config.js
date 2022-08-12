const { VueLoaderPlugin } = require('vue-loader');
const path = require('path');

module.exports = {
	mode: 'development',

	devtool: 'eval-source-map',
	entry: {
		app: './src/entry-client.js',
	},

	output: {
		path: path.resolve(__dirname, '../dist'),
		publicPath: 'dist/',
		filename: '[name].[chunkhash:7].js',
	},

	resolve: {
		alias: {
			'@': path.resolve(__dirname, '../src'),
		},
		extensions: ['.js', '.vue', '.sass'],
	},

	modules: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'babel-loader',
					},
				],
			},
			{
				test: /\.vue$/,
				loader: 'vue-loader',
				options: {
					compilerOptions: {
						preserveWhitespace: false,
					},
				},
			},
			{
				test: /\.(png|jpg|gif|ico|webp)$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: '[name].[hash:7].[ext]',
							outputPath: 'static',
							esModule: false,
						},
					},
				],
			},
			{
				test: /\.svg$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: '[name].[hash:7].[ext]',
							outputPath: 'static',
							esModule: false,
						},
					},
				],
			},
			{
				test: /\.(graphql|gql)$/,
				exclude: /node_modules/,
				loader: 'graphql-tag/loader',
			},
		],
	},
	plugins: [new VueLoaderPlugin()],
};
