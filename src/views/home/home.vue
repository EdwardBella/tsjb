<template>
	<div class="home">

		<mapChart />

	</div>
</template>

<script>
	import mapChart from "./components/mapChart.vue";
	import * as statisticsAPI from "@/api/statistics";
	import {
		mapState
	} from "vuex";
	import * as echarts from "echarts";
	import {
		isAuthority
	} from "@/api/userManage";

	export default {
		name: "home.vue",
		components: {
			mapChart
		},
		data() {
			return {
				isAuthority: false,
			};
		},
		computed: {
			...mapState(["userInfo", "userRoles"])
		},
		created() {},
		mounted() {
			isAuthority().then(r => {
				this.isAuthority = r.result;
			});
		},
		methods: {



		}
	};
</script>

<style lang="less" scoped>
	.home {
		width: 100%;
		height: 600px;
	}
</style>