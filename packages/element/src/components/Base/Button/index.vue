<template>
	<ElButton v-bind="attributes" :type="type" @click="$emit('onClick')">{{ text }}</ElButton>
</template>

<script lang="ts">
import { MojitoComponentProps } from "@drinkjs/mojito-vue-pack";
import 'element-plus/dist/index.css'
import { CreatePack } from "@drinkjs/mojito-vue-pack";
import { ElButton } from "element-plus";
import { defineComponent } from "vue";

const Button = defineComponent({
  components: { ElButton },
  props: {
    ...MojitoComponentProps,
    text: String,
    type: String,
    attributes: Object
  },
})

export default Button;

export const PackButton = CreatePack(Button, { 
  name: "按钮",
  category:"基础组件",
  props: {
    text:{
      name:"文字",
      type:"string",
      default:"按钮"
    },
    type:{
      name:"类型",
      type: ["primary", "success",  "info",  "warning",  "danger"]
    },
    attributes:{
      name:"属性",
      type:"object",
      description:"https://element-plus.org/zh-CN/component/button.html#button-attributes",
    }
  },
  events:{
    onClick:{
      name:"点击",
    }
  } 
});

</script>
