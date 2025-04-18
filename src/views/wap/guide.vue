<template>
  <warp title="投诉指南">
    <h1 class="title">投诉指南</h1>
    <div class="content" v-html="txt2HTML(getTextHtml)">
      <!-- <h3>一、举报主体</h3>

      <p>举报中心欢迎公民、法人或其他组织参与互联网违法和不良信息举报监督。</p>

      <h3>二、互联网违法和不良信息主要包括</h3>

      <p>1．危害国家安全、荣誉和利益的；</p>

      <p>2．煽动颠覆国家政权、推翻社会主义制度的；</p>

      <p>3．煽动分裂国家、破坏国家统一的；</p>

      <p>4．宣扬恐怖主义、极端主义的；</p>

      <p>5．宣扬民族仇恨、民族歧视的；</p>

      <p>6．传播暴力、淫秽色情信息的；</p>

      <p>7．编造、传播虚假信息扰乱经济秩序和社会秩序的；</p>

      <p>8．侵害他人名誉、隐私等合法权益的；</p>

      <p>9．互联网相关法律法规禁止的其他内容。</p>

      <h3>三、举报方式</h3>

      <p>1.登录举报中心官网https://www.12377.cn举报；</p>

      <p>2.下载安装“网络举报”客户端举报；</p>

      <p>3.关注举报中心官方微博“国家网信办举报中心”，点击“私信举报”；</p>

      <p>4.关注举报中心官方微信公众帐号“国家网信办举报中心”，点击“一键举报”；</p>

      <p>5.拨打12377举报热线举报；</p>

      <p>6.发送邮件至邮箱jubao@12377.cn举报。</p>

      <h3>四、举报材料及要件</h3>

      <p>举报互联网违法和不良信息时，举报主体应提供与网络举报事项相应的信息网址或者足以准确定位举报信息的相关说明、样本截图等举报基本材料，以及相关证明证据材料等举报要件。</p>

      <h3>五、举报协助处置</h3>

      <p>举报主体在网上成功提交举报信息后，将收到一个查询码，通过查询码，可以确认举报的信息已收到。举报中心受理的举报，将依据相关规定转交各地网信部门、相关网站或相关部门依法依规研处。</p>

      <h3>六、注意事项</h3>

      <p>1.举报主体应根据举报信息所属类别，选择相应类别的举报入口提交举报。若选择类别错误，所提交的举报可能无效。</p>

      <p>2.举报主体无需重复提交举报内容。为保障举报主体的合法权益，限制恶意重复举报，提高网上举报的运行效益，每位举报主体24小时内原则上最多举报50次，超过50次将无法举报成功。</p>

      <p>3.网络侵权信息举报请通过“侵权类”举报入口提交，举报人须实名举报。</p>

      <p>4.有待查证辟谣的网络谣言线索，请提交至“中国互联网联合辟谣平台”。</p>

      <p>5.举报主体应对举报事项的客观性、真实性负责。对于借举报故意捏造事实、诬告陷害，伪造举报证据的，或以举报为名制造事端，干扰国家机关正常工作的，将依法承担相应的法律责任。</p> -->
    </div>
  </warp>
</template>

<script>
import warp from "@/views/wap/components/warp";
import * as mixins from "@/views/wap/mixin";
import {
  getDetail
} from "@/api/pageInfoManage";
import { txt2HTML } from "@/utils/filters";

export default {
  name: "guide",
  mixins: [mixins.router],
  data() {
    return {
      getTextHtml:null
    }
  },
  components: { warp },
  methods: {
    txt2HTML,
    //获取投诉举报指南
    getDetailFun(name){
      let params={
        name:name
      }
      getDetail(params).then(res=>{
        const {code,msg,result} = res
        if(code==0){
          if(!result)return this.$modal.msgError({duration: '1000',message: '获取失败，请联系管理员'});
          this.getTextHtml = result.content
        }else{
          this.$modal.msgError({duration: '1000',message: msg})
        }
      }).catch(err=>{
        return Promise.reject(err)
      })
    }
  },
  mounted() {
    this.getDetailFun('投诉指南')
  },
};
</script>

<style lang="less" scoped>
h1 {
  text-align: center;
  font-size: 0.36rem;
  font-weight: 600;
  color: #323232;
  margin: .4rem 0;
}

.content {
  padding: 0 .2rem .4rem .2rem;
}

h3 {
  //font-size: 0.24rem;
  font-size: .3rem;
  margin: .2rem 0;
}

p {
  color: #666666;
  font-size: .26rem;
}
</style>