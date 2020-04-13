<template>
	<split-view class="columns">
		<css-input
			slot="A"
			v-model="inputCss"
			:options="options"
		/>
		<css-output
			slot="B"
			:error="output.err"
			:css="output.css"
		/>
	</split-view>
</template>

<script>
import SplitView from 'vue-split-view';
import 'vue-split-view/dist/vue-split-view.css';
import debounce from 'lodash/debounce';
import CssInput from '~/components/css-input.vue';
import CssOutput from '~/components/css-output.vue';

const initialCss = `
@custom-media --viewport-medium (width <= 50rem);
@custom-selector :--heading h1, h2, h3, h4, h5, h6;

:root {
  --mainColor: #12345678;
}

body {
  color: var(--mainColor);
  font-family: system-ui;
  overflow-wrap: break-word;
}

:--heading {
  background-image: image-set(url(img/heading.png) 1x, url(img/heading@2x.png) 2x);

  @media (--viewport-medium) {
    margin-block: 0;
  }
}

a {
  color: rgb(0 0 100% / 90%);

  &:hover {
    color: rebeccapurple;
  }
}
`.trim();

export default {
	components: {
		SplitView,
		CssInput,
		CssOutput,
	},

	data() {
		return {
			options: {
				stage: 0,
				preserve: true,
				browsers: 'last 2 versions',
			},
			inputCss: initialCss,
			output: {
				err: null,
				css: '',
			},
		};
	},

	watch: {
		inputCss() {
			this.compileCss();
		},
		options: {
			deep: true,
			handler() {
				this.compileCss();
			},
		},
	},

	created() {
		this.compileCss = debounce(this.compileCss, 500);
	},

	beforeMount() {
		this.compileCss();
	},

	methods: {
		async compileCss() {
			this.output = await this.$http.$post('postcss', {
				options: this.options,
				css: this.inputCss,
			}).catch((err) => {
				if (err.response && err.response.status === 422) {
					return err.response.json();
				}
				throw err;
			});
		},
	},
};
</script>

<style scoped>
.columns {
	width: 100%;
	height: 100vh;
}
</style>
