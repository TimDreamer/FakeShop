const path = require('path');
const webpack = require('webpack');
const MemoryFS = require('memory-fs');
const webpackClientConfig = require('./webpack.client.config');
const webpackServerConfig = require('./webpack.server.config');

module.exports = function setupDevServer(app, callback) {
	return new Promise((resolve) => {
		let hasResolved = false,
			serverBundle = null,
			clientManifest = null;

		const doCallback = () => {
			if (serverBundle && clientManifest) {
				callback(serverBundle, clientManifest);
				if (!hasResolved) {
					hasResolved = true;
					resolve();
				}
			}
		};

		webpackClientConfig.entry = [
			'webpack-hot-middleware/client',
			...webpackClientConfig.entry,
		];
		webpackClientConfig.output.filename = '[name].js';
		webpackClientConfig.plugins.push(
			new webpack.HotModuleReplacementPlugin()
		);

		const clientCompiler = webpack(webpackClientConfig);

		const devMiddleware = require('webpack-dev-middleware')(
			clientCompiler,
			{
				publicPath: webpackClientConfig.output.publicPath,
				noInfo: true,
			}
		);

		app.use(devMiddleware);

		clientCompiler.plugin('done', () => {
			const fs = devMiddleware.fileSystem;
			const readFile = (file) =>
				fs.readFileSync(
					path.join(webpackClientConfig.output.path, file),
					'utf-8'
				);
			clientManifest = JSON.parse(
				readFile('vue-ssr-client-manifest.json')
			);
			doCallback();
		});

		app.use(require('webpack-hot-middleware')(clientCompiler));

		const serverCompiler = webpack(webpackServerConfig);
		const mfs = new MemoryFS();
		serverCompiler.outputFileSystem = mfs;
		serverCompiler.watch({}, (err, stats) => {
			if (err) throw err;
			stats = stats.toJson();
			stats.errors.forEach((err) => console.log(err));
			stats.warnings.forEach((warn) => console.warn(warn));
			const readFile = (file) =>
				mfs.readFileSync(
					path.join(webpackClientConfig.output.path, file),
					'utf-8'
				);
			serverBundle = JSON.parse(readFile('vue-ssr-server-bundle.json'));
		});
		doCallback();
	});
};
