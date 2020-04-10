const express = require('express');
const consola = require('consola');
const { Nuxt, Builder } = require('nuxt');
const postcss = require('postcss');
const postcssPresetEnv = require('postcss-preset-env');
const bodyParser = require('body-parser');
const compression = require('compression');

const app = express();

// Import and Set Nuxt.js options
const config = require('../nuxt.config.js');

config.dev = process.env.NODE_ENV !== 'production';

async function start() {
	// Init Nuxt.js
	const nuxt = new Nuxt(config);

	const { host, port } = nuxt.options.server;

	await nuxt.ready();
	// Build only in dev mode
	if (config.dev) {
		const builder = new Builder(nuxt);
		await builder.build();
	}

	app.use(compression());
	app.use(bodyParser.json());

	app.post('/postcss', async (req, res) => {
		const { css, options } = req.body;

		try {
			const compiled = await postcss([
				postcssPresetEnv(options),
			]).process(css);
			res.send({ css: compiled.css });
		} catch (err) {
			res.send({ err });
		}
	});

	// Give nuxt middleware to express
	app.use(nuxt.render);

	// Listen the server
	app.listen(port, host);
	consola.ready({
		message: `Server listening on http://${host}:${port}`,
		badge: true,
	});
}
start();
