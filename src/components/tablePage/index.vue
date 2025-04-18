<template>
  <div class="table-page">
    <template>
      <card v-if="$slots['search-form']" :height="isFold ? '36px' : 'auto'">
        <template slot="content">
          <el-form
            :model="searchForm"
            :rules="searchFormRules"
            ref="searchForm"
            class="search-form"
            inline
            :label-width="labelWidth"
            label-suffix=" :">
            <slot name="search-form"></slot>
          </el-form>
        </template>
      </card>
      <div v-if="$slots['search-form'] || $slots['left']" class="btns">
        <div v-if="$slots['left']" class="left">
          <slot name="left"></slot>
        </div>
        <div v-if="$slots['search-form']" class="right">
          <el-button v-if="canFold" @click="isFold = !isFold" type="primary" plain>{{ isFold ? '展开' : '收起' }}</el-button>
          <el-button @click="handleSearch" type="primary" plain icon="img icon-search">查询</el-button>
          <el-button @click="handleReset" type="primary" plain icon="img icon-reset">重置</el-button>
        </div>
      </div>
    </template>
    <card>

      <template slot="content">
        <el-table ref="table" class="page-table beautify-scroll" :data="rows" v-loading="loading" stripe border>
          <slot name="rows"></slot>
        </el-table>
        <pagination
          v-if="total >= 0"
          :total="total"
          :page.sync="pageQuery.pageNum"
          :pageSize="pageQuery.pageSize"
          @pageChange="playLoadData"
        />
        <slot name="other"></slot>
      </template>
    </card>
  </div>
</template>

<script>
import card from "@/components/card/index.vue";
import pagination from "@/components/pagination.vue";
import { removeEmptyItem } from '@/utils/common'

export default {
  name: "index",
  components: { card, pagination },
  props: {
    tableData: { type: Array, default: Array },
    searchForm: { type: Object, default: Object },
    searchFormRules: { type: Object, default: Object },
    labelWidth: { type: String, default: '110px' },
    hideSearch: { type: Boolean, default: false },
    requestFunc: { type: Function },
    beforePlayLoad: { type: Function },
    autoFetch: { type: Boolean, default: true },
    canFold: { type: Boolean, default: false },
    defaultIsFold: { type: Boolean, default: false }
  },
  data() {
    return {
      _defaultSearchForm: {},
      activeSearchForm: {},
      loading: false,
      rows: [],
      // true折叠 false展开
      isFold: this.defaultIsFold,
      pageQuery: {
        pageNum: 1,
        pageSize: 10
      },
      total: undefined,
      tableBodyEl: null,
      currentScrollLeft: 0,
      currentX: 0,
    }
  },
  created() {
    this.activeSearchForm = this._defaultSearchForm = { ...this.searchForm }
    this.autoFetch && this.playLoadData()
  },
  mounted() {
    this.listenTableDOM()
  },
  beforeDestroy() {
    this.tableBodyEl.removeEventListener('mousedown', this.handlerMouseDown)
    document.body.removeEventListener('mouseup', this.handleMouseUp)
  },
  methods: {
    setActiveSearchForm(form) {
      this.activeSearchForm = {...form}
    },
    playLoadData() {
      if (this.loading) return
      let searchForm = { ...this.activeSearchForm }
      if (this.beforePlayLoad) {
        searchForm = this.beforePlayLoad(searchForm)
      }

      for (const key of Object.keys(searchForm)) {
        const value = searchForm[key]
        if (Array.isArray(value)) {
          searchForm[key] = value.join(',')
        }
      }

      if (searchForm.dateRange) {
        searchForm.createTimeStart = searchForm.dateRange.split(',')[0]
        searchForm.createTimeEnd = searchForm.dateRange.split(',')[1]
        delete searchForm.dateRange
      }
      searchForm = removeEmptyItem(searchForm)
      const query = Object.assign({}, searchForm, this.pageQuery);

      this.loading = true;
      this.requestFunc(query).then(res => {
        let { data, result } = res
        if (data) {
          this.rows = data;
        }

        if (result) {
          this.rows = result.records || result.data || result;
          const total = result.total
          if (total) {
            this.total = Number(total);
          }
        }
      })
        .finally(() => {
          this.loading = false;
        });

    },
    handleSearch() {
      this.$refs.searchForm.validate(valid => {
        if (!valid) return
        this.pageQuery.pageNum = 1
        this.activeSearchForm = { ...this.searchForm }
        this.playLoadData()
        // this.$refs.searchForm.validate((valid) => {
        //   if (valid) {
        //     // TODO
        //   } else {
        //     // TODO
        //   }
        // });
      })
    },
    handleReset() {
      this.$refs.searchForm.resetFields()
    },
    listenTableDOM() {
      this.tableBodyEl = this.$refs.table.$el.getElementsByClassName('el-table__body-wrapper')[0]

      this.tableBodyEl.addEventListener('mousedown', this.handlerMouseDown)
      document.body.addEventListener('mouseup', this.handleMouseUp)
    },
    handleMouseUp(e) {
      document.body.style.userSelect = 'text'
      document.body.style.cursor = 'auto'
      this.tableBodyEl.removeEventListener('mousemove', this.handlerMouseMove)
    },
    handlerMouseDown(e) {
      document.body.style.cursor = 'move'
      this.currentScrollLeft = this.tableBodyEl.scrollLeft
      this.currentX = e.clientX
      this.tableBodyEl.addEventListener('mousemove', this.handlerMouseMove)
    },
    handlerMouseMove(e) {
      document.body.style.userSelect = 'none'
      this.tableBodyEl.scrollTo(this.currentScrollLeft + (this.currentX - e.clientX), 0)
    }
  }
};
</script>

<style lang="less" scoped>
.btns {
  display: flex;
  padding: 20px 0;

  .left, .right {
    flex: 1;
  }

  .right {
    text-align: right;
  }
}
</style>