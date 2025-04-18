<template>
  <warp title="公开详情" :loading="loading" :hasPrevRoute="routerMap[$route.path]">
    <div class="complain-details-warp">
      <div class="base-info spacer-line">
        <div class="title">{{ details.title }}</div>
        <span class="label success">已办结</span>
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
          <div class="key">通讯地址</div>
          <div class="value">{{ details.mailAddress }}</div>
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
            <span v-if="(details.status >= 1 && details.status <= 4)  || details.status === 7">受理中</span>
            <span v-if="details.status === 5">已办结</span>
            <span v-if="details.status === 6">不受理</span>
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

        <div class="key-value-item">
          <div class="key">欠款金额</div>
          <div class="value">{{ details.debtAmount | money }}</div>
        </div>
      </div>

      <div class="key-values spacer-line">
        <div class="key-value-item">
          <div class="key title">举报信息</div>
          <div class="value"></div>
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
          <div class="operate color-primary" @click="handlePreview(item)">预览</div>
          <div class="operate color-primary" @click="handleDownload(item)">下载</div>
        </div>
      </div>

      <div class="key-values spacer-line">
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
<!--          <div class="operate color-primary" @click="handlePreview(item)">预览</div>-->
<!--          <div class="operate color-primary" @click="handleDownload(item)">下载</div>-->
<!--        </div>-->
      </div>
      <previewDrawer :visible.sync="previewDrawer.visible" :filePath="previewDrawer.filePath"></previewDrawer>
      <iframe :src="downloadURL" style="border: none; height: 0; "></iframe>
    </div>
  </warp>
</template>

<script>
import warp from "@/views/wap/components/warp";
import previewDrawer from '@/views/wap/components/previewDrawer'
import * as portalsApi from "@/api/portals";
import { isEmpty, postPortalsHeight } from "@/utils/common";
import { timeFormatDHMS, workOrderEventSource, txt2HTML, workOrderComplaintObjectType, money } from '@/utils/filters'
import * as mixins from '@/views/wap/mixin'
import * as fileApi from "@/api/file";

export default {
  name: "details",
  mixins: [mixins.router],
  components: { warp, previewDrawer },
  filters: { workOrderEventSource, workOrderComplaintObjectType, money },
  data() {
    return {
      loading: true,
      downloadURL: '',
      details: {},
      previewDrawer: {
        visible: false,
        filePath: ''
      },
      downloading: false
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
    workOrderSubmitFinishResult() {
      return this.details.workOrderSubmitFinishResult || {}
    }
  },
  created() {
    this.getDetails();
  },
  methods: {
    txt2HTML,
    timeFormatDHMS,
    getDetails() {
      portalsApi.workOrder.details(this.$route.query.id)
        .then(res => {
          this.details = res.result;
        })
        .finally(() => this.loading = false);
      // .then(() => this.$nextTick(postPortalsHeight));
    },
    getComments() {
      this.commentsLoading = true;
      portalsApi.workOrder.comments(this.$route.query.id)
        .then(res => {
          this.comments = res.result;
        })
        .then(() => this.$nextTick(postPortalsHeight))
        .finally(() => this.commentsLoading = false);
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
    }
  }
};
</script>

<style lang="less" scoped>

</style>