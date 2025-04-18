<template>
	<LeftBar :options="menuTree"></LeftBar>
</template>
<script>
	import {
		mapState
	} from 'vuex'
	import LeftBar from './LeftBar.vue'
	import * as menuAPI from '@/api/menu'
	import {
		checkPermission
	} from '@/utils/common'

	export default {
		name: 'leftMenu',
		components: {
			LeftBar
		},
		data() {
			return {
				menuList: []
			}
		},
		computed: {
			...mapState(['hasUnreadRelay', 'menuTree'])
		},
		watch: {
			menuTree(val) {}
		},
		methods: {},
		created() {
			console.log(this.menuTree,'-----------------------')

			//  menuAPI.tree()
			//  .then(res => {
			//    const list = res.result
			// list.push({
			// 	id: 374,
			// 	ismenu: 1,
			// 	levels: 2,
			// 	name: "菜单管理",
			// 	num: 71,
			// 	parentId: 361,
			// 	url: "/system/menuManage"
			// })
			//    const tree = []
			//    const currentPath = this.$route.path
			//    let hasPermission = false   // 判断当前页面是否有权限

			//    if (list.length === 0) {
			//      this.$router.replace('noPermission')
			//      return
			//    }

			//    for (const node1 of list) {
			//      if (node1.levels === 1) {
			//        node1.children = []
			//        for (const node2 of list) {
			//          if (node1.id === node2.parentId) {
			//            node1.children.push(node2)
			//          }
			//        }
			//        if (node1.children.length === 0) delete node1.children
			//        tree.push(node1)
			//      }

			//      if (currentPath === node1.url) {
			//        hasPermission = true
			//      }
			//    }

			//    if (!hasPermission && !['/portals', '/404', 'noPermission'].find(item => currentPath.indexOf(item) > -1)) {
			//        const path = tree[0].url ? tree[0].url : tree[0].children[0].url
			//        this.$router.push(path)
			//    }
			//    this.menuList = tree
			//  })
		},
		mounted() {},
	};
</script>
<style lang="less" scoped>

</style>