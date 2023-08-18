<template>
	<div :style="styles">{{ text }}</div>
</template>

<script lang="ts">
import { MojitoComponentProps } from "@mojito/vue-pack";
import "element-plus/dist/index.css";
import { CreatePack } from "@mojito/vue-pack";
import { defineComponent } from "vue";

const Text = defineComponent({
	props: {
		...MojitoComponentProps,
		text: String,
		attributes: Object,
	},
	data() {
		return {
			styles: {
				color: this.__style?.color ?? "#ff0000",
				fontFamily: this.__style?.fontFamily,
				fontSize: this.__style?.fontSize ?? 32,
				fontWeight: this.__style?.fontWeight,
				textAlign: this.__style?.textAlign,
			},
		};
	},
	watch: {
		__style(newVal) {
			this.styles = {
        color: newVal?.color ?? "#ff0000",
				fontFamily: newVal?.fontFamily,
				fontSize: newVal?.fontSize ?? 32,
				fontWeight: newVal?.fontWeight,
				textAlign: newVal?.textAlign,
      }
		},
	},
});

export default Text;

export const PackText = CreatePack(Text, {
	name: "文本",
	category: "基础组件",
	props: {
		text: {
			name: "文字",
			type: "string",
			default: "这里显示文本...",
		},
	},
});
</script>
