import compression from 'compression';
import bodyParser from 'body-parser';

module.exports = {
	mode: 'universal',

	head: {
		title: 'PostCSS preset-env Playground',
		meta: [
			{ charset: 'utf-8' },
			{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
			{ hid: 'description', name: 'description', content: process.env.npm_package_description || '' },
		],
		link: [
			{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
		],
		script: [
			{ type: 'text/javascript', src: 'https://unpkg.com/systemjs@6.3.0/dist/system.min.js' },
			{ type: 'text/javascript', src: 'https://unpkg.com/systemjs@6.3.0/dist/extras/amd.min.js' },
			{
				type: 'systemjs-importmap',
				json: {
					imports: {
						'codemirror/': 'https://unpkg.com/codemirror@5.52.2/',
					},
				},
			},
		],
	},
	/*
	** Customize the progress-bar color
	*/
	loading: { color: '#3374ff' },

	/*
	** Nuxt.js dev-modules
	*/
	buildModules: [
		// Doc: https://github.com/nuxt-community/eslint-module
		// ['@nuxtjs/eslint-module'],

		// Doc: https://github.com/nuxt-community/stylelint-module
		'@nuxtjs/stylelint-module',
	],

	modules: [
		'@nuxt/http',
	],

	http: {
		browserBaseURL: '/',
	},

	build: {
		postcss: {
			preset: {
				stage: 0,
			},
		},
		friendlyErrors: false,
	},

	serverMiddleware: [
		compression(),
		bodyParser.json(),
		(req, res, next) => {
			res.json = function json(obj) {
				res.setHeader('Content-Type', 'application/json');
				res.end(JSON.stringify(obj));
				return this;
			};
			next();
		},
		{
			path: '/postcss',
			handler: '~/server-middleware/postcss',
		},
	],
};
