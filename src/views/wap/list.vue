<template>
  <warp title="公开信息" :hasPrevRoute="routerMap[$route.path]">
    <scroll ref="scroll" @bottom="handleLoadMore">
      <searchBar v-model="form.title" @enter="handleSearch"></searchBar>
      <complainList :list="list" :loading="loading" :moreLoading="moreLoading">
        <template v-slot:default="{item}">
          <complainItem :item="item" @click.native="$router.push(`/wap/details?id=${item.id}`)"></complainItem>
        </template>
      </complainList>
    </scroll>
  </warp>
</template>

<script>
import complainList from "@/views/wap/components/complainList";
import complainItem from "@/views/wap/components/complainItem";
import warp from "@/views/wap/components/warp";
import scroll from "@/views/wap/components/scroll";
import searchBar from "@/views/wap/components/searchBar";
import * as portalsApi from "@/api/portals";
import * as mixins from '@/views/wap/mixin'



export default {
  name: "list",
  mixins: [mixins.router],
  components: { complainList, complainItem, warp, scroll, searchBar },
  data() {
    return {
      loading: true,
      moreLoading: false,
      list: [],
      totalPage: 0,
      form: {
        title: ''
      },
      query: {
        pageSize: 10,
        pageNum: 1
      }
    }
  },
  mounted() {
    this.getLatestList()
      .then(() => {
        this.$nextTick(() => {
          this.$refs.scroll.handleScroll()
        })
      })
      .finally(() => this.loading = false)
  },
  methods: {
    getLatestList() {
      this.moreLoading = true
      return portalsApi.workOrder.list(Object.assign({}, this.query, this.form))
        .then(res => {
          const { records, pages } = res.result;
          this.list = this.list.concat(records);
          this.totalPage = Number(pages)
        })
        .finally(() => {
          this.moreLoading = false
        })
    },
    handleLoadMore() {
      if (this.query.pageNum < this.totalPage && this.moreLoading === false) {
        this.query.pageNum++
        this.getLatestList()
      }
    },
    handleSearch() {
      this.query.pageNum = 1
      this.list = []
      this.loading = true
      this.getLatestList()
        .then(() => {
          this.$nextTick(() => {
            this.$refs.scroll.handleScroll()
          })
        })
        .finally(() => this.loading = false)
    }
  }
};
</script>

<style scoped>

</style>