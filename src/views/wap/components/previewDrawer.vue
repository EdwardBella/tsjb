<template>
  <drawer title="预览" :visible="visible" @close="$emit('update:visible', false)">
    <div v-loading="loading">
      <iframe :src="previewURL" width="100%" style="height: 70vh" allowfullscreen></iframe>
    </div>
  </drawer>
</template>

<script>
import drawer from '@/views/wap/components/drawer'
import 'video.js/dist/video-js.min.css'
import * as fileAPI from '@/api/file'
import { Base64 } from 'js-base64'

export default {
  name: 'previewDrawer',
  components: { drawer },
  props: {
    filePath: { type: String, default: '' },
    visible: { type: Boolean, default: false }
  },
  data() {
    return {
      loading: false,
      fileType: '',
      previewURL: ''
    }
  },
  watch: {
    visible() {
      this.visible ? this.show() : this.hide()
    }
  },
  methods: {
    async show() {
      const fileURLSplit = this.filePath.split('.')
      this.fileType = fileURLSplit[fileURLSplit.length - 1]

      const baseURL = (gdosComplainFastdfsPath.indexOf('http') > -1 ? gdosComplainFastdfsPath : (`${window.location.protocol}//${window.location.host}${window.gdosComplainFastdfsPath}`))
      const baseFullURL = (gdosComplainFastdfsFullPath.indexOf('http') > -1 ? gdosComplainFastdfsFullPath : (`${window.location.protocol}//${window.location.host}${window.gdosComplainFastdfsFullPath}`))
      const previewBaseURL = (gdosComplainPreview.indexOf('http') > -1 ? gdosComplainPreview : (`${window.location.protocol}//${window.location.host}${window.gdosComplainPreview}`))
      let originURL = baseFullURL + '/' + this.filePath

      if ('.bmp,.jpg,.jpeg,.png,.tif,.gif,.mov,.avi,.mp4,.wmv,.rmvb'.includes(this.fileType)) {
        originURL = baseURL + '/' + this.filePath
      }

      if ('mov,avi,wmv,rmvb,mp4'.includes(this.fileType)) {
        // 采用原生预览
        if (this.fileType === 'mp4') {
          this.previewURL = originURL
        } else {
          this.loading = true
          const res = await fileAPI.convert2mp4({ originUrl: baseFullURL + '/' + this.filePath }).finally(() => this.loading = false)
          this.previewURL = baseURL + '/' + res.data
        }
      } else {
        if ('tif'.includes(this.fileType)) {
          this.loading = true
          const res = await fileAPI.tif2png({ originUrl: baseFullURL + '/' + this.filePath }).finally(() => this.loading = false)
          originURL = baseURL + '/' + res.data
        }
        this.previewURL = `${previewBaseURL}/onlinePreview?url=${encodeURIComponent(Base64.encode(originURL))}`
      }

    },
    hide() {
      this.previewURL = ''
    },
  }
}
</script>

<style lang="less">
iframe {
  border: none;
}
</style>