const postcss = require('postcss');
const postcssPresetEnv = require('postcss-preset-env');

module.exports = async (req, res) => {
	const { css, options } = req.body;

	try {
		const compiled = await postcss([
			postcssPresetEnv(options),
		]).process(css);
		res.json({ css: compiled.css });
	} catch (err) {
		res.json({ err });
	}
};
