const fs = require('fs');
const express = require('express');
const path = require('path');
const resolve = (file) => path.resolve(__dirname, file);

const PORT = process.env.PORT || 8080;
const HOST = process.env.HOST || 'localhost';

const app = express();
const template = fs.readFileSync(resolve('./src/index.ssr.html'), 'utf-8');

const createRenderer = (bundle, options) => {
	return require('vue-server-renderer').createBundleRenderer(
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

const TIMEOUT_SEC = 5;

app.get('*', (req, res) => {
	const context = {
		req,
		res,
		url: req.url,
	};

	let timeout = setTimeout(() => {
		res.status(404);
		res.send(`Timeout with ${TIMEOUT_SEC} sec`);
	}, TIMEOUT_SEC * 1000);

	readyPromise.then(() => {
		clearTimeout(timeout);
		render(req, res, context);
	});
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
