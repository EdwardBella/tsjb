<template>
  <card>
    <div slot="content" v-loading="loading">
      <hierarchy
        :tree="tree"
        @showDialog="handleShowDialog"
        @delete="handleDelete"
        @prev="handlePrev"
        @next="handleNext"
      ></hierarchy>

      <addItemdetailDialog
        @success="handleAddSuccess"
        :visible.sync="addItemdetailDialog.visible"
        :type="addItemdetailDialog.type"
        :node="currentNode"
      ></addItemdetailDialog>

      <addItemcategoryDialog
        @success="handleAddSuccess"
        :visible.sync="addItemcategoryDialog.visible"
        :type="addItemcategoryDialog.type"
        :node="currentNode"
      ></addItemcategoryDialog>
    </div>
  </card>
</template>

<script>
import card from "@/components/card/index.vue";
import hierarchy from "@/components/hierarchy/tree";
import addItemdetailDialog from "./components/addItemdetailDialog";
import addItemcategoryDialog from "./components/addItemcategoryDialog";
import * as mattersApi from "@/api/matters";
import { deleteItemcategory, upItemcategory, upItemdetail } from "../../api/matters";

export default {
  name: "matters",
  components: { hierarchy, addItemdetailDialog, addItemcategoryDialog, card },
  data() {
    return {
      loading: true,
      tree: [],
      addItemdetailDialog: {
        type: 1,  // 1.添加， 2.编辑
        visible: false
      },
      addItemcategoryDialog: {
        type: 1,  // 1.添加， 2.编辑
        visible: false
      },
      currentNode: {}
    }
  },
  created() {
    this.getItemdetailTree()
  },
  methods: {
    handleShowDialog(e) {
      const { node, type, level } = e
      let dialog
      if (level === 1 || (level === 2 && type === 2)) {
        dialog = 'addItemcategoryDialog'
      } else {
        dialog = 'addItemdetailDialog'
      }
      this.currentNode = node
      this[dialog].visible = true
      this[dialog].type = type
    },
    getItemdetailTree() {
      this.loading = true
      mattersApi.itemdetailTree().then(res => {
        const result = res.result
        this.tree = [
          {
            id: result.id,
            name: result.name,
            sort: result.sort,
            itemDetailList: result.categoryList
          }
        ]
      })
      .finally(() => {
        this.loading = false
      })
    },
    handleAddSuccess() {
      this.getItemdetailTree()
    },
    handleDelete(e) {
      const {id, level, index} = e
      const promise = mattersApi[level === 2 ? 'deleteItemcategory' : 'deleteItemdetail']
      promise(id)
      .then(res => {
        this.$modal.msgSuccess('删除成功')
        this.getItemdetailTree()
      })
    },
    handlePrev({ node, level, index }) {
      const promise = level === 2 ? mattersApi.upItemcategory : mattersApi.upItemdetail
      promise(node.id).then(res => {
        this.getItemdetailTree()
      })
    },
    handleNext({ node, level, index }) {
      const promise = level === 2 ? mattersApi.downItemcategory : mattersApi.downItemdetail
      promise(node.id).then(res => {
        this.getItemdetailTree()
      })
    },
  }
};
</script>

<style scoped>

</style>