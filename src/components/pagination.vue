<template>
  <div class="page" v-if="total > 0">
    <span class="total">
      共 {{ Math.ceil(total / pageSize) }}页/
      <span>{{ total }} 条数据</span>
    </span>
    <el-pagination
      class="paginationBox"
      @current-change="pageChange"
      :next-text="nextText"
      :prev-text="prevText"
      :layout="layout||'prev, pager, next, jumper'"
      :total="total"
      :current-page="page"
      :page-size="pageSize"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  name: "page",
  components: {},
  props: {
    total: Number || String,
    page: Number,
    pageSize: Number,
    nextText: String,
    prevText: String,
    layout: String,
  },
  data() {
    return {};
  },
  computed: {
    pageTotal() {
      return Math.ceil(this.total / this.pageSize);
    },
  },
  watch: {},
  methods: {
    //分页
    pageChange(index) {
      this.$emit('update:page', index)
      this.$emit("pageChange", index)
    },
  },
  created() {},
  mounted() {},
};
</script>
<style lang="less" scoped>
.page {
  font-size: 14px;
  color: #323232;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-top: 19px;
  padding-top: 40px;
  border-top: 1px solid #e8e8e8;
  .total {
    height: 24px;
    line-height: 24px;
    padding-right: 25px;
  }
  /deep/.el-pagination {
    text-align: right;
    .btn-prev,
    .btn-next {
      width: 34px;
      height: 24px;
      padding: 0;
      border: 1px solid #cccccc;
      border-radius: 4px;
      font-size: 14px;
      color: #000;
      margin-right: 10px;
      font-weight: 600;
      line-height: 24px;
    }

    button, span:not([class*=suffix]) {
      height: 24px;
      line-height: 24px;
    }
    .el-pager {
      li {
        min-width: 34px;
        height: 24px;
        border: 1px solid #cccccc;
        border-radius: 4px;
        font-size: 14px;
        color: #000;
        line-height: 24px;
        text-align: center;
        font-weight: 400;
        margin-right: 10px;
        padding: 0 5px;
      }
      .more::before {
        line-height: 24px;
      }
      li.active {
        background: #0b5fd5;
        border-radius: 4px;
        font-weight: 400;
        color: #fff;
      }
    }
    .el-pagination__editor {
      
      height: 24px;
      border: 1px solid #cccccc;
      border-radius: 4px;
      font-size: 14px;
      color: #000;
      margin: 0 10px;
      font-weight: 400;
      line-height: 24px;
      .el-input__inner {
        border: 0;
        padding: 0 10px;
        height: 12px;
        line-height: normal;
        margin-bottom: 5px;
      }
    }
  }
}
</style>
