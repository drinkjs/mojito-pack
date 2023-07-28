<script lang="ts">
import Test from "./Test.vue";
import { CreatePack } from "@mojito/vue-pack";

export default CreatePack(Test, { 
  name: "vue测试", 
  props: {
    text:{
      name:"文字",
      type:"string",
      default:"测试"
    }
  } 
});
</script>
