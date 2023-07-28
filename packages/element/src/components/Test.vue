<script lang="ts">
import { ref } from "vue";
export default {
	props: {
		text:String
	},
	setup(props) {
		const count = ref(0);
		const data = ref(props);
		return { count, data };
	},
};
</script>

<template>
	<div id="test">{{ count.toFixed(2) }} {{ data.text }}</div>
</template>
