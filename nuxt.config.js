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
		'@nuxtjs/eslint-module',
    // Doc: https://github.com/nuxt-community/stylelint-module
		'@nuxtjs/stylelint-module',
	],
	modules: [
		'@nuxtjs/axios',
	],
};
