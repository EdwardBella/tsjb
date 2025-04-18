<template>
  <div v-loading="loading">
    <div class="header">
      <div>行政区划名称</div>
      <div>主管单位</div>
      <div>操作</div>
    </div>
    <tree
      :tree="tree"
      @next="handleNext"
      @prev="handlePrev"
      @del="handleDel"
      @edit="handleShowEditDialog('addLowerLevelDialog', $event.node)"
      @showAddLowerLevelDialog="handleShowAddDialog('addLowerLevelDialog', $event.node)"
      @showSetCompetentDepartmentDialog="handleShowDialog('setCompetentDepartmentDialog', $event.node)"
    ></tree>

    <addLowerLevelDialog
      :visible.sync="addLowerLevelDialog.visible"
      :type="addLowerLevelDialog.type"
      :id="current.id"
      :name="current.name"
      :code="current.code"
      @success="getTree"></addLowerLevelDialog>

    <setCompetentDepartmentDialog
      :visible.sync="setCompetentDepartmentDialog.visible"
      :id="current.id"
      :leaderDepartmentCode="current.leaderDepartmentCode"
      :leaderDepartmentName="current.leaderDepartmentName"
      @success="getTree"></setCompetentDepartmentDialog>
  </div>
</template>

<script>
import tree from './tree'
import * as administrativeDivision from "@/api/administrativeDivision";
import * as mixins from "@/utils/mixins"
import addLowerLevelDialog from "@/views/system/components/addLowerLevelDialog";
import setCompetentDepartmentDialog from "@/views/system/components/setCompetentDepartmentDialog";

export default {
  name: "index",
  mixins: [mixins.affirm],
  components: { tree, addLowerLevelDialog, setCompetentDepartmentDialog },
  data() {
    return {
      loading: true,
      tree: [],
      current: {},
      addLowerLevelDialog: { visible: false, type: 'add' },
      setCompetentDepartmentDialog: { visible: false, },
    }
  },
  created() {
    this.getTree()
  },

  methods: {
    getTree() {
      this.loading = true
      return administrativeDivision.tree().then(res => {
        this.tree = [res.result]
      })
      .finally(() => {
        this.loading = false
      })
    },
    handleShowEditDialog(dialog, node) {
      this[dialog].type = 'edit'
      this.handleShowDialog('addLowerLevelDialog', node)
    },
    handleShowAddDialog(dialog, node) {
      this[dialog].type = 'add'
      this.handleShowDialog('addLowerLevelDialog', node)
    },
    handleShowDialog(dialog, current) {
      this.current = current
      this[dialog].visible = true
    },
    handleAddSuccess() {
      this.getTree()
    },
    handleDelete(e) {
      const {id, level, index} = e
      this.loading = true
      administrativeDivision.del(id)
        .then(res => {
          this.$modal.msgSuccess('删除成功')
          return this.getTree()
        })
      .finally(() => this.loading = false)
    },
    handlePrev({ node, level, index }) {
      this.loading = true
      administrativeDivision.up(node.id).then(res => this.getTree()).finally(() => this.loading = false)
    },
    handleNext({ node, level, index }) {
      this.loading = true
      administrativeDivision.down(node.id).then(res => this.getTree()).finally(() => this.loading = false)
    },
    handleDel({node}) {
      this.confirm('确认删除吗？')
      .then(() => {
        this.loading = true
        return administrativeDivision.del(node.id)
      })
      .then(() => this.getTree())
      .finally(() => this.loading = false)
    }
  }
};
</script>

<style lang="less" scoped>
.header {
  //margin: 0 -30px 0 -30px;
  padding: 6px 0;
  background-color: #f5f9ff;
  height: 40px;
  line-height: 40px;
  display: flex;
  font-weight: 600;
  text-align: left;
  color: #666666;
  letter-spacing: 1px;
  margin-bottom: 14px;

  & > div {
    box-sizing: border-box;
    padding: 0 10px;
    width: calc(100% / 3);

    //&:first-child {
    //  width: 285px;
    //}
    //
    //&:last-child,
    //&:nth-child(2) {
    //  width: 167.5px;
    //}
    //
    &:last-child {
      min-width: 420px;
    }
  }


}
</style>