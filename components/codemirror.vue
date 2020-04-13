<template>
	<div />
</template>

<script>
const importCss = (url) => window.System.import(url).then((module) => {
	document.adoptedStyleSheets = [...document.adoptedStyleSheets, module.default];
});

const camelCase = (kebab) => kebab.replace(/-([a-z])/g, (_, c) => c.toUpperCase());

const parse = (attrs) => Object.entries(attrs)
	.reduce(
		(agg, [attr, value]) => {
			agg[camelCase(attr)] = value === '' ? true : value; // eslint-disable-line no-param-reassign
			return agg;
		},
		{},
	);

export default {
	inheritAttrs: false,

	props: {
		value: {
			type: String,
			default: '',
		},
		importAddons: {
			type: Array,
			default: () => [],
		},
	},

	watch: {
		value(value) {
			const currentVal = this.cm.getValue();

			if (value !== currentVal) {
				this.cm.setValue(value);
			}
		},
	},

	async mounted() {
		const options = parse(this.$attrs);
		options.value = this.value || '';

		const dependencies = [
			window.System.import('codemirror/lib/codemirror'),
			importCss('codemirror/lib/codemirror.css'),
		];

		if (options.theme) {
			dependencies.push(importCss(`codemirror/theme/${options.theme}.css`));
		}

		if (options.keyMap) {
			dependencies.push(window.System.import(`codemirror/keymap/${options.keyMap}`));
		}

		if (options.mode) {
			dependencies.push(window.System.import(`codemirror/mode/${options.mode}/${options.mode}`));
		}

		if (this.importAddons) {
			this.importAddons.forEach((addonPath) => {
				dependencies.push(window.System.import(`codemirror/addon/${addonPath}`));
			});
		}

		const [{ default: Codemirror }] = await Promise.all(dependencies);

		this.cm = Codemirror(
			($cm) => {
				const { $el } = this;
				Array.from($el.attributes).forEach((attr) => {
					if (attr.name === 'class') {
						$cm.className += ` ${$el.className}`; // eslint-disable-line no-param-reassign
					} else {
						$cm.setAttribute(attr.name, attr.value);
					}
				});
				this.$el.parentNode.replaceChild($cm, this.$el);
			},
			options,
		);

		this.cm.on('change', () => {
			this.$emit('input', this.cm.getValue());
		});
	},
};
</script>
