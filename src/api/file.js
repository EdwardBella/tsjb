/**
 * 文件上传 API
 */

import axios from '@/utils/axios'

const baseURL = (gdosComplainDfs.indexOf('http') > -1 ? gdosComplainDfs : (`${window.location.protocol}//${window.location.host}${window.gdosComplainDfs}`))

// export const upload = (data, params) => axios({
//   url:  `${baseURL}/fileUpload/upload`,
//   method: 'POST',
//   headers: {
//     'Content-Type': 'multipart/form-data'
//   },
//   data,
//   params
// })

export const upload = (data, params) => axios({
  url:  `http://222.143.33.224:8091/complain-manage-inside/complain-manage-dfs/fileUpload/upload`,
  method: 'POST',
  headers: {
    'Content-Type': 'multipart/form-data'
  },
  data,
  params
})


export const download = (params, autoOpen = true) => {
  // window.open(`${gdosComplainDfs}/fileUpload/download?downloadFileName=${params.downloadFileName}&filePath=${params.filePath}`, '__black')
  // debugger
// ,;{}_+~!@#$%^&()_+
  const downloadFileName = params.downloadFileName.replace(/=|_|,|&|;|{|}|~|!|@|#|$|%|^/g, '')
  
  let url = `${baseURL}/fileUpload/download?filePath=${params.filePath}`

  if (autoOpen) {
    if (window.navigator.msSaveBlob) {
      axios.get(url, {
        responseType: 'blob'
      })
        .then(r => {
          const blob = new Blob([r.data])
          window.navigator.msSaveBlob(blob, downloadFileName);
        })
    } else {
      url += `&downloadFileName=${downloadFileName || ''}`
      window.open(url, '__black')
    }
  } else {
    url += `&downloadFileName=${downloadFileName || ''}`
  }
  return url

}

// 文件格式转换(视频转mp4, 目前确认支持MOV/avi/wmv/rmvb)
export const convert2mp4 = params => axios({
  url: `${baseURL}/fileConvert/video/convert2mp4`,
  method: 'POST',
  params
})

// 文件格式转换(tif转png)
export const tif2png = params => axios({
  url: `${baseURL}/fileConvert/image/tif2png`,
  method: 'POST',
  params
})

// 删除补正材料记录
export const delAttachment = params => axios({
  url: '/api/v1/workOrder/attachment/delete',
  method: 'POST',
  params
})

// 文件记录删除
export const remove = params => axios({
  url: `${baseURL}/filelog/delete`,
  method: 'GET',
  params
})

// 文件记录查询
export const query = params => axios({
  url: `${baseURL}/filelog/query`,
  method: 'GET',
  params
})



