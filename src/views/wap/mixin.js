export const iframe = {
  data() {
    return {
      listenerPostMessageFnMap: {}
    }
  },
  methods: {
    postMessageEventListener(e) {
      if (e.data && e.data.name) {
        console.info('[接受消息 cms -> 投书举报]', e.data.data)
        if (this.listenerPostMessageFnMap[e.data.name]) {
          this.listenerPostMessageFnMap[e.data.name](e.data.data)
          window.removeEventListener('message', this.postMessageEventListener)
        }
      }
    },
    addListenerPostMessage(type, callback) {
      this.listenerPostMessageFnMap[type] = callback
    },
    postMessage(obj) {
      console.info('[发送消息 投书举报 -> cms]', obj)
      window.parent.postMessage(obj, '*')
    },
    openFullIframe(url, needLogin = false) {
      const { origin, pathname } = window.location
      url = `${origin}${pathname}#${url}`
      this.postMessage({
        name: 'getOnlyIframePage',
        data: { url, isLogin: needLogin }
      })
    },
    checkIsCertification(url) {
      this.postMessage({
          name: 'isCertification',
          data: {
            detailId:'',
            url,
            buttonType:'',
          },
        })
    },
    backIndex() {
      this.postMessage({
        name: 'goBackEntrancePage',
        data: {},
      })
    },
    backPersonCenter() {
      this.postMessage({
        name: 'goBackPersonCenterPage',
        data: {},
      })
    },
    postUserInfo() {
      this.postMessage({
        name: 'cmsUserInfo',
        data: {},
        replay: true
      })
    }
  }
}

let routerMap = {

}
export const router = {
  data() {
    return {
      routerMap: {}
    }
  },

  beforeRouteEnter(to, from, next) {
    if (routerMap[to.path] === undefined) {
      routerMap[to.path] = from.path !== '/'
    }

    next()
  },
  created() {
    this.routerMap = routerMap

    console.log(this.$route.path, this.routerMap, 'this.hasPrevRouter')
  }
}