<template>
  <warp title="我的投诉举报详情" :loading="loading" :hasPrevRoute="routerMap[$route.path]">
    <template v-if="canComment" v-slot:right>
      <i @click="levelMessage.visible = true" class="message el-icon-chat-dot-square"></i>
    </template>
    <div class="complain-details-warp">
      <div v-if="[5, 6].includes(details.status) && !hasWorkOrderAppraise" class="tips">请您阅读后对我们的处理结果进行评价。</div>
      <div class="base-info spacer-line">
        <div class="title">{{ details.title }}</div>
        <div style="display: flex; justify-content: space-between; align-items: center">
          <span v-if="details.status === 0" class="label success">待受理</span>
          <span v-if="(details.status >= 1 && details.status <= 4) || details.status === 7" class="label success">受理中</span>
          <template v-if="details.status === 5">
            <span v-if="details.appraiseStatus === 'N'" class="label success">待评价</span>
            <span v-else class="label success">已办结</span>
          </template>
          <span v-if="details.status === 6" class="label success">不受理</span>
          <span v-if="details.status === 9" class="label success">撤回中</span>
          <span v-if="details.status === 10" class="label success">已撤回</span>

          <span v-if="details.status === 0" @click="recallDrawer.visible = true" class="color-primary" style="flex-shrink: 0; margin-left: 8px;">撤回投诉举报案件</span>
<!--          <span  @click="reconsiderationDrawer.visible = true" class="color-primary" style="flex-shrink: 0; margin-left: 8px;">复议</span>-->
          <span v-if="details.status === 6 && !details.repeatCheck" @click="reconsiderationDrawer.visible = true" class="color-primary" style="flex-shrink: 0; margin-left: 8px;">复议</span>
        </div>
      </div>

      <div class="key-values spacer-line">
        <div class="key-value-item">
          <div class="key title">基本信息</div>
          <div class="value"></div>
        </div>

        <div class="key-value-item">
          <div class="key">案件编号</div>
          <div class="value">{{ details.workOrderNumber || '-' }}</div>
        </div>

        <div class="key-value-item">
          <div class="key">案件类型</div>
          <div class="value">{{ details.itemDetailName }}</div>
        </div>

        <div class="key-value-item">
          <div class="key">案件来源</div>
          <div class="value">{{ details.itemSource | workOrderEventSource }}</div>
        </div>

        <div class="key-value-item">
          <div class="key">主管单位</div>
          <div class="value">{{ details.acceptDepartment }}</div>
        </div>

        <div class="key-value-item">
          <div class="key">办结时间</div>
          <div class="value">{{ workOrderProcessResult.createTime || "-" }}</div>
        </div>

        <div class="key-value-item">
          <div class="key">案件状态</div>
          <div class="value">
            <span v-if="details.status === 0">待受理</span>
            <span v-if="(details.status >= 1 && details.status <= 4) || details.status === 7">受理中</span>
            <template v-if="details.status === 5">
              <span v-if="details.appraiseStatus === 'N'">待评价</span>
              <span v-else>已办结</span>
            </template>
            <span v-if="details.status === 6">不受理</span>
            <span v-if="details.status === 8">已终止</span>
          </div>
        </div>
        <div class="key-value-item">
          <div class="key">立案时间</div>
          <div class="value">{{ details.filingTime || "-" }}</div>
        </div>

        <div class="key-value-item">
          <div class="key">事发地</div>
          <div class="value">{{ details.address }}</div>
        </div>

        <div class="key-value-item">
          <div class="key">承办单位</div>
          <div class="value">{{ details.processDepartment || "-" }}</div>
        </div>

        <div class="key-value-item">
          <div class="key">案件类型</div>
          <div class="value">{{ details.itemDetailName }}</div>
        </div>

        <div class="key-value-item">
          <div class="key">通讯地址</div>
          <div class="value">{{ details.mailAddress }}</div>
        </div>

        <div class="key-value-item">
          <div class="key">实际用时</div>
          <div class="value">
            <template v-if="!details.actualProcessDay">-</template>
            <template v-else>{{ timeFormatDHMS(Number(details.actualProcessDay) * 1000) }}</template>
          </div>
        </div>

        <div class="key-value-item">
          <div class="key">公开状态</div>
          <div class="value">
            <template v-if="details.status < 4">-</template>
            <template v-else>
              {{ details.publicStatus | workOrderPublicStatus }}
            </template>
          </div>
        </div>

        <div class="key-value-item">
          <div class="key">涉及欠款</div>
          <div class="value">{{details.debtAmount ? '是' : '否'}}</div>
        </div>

        <div class="key-value-item">
          <div class="key">欠款金额</div>
          <div class="value">{{ details.debtAmount | money }}</div>
        </div>


        <div class="key-value-item">
          <div class="key">投诉对象</div>
          <div class="value">{{ details.addressDepartmentName }}</div>
        </div>

        <div class="key-value-item">
          <div class="key">发布时间</div>
          <div class="value">{{ details.createTime }}</div>
        </div>


        <div class="key-value-item">
          <div class="key">评价时间</div>
          <div class="value">{{ workOrderAppraise.createTime || "-" }}</div>
        </div>


      </div>

      <div class="key-values spacer-line">
        <div class="key-value-item">
          <div class="key title">举报信息</div>
          <div class="value">
            <template v-if="details.materialCorrectStatus === 0 && ![9, 10].includes(details.status)">
              <span class="color-gray" style="font-size: 12px;">（截止时间：{{details.lastCompleteTime}}）</span>
              <span @click="$router.push({path: '/wap/my/replenish', query: {id: details.id}})" class="color-primary">上传补正材料</span>
            </template>

          </div>
        </div>

        <div class="key-value-item">
          <div class="key">主要诉求</div>
          <div class="value" style="text-align: left;">
            <div v-html="txt2HTML(details.mainApply)"></div>
          </div>
        </div>
        <div class="key-value-item">
          <div class="key">事实与理由</div>
          <div class="value" style="text-align: left;">
            <div v-html="txt2HTML(details.factReason)"></div>
          </div>
        </div>

        <div v-for="(item, index) in details.attachmentList" :key="item.fileUrl" class="key-value-item">
          <div class="key">附件 {{ index + 1 }}</div>
          <div class="value" style="text-align: left">{{ item.fileName }}</div>
          <div class="operate color-primary" @click="handleDownload(item)">下载</div>
          <div class="operate color-primary" @click="handlePreview(item)">预览</div>
        </div>
      </div>

      <div class="key-values spacer-line">
        <div class="key-value-item">
          <div class="key title">通知书</div>
          <div class="value"></div>
        </div>
        <div v-for="(item, index) in details.wordAttachmentList" :key="item.fileUrl" class="key-value-item">
          <div class="key">通知书 {{ index + 1 }}</div>
          <div class="value" style="text-align: left">{{ item.fileName }}</div>
          <div class="operate color-primary" @click="handleDownload(item)">下载</div>
          <div class="operate color-primary" @click="handlePreview(item)">预览</div>
        </div>
      </div>

      <div v-if="details.workOrderSubmitFinishResult" class="key-values spacer-line">
        <div class="key-value-item">
          <div class="key title">办结信息</div>
          <div class="value"></div>
        </div>

        <div class="key-value-item">
          <div class="key" style="width: 110px;">提交处理类型</div>
          <div class="value">{{ workOrderSubmitFinishResult.reason }}</div>
        </div>

        <div class="key-value-item">
          <div class="key" style="width: 110px;">提交处理备注</div>
          <div class="value" style="text-align: left;">
            <div v-html="txt2HTML(workOrderSubmitFinishResult.comment)"></div>
          </div>
        </div>

<!--        <div v-for="(item, index) in workOrderSubmitFinishResult.attachmentList" :key="item.fileUrl" class="key-value-item">-->
<!--          <div class="key">附件 {{ index + 1 }}</div>-->
<!--          <div class="value" style="text-align: left">{{ item.fileName }}</div>-->
<!--          <div class="operate color-primary" @click="handleDownload(item)">下载</div>-->
<!--          <div class="operate color-primary" @click="handlePreview(item)">预览</div>-->
<!--        </div>-->
      </div>

      <div v-if="hasWorkOrderAppraise" class="key-values spacer-line">
        <div class="key-value-item">
          <div class="key title">评价信息</div>
          <div class="value"></div>
        </div>

        <div class="key-value-item">
          <div class="key">整体满意度</div>
          <div class="value">
            <startAppraise :value="workOrderAppraise.processEffectiveScore" readonly></startAppraise>
          </div>
        </div>

<!--        <div class="key-value-item">-->
<!--          <div class="key">处理时效性</div>-->
<!--          <div class="value">-->
<!--            <startAppraise :value="workOrderAppraise.processEffectiveScore" readonly></startAppraise>-->
<!--          </div>-->
<!--        </div>-->

<!--        <div class="key-value-item">-->
<!--          <div class="key">处理有效性</div>-->
<!--          <div class="value">-->
<!--            <startAppraise :value="workOrderAppraise.processEffectiveScore" readonly></startAppraise>-->
<!--          </div>-->
<!--        </div>-->

        <div class="key-value-item">
          <div class="key">评价内容</div>
          <div class="value" style="text-align: left;">
            <div v-html="txt2HTML(workOrderAppraise.comment)"></div>
          </div>
        </div>
      </div>

      <div v-if="[6].includes(details.status)" class="key-values spacer-line">
        <div class="key-value-item">
          <div class="key title">不受理信息</div>
          <div class="value"></div>
        </div>

        <div class="key-value-item">
          <div class="key">不受理原因</div>
          <div class="value">{{notAcceptedResult.reason}}</div>
        </div>

        <div class="key-value-item">
          <div class="key">不受理备注</div>
          <div class="value" style="text-align: left;">
            <div v-html="txt2HTML(notAcceptedResult.comment)"></div>
          </div>
        </div>
      </div>
    </div>


    <template v-if="canComment">
      <!-- 已办结待评价-->
      <div v-if="[5, 6].includes(details.status) && !hasWorkOrderAppraise" class="appraise-btn">
        <button class="full-button primary" @click="appraise.visible = true">发表评价</button>
      </div>
    </template>

    <!-- 不受理-->
    <!-- <div v-if="[6].includes(details.status)" class="appraise-btn">
      <button class="full-button primary" @click="$router.push({path: '/wap/createStep2', query: { workOrderId: details.id, id: details.itemDetailId }})">重新提交</button>
    </div> -->

    <drawer title="发表评价" :visible.sync="appraise.visible">
      <div class="appraise-form">
        <div>
          <div class="key required">整体满意度</div>
          <div class="value"><startAppraise v-model="appraiseForm.satisfiedScore"></startAppraise></div>
          <div>{{appraiseForm.satisfiedScore}}分</div>
        </div>
<!--        <div>-->
<!--          <div class="key required">处理时效性</div>-->
<!--          <div class="value"><startAppraise v-model="appraiseForm.processEffectiveScore"></startAppraise></div>-->
<!--          <div>{{appraiseForm.processEffectiveScore}}分</div>-->
<!--        </div>-->
<!--        <div>-->
<!--          <div class="key required">处理有效性</div>-->
<!--          <div class="value"><startAppraise v-model="appraiseForm.processAvailableScore"></startAppraise></div>-->
<!--          <div>{{appraiseForm.processAvailableScore}}分</div>-->
<!--        </div>-->
        <div style="display: block; margin-top: .2rem">
          <div class="key">评价内容</div>
          <div class="value">
            <textarea v-model="appraiseForm.comment" maxlength="1000" placeholder="请输入评价内容"></textarea>
          </div>
        </div>


        <button class="full-button primary" :disabled="appraise.submitting" @click="handleAppraise">评价</button>
      </div>
    </drawer>

    <drawer title="全部留言" :visible.sync="levelMessage.visible">
      <div class="comments-drawer">
        <scroll ref="commentsScroll" maxHeight="70vh">
          <ul v-loading="levelMessage.loading" class="comments">
            <template v-if="levelMessage.rows">
              <li v-for="(item, index) in levelMessage.rows" :key="item.id">
                <div class="info">
                  <span class="name">{{ item.publishUsername }}</span>
                  <span class="type">{{ item.parentCommentId > 0 ? '回复' : '评论' }}</span>
                  <span v-if="item.parentCommentId > 0" class="name">{{ item.parentPublishUsername }}</span>
                  <template v-if="![5, 6].includes(details.status)">
                    <span v-if="Number(item.createUser) === cmsUserInfo.userId" @click="handleDelComment(item.id, index)" class="color-danger" style="float: right; font-size: 0.26rem">删除</span>
                  </template>
                </div>
                <div class="content">{{ item.comment }}</div>
                <div class="footer">
                  <span class="time ">{{ item.createTime }}</span>
                  <span v-if="![5, 6].includes(details.status)" @click="handleSetReplay(item)" class="replay pointer color-primary">回复</span>
                </div>
              </li>
            </template>

            <template v-else>
              <li class="no-data">没有留言数据</li>
            </template>
          </ul>

        </scroll>
        <div v-if="![5, 6].includes(details.status)" class="footer">
          <div v-if="replayObject.publishUsername">回复 {{ replayObject.publishUsername }}</div>
          <input v-model="form.comment" type="text" maxlength="150">
          <button @click="handleComment">留言</button>
        </div>
      </div>
    </drawer>

    <reconsiderationDrawer :visible.sync="reconsiderationDrawer.visible" :workOrderId="details.id" @success="getDetails()"></reconsiderationDrawer>
    <previewDrawer :visible.sync="previewDrawer.visible" :filePath="previewDrawer.filePath"></previewDrawer>
    <recallDrawer :visible.sync="recallDrawer.visible" :workOrderId="details.id" @success="getDetails()"></recallDrawer>
    <iframe :src="downloadURL" style="border: none; height: 0;"></iframe>
  </warp>
</template>

<script>
import startAppraise from "@/components/startAppraise/index.vue";
import upload from '@/components/upload'
import warp from "@/views/wap/components/warp";
import scroll from "@/views/wap/components/scroll";
import * as portalsApi from "@/api/portals";
import { debounce, getCMSUserInfo, isEmpty } from '@/utils/common'
import {
  timeFormatDHMS,
  workOrderEventSource,
  txt2HTML,
  workOrderComplaintObjectType,
  money,
  workOrderPublicStatus
} from "@/utils/filters";
import drawer from "@/views/wap/components/drawer";
import previewDrawer from '@/views/wap/components/previewDrawer'
import recallDrawer from '@/views/wap/components/recallDrawer.vue'
import * as mixins from "@/views/wap/mixin";
import * as fileApi from "@/api/file";
import reconsiderationDrawer from "@/views/wap/components/reconsiderationDrawer.vue";

export default {
  name: "details",
  mixins: [mixins.router],
  components: { warp, drawer, scroll, startAppraise, previewDrawer, upload, recallDrawer, reconsiderationDrawer },
  filters: { workOrderEventSource, workOrderComplaintObjectType, money, workOrderPublicStatus },
  data() {
    return {
      canComment: false,
      loading: true,
      downloadURL: '',
      details: {},
      levelMessage: {
        visible: false,
        loading: false,
        rows: []
      },
      appraise: {
        visible: false,
        submitting: false,
      },
      replayObject: {},
      form: {
        comment: ""
      },
      cmsUserInfo: {},
      commentEmpty: false,
      appraiseForm: {
        "comment": "",
        "processAvailableScore": 0,
        "processEffectiveScore": 0,
        "satisfiedScore": 0
      },
      previewDrawer: {
        visible: false,
        filePath: ''
      },
      recallDrawer: {
        visible: false,
      },
      reconsiderationDrawer: {
        visible: false,
      },
      downloading: false,
    };
  },
  computed: {
    hasWorkOrderAppraise() {
      return Boolean(this.details.workOrderAppraise);
    },
    workOrderProcessResult() {
      return this.details.workOrderProcessResult || {};
    },
    workOrderAppraise() {
      return this.details.workOrderAppraise || {};
    },
    actualProcessDay() {
      const actualProcessDay = this.details.actualProcessDay;
      if (isEmpty(actualProcessDay)) return "-";
      return `${timeFormatDHMS(Number(actualProcessDay) * 1000)}`;
    },
    notAcceptedResult() {
      const processList = this.details.processList
      for (let i = processList.length - 1, min = 0; i > min; i--) {
        const item = processList[i]
        // 不受理
        if (item.operateType === '06') {
          return item
        }
      }
      return {}
    },
    workOrderSubmitFinishResult() {
      return this.details.workOrderSubmitFinishResult || {}
    }
  },
  watch: {
    "levelMessage.visible"() {
      this.getComments();
    }
  },
  created() {
    this.cmsUserInfo = getCMSUserInfo();
    this.getDetails().finally(() => this.loading = false)

    portalsApi.workOrder.configure({ type: 7 })
      .then(res => {
        this.canComment = res.result === '1'
      })
  },
  methods: {
    txt2HTML,
    timeFormatDHMS,
    getDetails() {

      return portalsApi.workOrder.detailsOfMyWorkOrder(this.$route.query.id, {
        idNumber: this.cmsUserInfo.idNumber,
        socialCreditNumber: this.cmsUserInfo.socialCreditNumber
      })
        .then(res => {
          this.details = res.result;
        });
    },
    getComments() {
      return portalsApi.workOrder.commentsOfMyWorkOrder(this.$route.query.id, {
        idNumber: this.cmsUserInfo.idNumber,
        socialCreditNumber: this.cmsUserInfo.socialCreditNumber
      })
        .then(res => {
          this.levelMessage.rows = res.result;
        });
    },
    // handleCommentInput() {
    //   console.log(this.form.comment)
    //   const comment = this.form.comment
    //   if (comment === '' && this.commentEmpty) {
    //     this.replayObject = {}
    //     this.commentEmpty = false
    //     return
    //   }
    //   if (comment === '') {
    //     this.commentEmpty = true
    //   }
    //
    // },
    handleSetReplay(item) {
      this.replayObject = { ...item };
    },
    handleComment() {
      const form = { ...this.form };
      if (form.comment.length === 0) return;
      const replayObject = this.replayObject;
      const cmsUserInfo = this.cmsUserInfo;
      form.createUser = cmsUserInfo.userId;
      form.publishUsername = cmsUserInfo.userName;
      form.idNumber = this.cmsUserInfo.idNumber
      form.socialCreditNumber = this.cmsUserInfo.socialCreditNumber
      form.workOrderId = this.$route.query.id;
      let promise = portalsApi.workOrder.addCommentOfMyWorkOrder;
      if (replayObject.publishUsername) {
        form.parentCommentId = replayObject.id;
        form.parentPublishUsername = replayObject.publishUsername;
        promise = portalsApi.workOrder.addFeedbackOfMyWorkOrder;
      }

      promise(form)
        .then(res => {
          this.form.comment = "";
          this.replayObject = {};
          return this.getComments();
        })
        .then(() => {
          this.$nextTick(() => this.$refs.commentsScroll.toBottom());
        });
    },
    handleAppraise() {
      const form = {...this.appraiseForm}

      if (!form.satisfiedScore) return this.$modal.msgError('请打分整体满意度')
      // if (!form.processEffectiveScore) return this.$modal.msgError('请打分处理时效性')
      // if (!form.processAvailableScore) return this.$modal.msgError('请打分处理有效性')

      const cmsUserInfo = getCMSUserInfo()
      form.createUser = cmsUserInfo.userId
      form.createUsername = cmsUserInfo.userName
      form.workOrderId = this.$route.query.id
      form.idNumber = this.cmsUserInfo.idNumber
      form.socialCreditNumber = this.cmsUserInfo.socialCreditNumber

      if (this.appraise.submitting) return
      this.appraise.submitting = true
      return portalsApi.workOrder.appraise(form)
        .then(() => this.getDetails())
        .then(() => {
          this.appraise.submitting = false
          this.appraise.visible = false
        })
    },

    handleDelComment(id, index) {
      portalsApi.workOrder.cancelComments({id})
      .then(res => {
        this.levelMessage.rows.splice(index, 1)
      })
    },

    handleDownload(row) {
      if (this.downloading) return
      this.downloading = true
      this.downloadURL = fileApi.download({
        downloadFileName: row.fileName,
        filePath: row.fileUrl
      }, false) + `&_=${Math.random()}`
      setTimeout(() => {
        this.downloading = false
      }, 500)
    },

    handlePreview(row) {
      this.previewDrawer = {
        visible: true,
        filePath: row.fileUrl
      }
    },
    handleUploadSuccess(file) {
      // const file = fileList[fileList.length - 1]
      const cmsUserInfo = getCMSUserInfo()
      const data = {
        attachmentList: [file],
        id: this.details.id,
        createUserId: cmsUserInfo.userId
      }
      portalsApi.workOrder.addAttachment(data)
        .then(() => {
          this.details.attachmentList.push(file)
          this.$modal.msgSuccess('上传成功')
        })
    }
  }
};
</script>

<style lang="less" scoped>
.complain-details-warp {
  padding-bottom: 1rem;
}


.message {
  font-size: .34rem;
  color: #fff;
}

.tips {
  margin: 0;
  text-align: center;
  color: #1B82D2;
  background-color: #e9f3fb;
  border-bottom: 1px solid #bbdaf2;
  padding: .1rem 0;
}

.comments-drawer {
  .comments {
    min-height: 70vh;

    li {
      padding-bottom: .2rem;
      margin-bottom: .2rem;
      border-bottom: 1px solid #f2f2f2;


      .info {
        .type {
          margin: 0 .2rem;
          color: #1B82D2;
        }
      }

      .content {
        margin-top: .2rem;
      }

      .footer {
        margin-top: .2rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: .26rem;
      }
    }
  }

  .footer {
    padding-top: .2rem;
    background-color: #fff;
    display: flex;
    align-items: center;

    input {
      height: .6rem;
      padding: 0 .2rem;
      box-sizing: border-box;
      flex: 1;
      border-radius: 3px;
      margin-left: .1rem;
      border: 1px solid #efefef;
    }

    button {
      background-color: @color-primary;
      color: #fff;
      border-radius: 3px;
      border: none;
      padding: 0 .2rem;
      height: .6rem;
      margin-left: .2rem;
    }

  }
}

.appraise-btn {
  background-color: #fff;
  padding: .2rem;
  box-sizing: border-box;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;

  button {
    margin: 0;
  }
}

.appraise-form {
  & > div {
    margin-bottom: .2rem;
    display: flex;
    align-items: center;
    //justify-content: space-between;
    width: 100%;

    .key {
      width: 2rem;

      &::before {
        display: inline-block;
        width: 10px;
        content: "*";
        color: @color-danger;
        opacity: 0;
        margin-right: .1rem;
      }

      &.required::before {
        opacity: 1;
      }
    }

    .value {
      flex: 1;
    }

    textarea {
      margin-top: .1rem;
      width: calc(100% - 10px);
      margin-left: 10px;
      box-sizing: border-box;
      height: 2.5rem;
      border: 1px solid #efefef;
    }
  }

  .full-button {
    margin: 0;
  }
}

</style>

<style lang="less">
.appraise-form {
  .start-appraise {
    top: 8px;
  }
}
</style>
