<template>
  <div class>
     <el-breadcrumb separator-class="el-icon-arrow-right">
  <el-breadcrumb-item >首页</el-breadcrumb-item>
  <el-breadcrumb-item>资讯中心</el-breadcrumb-item>
  <el-breadcrumb-item>首页推荐内容</el-breadcrumb-item>
</el-breadcrumb>
<div style="margin-top:20px;"></div>
<h2 style="margin-left:10px;">修改首页推荐内容数据</h2>
<div class="TitleMsg-box">
  <div style="height:10px;"></div>
    <div>
        <div style="flex:0 0 100px;">大标题：</div><el-input v-model="TitleMsg.bigTitle" placeholder="请输入内容"
      class="input-text-box"
      size="mini"></el-input></div>
    <div>
        <div style="flex:0 0 100px;">大标题链接：</div>
        <el-input v-model="TitleMsg.bigTitleLink" placeholder="请输入内容"
      class="input-text-box"
      size="mini"></el-input></div>
    <div>
        <div style="flex:0 0 100px;">小标题: </div>
        <el-input v-model="TitleMsg.smallTitle" placeholder="请输入内容" 
    class="input-text-box"
    size="mini"></el-input></div>
    <div>
        <div style="flex:0 0 100px;">按钮文字: </div>
        <el-input v-model="TitleMsg.buttonText" placeholder="请输入内容" 
    class="input-text-box"
    size="mini"></el-input></div>
    <div>
        <div style="flex:0 0 100px;">按钮链接: </div>
        <el-input v-model="TitleMsg.buttonLink" placeholder="请输入内容" 
    class="input-text-box"
    size="mini"></el-input></div>
    </div>
    <el-button type="primary" size="medium" style="margin-left:20px;" @click="modifyTitleMsg">保存</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
        TitleMsg:{},
        article:{}
    };
  },
  methods: {
      async getTitleMsg() {
	let { data } = await axios({
          method: "post",
          url: PUB.domain + '/crossDetail?page=tangball_article',
          data: {
            id:38
          }
        }).catch(() => {});
    this.article = data.doc
    this.TitleMsg=data.doc.extend
    console.log('aaaa',this.TitleMsg);
},
    async modifyTitleMsg () {
        this.article.extend = this.TitleMsg
	let { data } = await axios({
          method: "post",
          url: PUB.domain + '/crossModify?page=tangball_article',
          data: {
            findJson: {
              P1:this.article.P1
            },
            modifyJson:this.article
          }
        }).catch(() => {});
    this.$message({
          message: '修改成功',
          type: 'success'
        });
}
  },
  created() {
      this.$store.commit('changeActiveMenu','home_page_title')
      this.getTitleMsg()
  }
};
</script>

<style scoped>
    .input-text-box{
        width: 18%;
        flex: 0 0 60%;
        /* line-height: 40px; */
    }
    .TitleMsg-box{
        border: 1px solid #ddd;
        padding: 10px 20px;
        border-radius: 10px;
        margin: 20px 10px;
        width: 40%;
    }
    .TitleMsg-box div{
        line-height: 30px;
        height: 40px;;
        font-size: 16px;
        display: flex;
    }
</style>