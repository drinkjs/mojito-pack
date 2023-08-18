<template>
	<el-table v-bind="attributes" :data="data" style="width: 100%">
		<el-table-column
			:prop="column.prop"
			:label="column.label"
			:width="column.width"
      :min-width="column.minWidth"
      v-bind="column.attributes"
			v-for="column in columns"
			:key="column.prop"
		/>
	</el-table>
</template>

<script lang="ts">
import { MojitoComponentProps } from "@drinkjs/mojito-vue-pack";
import "element-plus/dist/index.css";
import { CreatePack } from "@drinkjs/mojito-vue-pack";
import { ElTable, ElTableColumn } from "element-plus";
import { defineComponent } from "vue";

const Tabel = defineComponent({
	components: { ElTable, ElTableColumn },
	props: {
		...MojitoComponentProps,
		columns: Array<{ prop: String; label: String; width: [Number, String], minWidth:[Number, String], attributes: Object}>,
		data: Array<Object>,
		attributes: Object,
	},
});

export default Tabel;

export const PackTabel = CreatePack(Tabel, {
	name: "表格",
	category: "数据展示",
	props: {
		columns: {
			name: "表头",
			type: "array",
			description: "Array<{prop:String, label:String, width?:[Number, String], minWidth?:[Number, String]}, attributes: Object>",
			default: [
				{
					prop: "date",
					label: "Date",
				},
				{
					prop: "name",
					label: "Name",
				},
				{
					prop: "address",
					label: "Address",
				},
			],
		},
		data: {
			name: "数据",
			type: "array",
			default: [
				{
					date: "2016-05-03",
					name: "Tom",
					address: "No. 189, Grove St, Los Angeles",
				},
				{
					date: "2016-05-02",
					name: "Tom",
					address: "No. 189, Grove St, Los Angeles",
				},
				{
					date: "2016-05-04",
					name: "Tom",
					address: "No. 189, Grove St, Los Angeles",
				},
				{
					date: "2016-05-01",
					name: "Tom",
					address: "No. 189, Grove St, Los Angeles",
				},
			],
		},
    stripe:{
      name:"斑马纹",
      type:"boolean",
      default: true,
    },
		attributes: {
			name: "属性",
			type: "object",
			description:
				"https://element-plus.org/zh-CN/component/button.html#button-attributes",
		},
	},
});
</script>
