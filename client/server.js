const { createBundleRenderer } = require('vue-server-renderer');
const fs = require('fs');
const express = require('express');
const path = require('path');
const resolve = (file) => path.resolve(__dirname, file);

const PORT = process.env.PORT || 8080;
const HOST = process.env.HOST || 'localhost';

const app = express();
const template = fs.readFileSync(resolve('./src/index.ssr.html'), 'utf-8');

const createRenderer = (bundle, options) => {
	return createBundleRenderer(
		bundle,
		Object.assign(options, {
			template,
			basedir: resolve('./dist'),
			runInNewContext: false,
		})
	);
};

let renderer;
const readyPromise = require('./configs/setup-dev-server')(
	app,
	(serverBundle, clientManifest) => {
		renderer = createRenderer(serverBundle, {
			clientManifest,
		});
	}
);

const render = (req, res, context) => {
	renderer.renderToString(context, (err, html) => {
		if (err) {
			const status = err.code || context.status || 500;
			res.status(status);
			res.end();
		} else {
			res.status(context.status || 200);
			res.send(html);
		}
	});
};

app.use('/dist', express.static(path.resolve('/dist')));

app.get('*', (req, res) => {
	const context = {
		req,
		res,
		url: req.url,
	};

	readyPromise.then(() => render(req, res, context));
});

const server = app.listen(PORT, () => {
	console.log(`Server is running:\nhttp://${HOST}:${PORT}`);
});

module.exports = {
	ready: readyPromise,
	close() {
		server.close();
	},
};
