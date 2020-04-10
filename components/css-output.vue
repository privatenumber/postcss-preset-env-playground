<template>
	<div>
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
			<pre
				class="output-css"
			>{{ css }}</pre>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		error: null,
		css: String,
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
.error {
	background-color: #f44336;
	color: #fff;
	padding: 8px;
	white-space: pre;
}

.output-container {
	position: relative;
}

.size {
	position: absolute;
	top: 0;
	right: 0;
	background: rgba(0, 0, 0, 0.5);
	color: #fff;
	padding: 8px;
}

.output-css {
	padding: 16px;
	font-size: 11px;
}
</style>
