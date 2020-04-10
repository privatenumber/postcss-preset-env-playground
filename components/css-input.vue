<template>
	<div class="css-input">
		<div class="controls">
			<label class="title">
				<strong>
					<a href="https://github.com/csstools/postcss-preset-env/">PostCSS preset-env</a> Playground
				</strong>
			</label>

			<label class="control">
				<span>Stage:</span>
				<select v-model="options.stage">
					<option>0</option>
					<option>1</option>
					<option>2</option>
					<option>3</option>
					<option>4</option>
				</select>
			</label>
			<label class="control">
				<span>Preserve:</span>
				<input
					v-model="options.preserve"
					type="checkbox"
				>
			</label>
			<label class="control">
				<span>
					<a
						:href="`https://browserl.ist/?q=${options.browsers}`"
						target="_blank"
					>Browsers</a>:
				</span>
				<input
					v-model="options.browsers"
					type="text"
				>
			</label>
		</div>
		<div
			class="input-container"
		>
			<span
				v-if="size"
				class="size"
			>
				{{ size }}
			</span>
			<textarea
				v-model="model"
				class="css-textarea"
				@keydown="handleTab"
			/>
		</div>
	</div>
</template>

<script>
export default {
	inheritAttrs: false,

	model: {
		event: 'update',
	},

	props: ['value', 'options'],

	computed: {
		model: {
			get() {
				return this.value;
			},
			set(val) {
				this.$emit('update', val);
			},
		},
		size() {
			if (!this.value) { return ''; }
			return `${(this.value.length / 1024).toFixed(2)}kb`;
		},
	},

	methods: {
		getSize(code) {
			return `${(code.length / 1024).toFixed(2)}kb`;
		},

		handleTab(e) {
			if (e.keyCode !== 9) { return; }

			const start = e.target.selectionStart;
			const end = e.target.selectionEnd;

			const { target } = e;
			const { value } = target;

			target.value = `${value.substring(0, start)}\t${value.substring(end)}`;

			e.target.selectionEnd = start + 1;
			e.target.selectionStart = e.target.selectionEnd;

			e.preventDefault();
		},
	},
};
</script>

<style scoped>
.css-input {
	position: relative;
	z-index: 0;
	display: flex;
	flex-direction: column;
	height: 100%;
}

.title {
	padding: 8px;
}

.controls {
	padding: 8px;
	border-bottom: 1px solid #ccc;
}

.control {
	border-left: 1px solid #ccc;
	padding: 8px;
}

.control:first-child {
	border-left: none;
}

.input-container {
	position: relative;
	width: calc(100% - 1px);
	height: 100%;
}

.size {
	position: absolute;
	top: 0;
	right: 0;
	background: rgba(0, 0, 0, 0.5);
	color: #fff;
	padding: 8px;
}

.css-textarea {
	width: 100%;
	height: 100%;
	resize: none;
	border: none;
	outline: none;
	padding: 16px;
	font-family: monospace;
}
</style>
