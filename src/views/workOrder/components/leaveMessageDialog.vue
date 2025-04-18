<template>
  <el-dialog append-to-body
    :title="`全部留言(${total})`"
    width="640px"
    top="20px"
    :visible="visible"
    @close="handleClose"
  >
    <warp :loading="loading" :noData="list.length === 0">
      <ul ref="messages" class="light-blue-box messages">
        <li v-for="(item, $index) in list">
          <div class="header">
            <span class="name ellipsis" :title="item.publishUsername">{{ item.publishUsername }}</span>
            <span class="type">
              {{ item.parentCommentId > 0 ? "回复" : "评论" }}
            </span>
            <span v-if="item.parentCommentId > 0" class="name ellipsis" :title="item.parentPublishUsername">{{ item.parentPublishUsername }}</span>
            <span class="time">{{ item.createTime }}</span>
            <span v-if="type === 'all' || item.createUser === accountId" @click="handleDelete(item, $index)" class="color-primary pointer" style="margin-right: 10px">删除</span>
            <span @click="handleSetReplayObject(item)" class="color-primary pointer">回复</span>
          </div>
          <div class="content">{{ item.comment }}</div>
          <div class="split" style="margin: 0 -10px"></div>
        </li>
      </ul>
    </warp>

    <div class="split" style="margin-bottom: 30px"></div>

    <div class="footer">
      <el-input v-model="form.comment" placeholder="请输入留言内容" maxlength="300" style="flex: 1; margin-right: 10px">
        <template v-if="replayObject.publishUsername" slot="prepend">
          <div class="ellipsis" style="max-width: 120px;" :title="replayObject.publishUsername">回复 {{ replayObject.publishUsername }}</div>
        </template>
      </el-input>
      <el-button @click="handleReplay" :loading="submitting" :disabled="form.comment.length === 0" type="primary" style="width: 140px;">留言</el-button>
      <el-button @click="handleClose" type="primary" plain>关闭</el-button>
    </div>
  </el-dialog>
</template>

<script>
import * as leaveMessageApi from "@/api/leaveMessage";
import * as minix from "@/utils/mixins";
import { list } from "@/api/leaveMessage";

export default {
  name: "leaveMessageDialog",
  mixins: [minix.loading],
  props: ['visible', 'workOrderNo', 'canDelete', 'type', 'id'],
  data() {
    return {
      loading: false,
      moreLoading: false,
      list: [],
      replayObject: {},
      submitting: false,
      form: {
        comment: ""
      },
      query: {
        pageNum: 1,
        pageSize: 20
      },
      total: 0,
      accountId: ''
    };
  },
  watch: {
    visible(val) {
      if (val) {
        this.loading = true
        this.playLoadData()
          .then(() => {
            this.$emit("read");
            this.$nextTick(() => {
              this.$refs.messages && this.$refs.messages.addEventListener("scroll", this.handleScroll, false);
            })
          });
      } else {
        this.query.pageNum = 1
        this.list = [];
        this.clearForm();
        this.$refs.messages && this.$refs.messages.removeEventListener("scroll", this.handleScroll, false);
      }
    }
  },
  created() {
    this.accountId = JSON.parse(localStorage.getItem('accountToken')).accountId
  },
  methods: {
    playLoadData() {
      return leaveMessageApi.list({ workOrderNo: this.workOrderNo, id: this.id, ...this.query })
        .then(res => {
          const { records, total } = res.result;
          if (this.query.pageNum === 1) {
            this.list = [];
          }
          this.list = this.list.concat(records);
          this.total = Number(total);
        })
      .finally(() => {
        this.loading = false
        this.moreLoading = false
      })
    },
    handleScroll(e) {
      // debugger
      const el = this.$refs.messages;
      const scrollTop = el.scrollTop || el.scrollTop;

      const height = el.clientHeight || el.clientHeight;

      const scrollHeight = el.scrollHeight || el.scrollHeight;

      if (scrollTop + height >= scrollHeight - 100) {
        if (this.list.length < this.total && !this.moreLoading) {
          this.query.pageNum++
          this.moreLoading = true
          this.playLoadData()
        }
      }
    },
    handleClose() {
      this.$emit("update:visible", false);
    },
    handleSetReplayObject(item) {
      this.replayObject = { ...item };
    },
    handleReplay() {
      const form = { ...this.form };
      form.workOrderNo = this.workOrderNo;
      form.publishusername = localStorage.getItem("accountName");
      const replayObject = this.replayObject
      let promise = leaveMessageApi.add
      if (replayObject.publishUsername) {
        form.parentCommentId = replayObject.id
        form.parentPublishUsername = replayObject.publishUsername
        promise = leaveMessageApi.feedback;
      }
      this.decorateLoading(() => promise(form)
          .then(res => {
            this.clearForm();
            this.query.pageNum = 1;
            this.loading = true
            this.playLoadData()
              .then(() => {
                this.$refs.messages.scrollTop = 0;
              });
          })
        , "submitting");
    },
    clearForm() {
      this.replayObject = {};
      this.form.comment = "";
    },
    handleDelete(item, index) {
      this.$confirm("是否确认删除", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          return leaveMessageApi[this.type === 'all' ? 'del' : 'delMy'](item.id);

        })
        .then(res => {
          // debugger
          console.log(this.list)
          this.list.splice(index, 1)
          console.log(this.list)
          // this.playLoadData()
        });
    }
  }
};
</script>

<style lang="less" scoped>
.messages {
  max-height: 60vh;
  overflow: auto;
  padding-bottom: 0;

  li {
    margin-bottom: 20px;
  }

  .header {
    display: flex;
    align-items: center;

    span {
      line-height: 20px;
      flex-grow: 0;
    }

    .name {
      display: inline-block;
      max-width: 120px;
      font-weight: 600;
      color: @color-primary-light;
    }

    .type {
      margin: 0 10px;
      color: #323232;
    }

    .time {
      margin-right: 40px;
      flex: 1;
      font-size: 12px;
      text-align: right;
      color: #cccccc;
    }
  }

  .content {
    line-height: 20px;
    color: #666666;
    margin: 10px 0 20px 0;
  }
}

.footer {
  display: flex;
}
</style>