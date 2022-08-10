const { createBundleRenderer } = require('vue-server-renderer');
const express = require('express');
const { resolve } = require('path');
const serverBundle = require(resolve(
	__dirname,
	'../dist/vue-ssr-server-bundle.json'
));
const clientManifest = require(resolve(
	__dirname,
	'../dist/vue-ssr-client-manifest.json'
));
const template = require('fs').readFileSync(
	resolve(__dirname, '../dist/index.ssr.html'),
	'utf-8'
);

const app = express();

const renderer = createBundleRenderer(serverBundle, {
	runInNewContext: false, // 推荐
	template, // （可选）页面模板
	clientManifest, // （可选）客户端构建 manifest
});

app.get('*', (req, res) => {
	if (req.url === '/favicon.ico') return;
	const context = { url: req.url };
	renderer.renderToString(context, (err, html) => {
		res.end(html);
	});
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
	console.log(`server started at localhost:${port}`);
});
