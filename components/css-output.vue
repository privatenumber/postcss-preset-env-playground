<template>
	<div class="output">
		<div
			v-if="error"
			class="error"
		>
			{{ error }}
		</div>
		<div class="output">
			<span
				v-if="size"
				class="size"
			>
				{{ size }}
			</span>
			<client-only>
				<codemirror
					class="codemirror"
					:value="css"
					mode="css"
					read-only
					line-numbers
					line-wrapping
					cursor-blink-rate="-1"
					theme="material"
				/>
			</client-only>
		</div>
	</div>
</template>

<script>
export default {

	components: {
		Codemirror: () => (process.env.VUE_ENV === 'client') && import('~/components/codemirror.vue'),
	},
	props: {
		error: {
			type: String,
			default: undefined,
		},
		css: {
			type: String,
			default: undefined,
		},
	},

	computed: {
		size() {
			if (!this.css) { return ''; }
			return `${(this.css.length / 1024).toFixed(2)}kb`;
		},
	},
};
</script>

<style scoped>
.output {
	height: 100%;
}

.error {
	background-color: #e23d31;
	color: #fff;
	padding: 16px;
}

.output-container {
	position: relative;
}

.size {
	position: absolute;
	top: 0;
	right: 0;
	z-index: 1;
	background: rgba(0, 0, 0, 0.25);
	color: #fff;
	padding: 8px;
}

.codemirror {
	height: 100%;
}
</style>
