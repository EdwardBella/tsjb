import {
	mapState
} from "vuex";

export const rolePermissionsMixin = {
	computed: {
		...mapState(['userRoles', 'userInfo']),
		isCurrentWorkWorkProcessor() {

			const processDepartmentCode = (() => {
				if (this.workOrderDetails && this.workOrderDetails.processDepartmentCode) return this
					.workOrderDetails.processDepartmentCode
				if (this.details && this.details.processDepartmentCode) return this.details
					.processDepartmentCode
				if (this.currentRow && this.currentRow.processDepartmentCode) return this.currentRow
					.processDepartmentCode
			})()

			console.log({
				userCode: this.userInfo.orgCode,
				processDepartmentCode
			})

			return this.userInfo.orgCode === processDepartmentCode
		},
		isLeaderDepartment() {
			return this.userRoles.isLeaderDepartment
		}
	},
}