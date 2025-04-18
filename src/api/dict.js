/**
 * 字典接口
 */

import axios from '@/utils/axios'


export const fileList = code => axios({
	url: `/api/v1/dict/sysDict/${code}`,
	method: 'GET',
})


export const getAuditStatusList = params => axios({
	url: '/api/v1/workOrder/audit/getAuditStatusList',
	method: 'GET',
	params
})


export const belongType = params => axios({
	url: '/api/v1/dict/treeByParentCode/belongType',
	method: 'GET',
	params
})

export const treeByParentCode = parentCode => axios({
	url: `/api/v1/dict/treeByParentCode/${parentCode}`,
	method: 'GET',
})

export const categoryList = params => axios({
	url: '/api/v1/dict/category/list',
	method: 'GET',
	params
})

export const list = params => axios({
	url: '/api/v1/dict/list',
	method: 'GET',
	params
})

export const details = id => axios({
	url: `/api/v1/dict/detail/${id}`,
	method: 'GET',
})

export const del = id => axios({
	url: `/api/v1/dict/delete/${id}`,
	method: 'POST',
})

export const add = data => axios({
	url: `/api/v1/dict/add`,
	method: 'POST',
	data
})