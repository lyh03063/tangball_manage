<template>
  <div id="app" style>
    <el-container>
      <el-header class="MB10">
        <el-row>
          <div class="FL MT13 FS24 C_fff">管理后台</div>

          <div class="FR MT30 C_fff">
            <span class="MR10">当前登录用户 admin</span>
            <a href="javascript:;" class="MR10" @click="logout">退出登录</a>
            <a target="_blank" href="javascript:;">官网首页</a>
          </div>
        </el-row>
      </el-header>
      <el-container>
        <el-aside width="202px" class="ML10">
          <el-menu
            :default-active="activeMenuIndex"
            class="el-menu-vertical-demo"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
            :router="true"
            

          >
            <el-menu-item index="listHome" route="/listHome">
              <i class="el-icon-house"></i>
              <span slot="title">首页 </span>
            </el-menu-item>
             <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>赛事</span>
              </template>
              <el-menu-item index="list_venue" route="/list_venue">场馆</el-menu-item>
              <el-menu-item index="list_franchisee" route="/list_franchisee">加盟商</el-menu-item>
              <el-menu-item index="list_match" route="/list_match">赛事</el-menu-item>
              <el-menu-item index="list_enroll" route="/list_enroll">报名(订单)</el-menu-item>
              <el-menu-item index="list_achievement" route="/list_achievement">比赛成绩</el-menu-item>
              <el-menu-item index="list_member" route="/list_member">会员</el-menu-item>
              <el-menu-item index="list_sponsor" route="/list_sponsor">赞助商</el-menu-item>
              <el-menu-item index="list_sponsorship" route="/list_sponsorship">赛事赞助</el-menu-item>
            </el-submenu>
             <el-submenu index="4">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>其他数据</span>
              </template>
               <el-menu-item index="list_article_category" route="/list_article_category">文章分类</el-menu-item>
              <el-menu-item index="list_article" route="/list_article">文章管理</el-menu-item>
             
            </el-submenu>
             <el-submenu index="3">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>系统管理</span>
              </template>
               <el-menu-item index="list_admin" route="/list_admin">管理员</el-menu-item>
              
               <el-menu-item index="aaaa" route="/aaaa">0000</el-menu-item>
         
            </el-submenu>
           
            <el-submenu index="3">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>商品（无用）</span>
              </template>
              <el-menu-item index="listCommodity" route="/listCommodity">商品列表</el-menu-item>
              <el-menu-item index="listCategory" route="/listCategory">商品分类</el-menu-item>
         
            </el-submenu>
            
          </el-menu>
        </el-aside>
        <el-main>
          <keep-alive>
            <router-view></router-view>
          </keep-alive>
        </el-main>
      </el-container>
    </el-container>
  </div>
  
</template>

<script>
import Vue from "vue";

export default {
  components: { }, //注册组件
  methods: {
    logout() {
      //退出登录函数
      localStorage.isLogin = "0";
      this.$router.push({ path: "/login" }); //跳转到manage
    }
  },
  computed: {
    //计算属性

    activeMenuIndex() {
      //
      //当前激活的菜单index
      return this.$store.state.activeMenuIndex; //从vuex的store里面读取值
    }
    
  },
  data() {
    return {
   
    };
  },
  mounted() {}
};
</script>



