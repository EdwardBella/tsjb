<template>
  <div v-if="type === 'person'" class="portals-card">
    <div class="header">
      <div class="title">个人信息</div>
    </div>
    <el-form class="key-value" label-width="100px" label-suffix=":">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="创建人">{{ details.createUsername || "-" }}</el-form-item>
          <el-form-item label="姓名">{{ details.createUsername || "-" }}</el-form-item>
          <el-form-item label="身份证号">{{ details.createUsername || "-" }} <span class="color-success ml30">已认证</span></el-form-item>
          <el-form-item label="手机号">{{ details.createUsername || "-" }} <el-button @click="$router.push('/portals/my/modifyPhoneNumber')" class="ml30" plain type="primary" size="mini">修改手机号</el-button></el-form-item>
          <el-form-item label="联系地址">{{ details.createUsername || "-" }} </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item label="注册时间">{{ details.createUsername || "-" }}</el-form-item>
          <el-form-item label="性别">{{ details.createUsername || "-" }}</el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
  <div v-else class="portals-card">
    <div class="header">
      <div class="title">企业信息</div>
    </div>
    <el-form class="key-value" label-width="100px" label-suffix=":">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="用户类型">{{ details.createUsername || "-" }}</el-form-item>
          <el-form-item label="企业名称">{{ details.createUsername || "-" }}</el-form-item>
          <el-form-item label="法定代表人">{{ details.createUsername || "-" }}</el-form-item>
          <el-form-item label="企业地址">{{ details.createUsername || "-" }} </el-form-item>
          <el-form-item label="联系电话">{{ details.createUsername || "-" }} <el-button @click="$router.push('/portals/my/modifyPhoneNumber')" class="ml30" plain type="primary" size="mini">修改手机号</el-button></el-form-item>
          <el-form-item label="邮政编码">{{ details.createUsername || "-" }} </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item label="注册时间">{{ details.createUsername || "-" }}</el-form-item>
          <el-form-item label="统一社会信用代码">{{ details.createUsername || "-" }}  <span class="color-success ml30">已认证</span></el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import { postPortalsHeight } from "@/utils/common";

export default {
  name: "info",
  data() {
    return {
      details: {}
    }
  },
  computed: {
    type() {
      return this.$route.params.type
    }
  },
  created() {

  },
  mounted() {
    this.$nextTick(postPortalsHeight)
  }
};
</script>

<style scoped>

</style>