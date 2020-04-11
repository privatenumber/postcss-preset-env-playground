import express from 'express';
import postcss from 'postcss';
import postcssPresetEnv from 'postcss-preset-env';
import bodyParser from 'body-parser';
import compression from 'compression';

const app = express();

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

export default app;
