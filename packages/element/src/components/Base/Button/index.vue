<template>
	<ElButton v-bind="attributes" @click="$emit('onClick')">{{ text }}</ElButton>
</template>

<script lang="ts">
import { MojitoComponentProps } from "@mojito/vue-pack";
import 'element-plus/dist/index.css'
import { CreatePack } from "@mojito/vue-pack";
import { ElButton } from "element-plus";
import { defineComponent } from "vue";

const Button = defineComponent({
  components: { ElButton },
  props: {
    ...MojitoComponentProps,
    text: String,
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
    attributes:{
      name:"属性",
      type:"object",
      description:"https://element-plus.org/zh-CN/component/button.html#button-attributes",
    }
  } 
});

</script>
