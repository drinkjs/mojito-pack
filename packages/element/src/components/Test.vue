<script setup lang="ts">
import { ref } from "vue";
import { MojitoComponentProps } from '@mojito/vue-pack';

interface TestProps extends MojitoComponentProps{
	text:string
}
	const props = defineProps<TestProps>()
	const count = ref(0);
	const data = ref(props);

</script>

<template>
	<div id="test" @click="$emit('onClick')">{{ count.toFixed(2) }} {{ data.text }}</div>
</template>

<style scoped>
	#test{
		color: #fff000;
	}
</style>
