<template>
  <warp title="我要投诉">
    <div class="content">
      <div class="title">第一步 选择案件类型 </div>
      <button class="select-btn" @click="pickerVisible = true">
        {{ `${itemDetailId ? "重新选择" : "选择投诉举报事项"}` }}
      </button>

      <div class="details" >
        <div class="key-value">
          <div><span>投诉举报事项:</span> <span><b>{{ itemdetail.name }}</b></span></div>
        </div>
        <div class="explain" v-html="txt2HTML(getTextHtml)"></div>
      </div>

      <div class="checkbox" v-if="hasItemDetails">
        <input v-model="isAgree" id="agree" type="checkbox">
        <label for="agree">我已阅读</label>
      </div>

      <div style="text-align: center; margin-top: 20px;" v-if="timing">请仔细阅读举报须知！{{sec}}s</div>

      <button class="next-btn" :disabled="isAgree === false || timing" @click="$router.push({path: '/wap/createStep2',query: { id: itemDetailId }})">下一步</button>

      <VuePicker
        v-if="pickData.length"
        :data="pickData"
        :layer="2"
        :showToolbar="true"
        @cancel="cancel"
        @confirm="confirm"
        :visible.sync="pickerVisible"
      />
    </div>
  </warp>
</template>


<script>
import VuePicker from "vue-pickers";
import * as portalsApi from "@/api/portals";
import { getCMSUserInfo, isEmpty } from '@/utils/common'
import { txt2HTML } from "@/utils/filters";
import warp from "@/views/wap/components/warp";
import * as mixins from '@/views/wap/mixin'
import { getDetail } from '@/api/pageInfoManage'

const sec = 20

export default {
  name: "createStep1",
  mixins: [mixins.iframe],
  components: { VuePicker, warp },
  data() {
    return {
      sec,
      getTextHtml: '',
      timing: false,
      isDraft: true,
      pickerVisible: false,
      itemDetailId: "",
      pickData: [],
      itemdetail: {},
      isAgree: false
    };
  },
  computed: {
    hasItemDetails() {
      return !isEmpty(this.itemdetail);
    }
  },
  beforeRouteEnter(to, from, next) {
    if (from.path === '/wap/createStep2') {
      next(vm => {
        vm.isDraft = false
        vm.form.itemDetailId = from.query.id
      })
      return
    }
    next()
  },
  mounted() {
    this.getDetailFun('投诉指南')
    clearInterval(this.timer)
    this.timing = true
    this.sec = sec
    this.timer = setInterval(() => {
      this.sec--
      if (this.sec === 0) {
        this.timing = false
        this.sec = sec
        clearInterval(this.timer)
      }
    }, 1000)
    this.getItemDetailTree();
    this.postUserInfo()
    window.addEventListener('message', this.postMessageEventListener, false)
    this.addListenerPostMessage("cmsUserInfo", this.saveCMSUserInfoToLocal);
    const loop = () => {
      console.log('loop', getCMSUserInfo())
      if (getCMSUserInfo().userId) {
        this.isDraft && this.fetchTemporaryStorage()
      } else {
        setTimeout(() => loop(), 100)
      }
    }
    loop()

  },
  methods: {
    txt2HTML,
    saveCMSUserInfoToLocal(data) {
      window.sessionStorage.setItem('cmsUserInfo', JSON.stringify(data))
    },
    fetchTemporaryStorage() {
      const cmsUserInfo = getCMSUserInfo()
      return portalsApi.workOrder.getTemporaryStorage({ createUserId: cmsUserInfo.userId })
        .then(res => {
          const result = res.result
          if (result) {
            this.$router.push({
              path: '/wap/createStep2',
              query: { id: result.itemDetailId }
            })
          }
        })
    },
    getItemDetailTree() {
      portalsApi.itemdetail.tree()
        .then(res => {
          this.pickData = this.coverItemdetailDataTopickData(res.result.categoryList);
        });
    },
    coverItemdetailDataTopickData(data) {
      return data.map((item) => {
        item.children = item.itemDetailList.map(item => {
          item.label = item.name;
          item.value = item.accept_department_code;
          return item;
        });
        item.label = item.name;
        item.value = item.id;
        return item;
      });
    },
    getItemDetail() {
      this.loading = true;
      portalsApi.itemdetail.details(this.itemDetailId)
        .then(res => {
          this.itemdetail = res.result;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    cancel() {
      console.log('cancel')
    },
    confirm(res) {
      console.log(res)
      if (res.length === 2) {
        const result = res[1]
        this.itemDetailId = result.id
        this.getItemDetail()
      }
    },
    //获取投诉举报指南
    getDetailFun(name) {
      let params = {
        name: name
      }
      getDetail(params).then(res => {
        const { code, msg, result } = res
        if (code == 0) {
          if (!result) return this.$modal.msgError({ duration: '1000', message: '获取失败，请联系管理员' })
          this.getTextHtml = result.content
          this.title = name
          // this.dialogVisible = true
        } else {
          this.$modal.msgError({ duration: '1000', message: msg })
        }
      }).catch(err => {
        return Promise.reject(err)
      })
    }
  }
};
</script>

<style lang="less" scoped>
.content {
  padding: .2rem;

  .title {
    text-align: center;
  }

  button {
    display: block;
    margin: 0 auto;
    height: .8rem;
    background: #0B5FD5;
    border-radius: 4px;
    color: #fff;
    border: none;
    padding: 0 .4rem;

    &[disabled] {
      background-color: rgba(9, 78, 197, 0.3);
    }
  }

  .select-btn {
    margin-top: .2rem;
  }

  .next-btn {
    margin-top: 1rem;
    width: 100%;
  }

  .checkbox {
    margin-top: .5rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .details {
    padding: .2rem 0;

    .explain {
      margin-top: .2rem;
    }
  }

}
</style>