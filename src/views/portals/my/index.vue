<template>
  <router-view></router-view>
</template>

<script>
import * as portalsApi from '@/api/portals'
import { latestList } from "@/api/portals/workOrder";

export default {
  name: "index",
  data() {
    return {
      loading: false,
      list: []
    }
  },
  created() {
    // this.getLatestList()
  },
  methods: {
    getLatestList() {
      portalsApi.workOrder.latestList()
      .then(res => {
        this.list = res.result
      })
    }
  }
};
</script>

<style scoped>

</style>