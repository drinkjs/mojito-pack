<template>
	<ElImage
		v-bind="attributes"
		:fit="fit"
		:src="image"
		style="width: 100%; height: 100%;background: none;"
	></ElImage>
</template>

<script lang="ts">
import { MojitoComponentProps } from "@mojito/vue-pack";
import "element-plus/dist/index.css";
import { CreatePack } from "@mojito/vue-pack";
import { ElImage } from "element-plus";
import { defineComponent } from "vue";
import emptyImg from "./emptyImg.json"

const Image = defineComponent({
	components: { ElImage },
	props: {
		...MojitoComponentProps,
		src: String,
		fit: String,
		attributes: Object,
	},
	data(){
		return {
			image: this.$props.src || emptyImg.data
		}
	},
	watch:{
		src(newVal){
			this.image = newVal || emptyImg.data
		}
	}
});

export default Image;

export const PackImage = CreatePack(Image, {
	name: "图片",
	category: "基础组件",
	props: {
		src: {
			name: "图片地址",
			type: "image",
		},
		fit: {
			name: "自适应",
			type: ["fill", "contain", "cover", "none", "scale-down"],
			description: "确定图片如何适应容器框",
		},
		attributes: {
			name: "属性",
			type: "object",
			description:
				"https://element-plus.org/zh-CN/component/image.html#image-attributes",
		},
	},
});
</script>
