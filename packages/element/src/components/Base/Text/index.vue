<template>
	<ElText v-bind="attributes">{{ text }}</ElText>
</template>

<script lang="ts">
import { MojitoComponentProps } from "@mojito/vue-pack";
import 'element-plus/dist/index.css'
import { CreatePack } from "@mojito/vue-pack";
import { ElText } from "element-plus";
import { defineComponent } from "vue";

const Text = defineComponent({
  components: { ElText },
  props: {
    ...MojitoComponentProps,
    text: String,
    attributes: Object
  },
})

export default Text;

export const PackText = CreatePack(Text, { 
  name: "文本",
  category:"基础组件",
  props: {
    text:{
      name:"文字",
      type:"string",
      default:"这里显示文本..."
    },
    truncated:{
      name:"省略",
      type:"boolean",
    },
    attributes:{
      name:"属性",
      type:"object",
      description:"https://element-plus.org/zh-CN/component/text.html#attributes",
    }
  } 
});

</script>
