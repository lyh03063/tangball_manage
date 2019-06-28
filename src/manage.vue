<template>
  <div id="app" style>
    <el-container>
      <el-header class="MB10">
        <el-row>
          <div class="FL MT13 FS24 C_fff">管理后台</div>
          <div class="FR MT30 C_fff">
            <span class="MR10">当前登录用户:{{this. currentUserName}}</span>
            <a href="javascript:;" class="MR10" @click="logout">退出登录</a>
            <a target="_blank" href="javascript:;">官网首页</a>
          </div>
        </el-row>
      </el-header>
    </el-container>
    <el-container>
      <NavMenu :cf="navMenuList"></NavMenu>

      <el-main>
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import Vue from "vue";
import NavMenu from "./components/NavMenu/NavMenu";
export default {
  components: { NavMenu }, //注册组件
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
      // 导航菜单列表

      navMenuList: [
        {
          //菜单
          index: "listHome",
          route: "/listHome",
          icon: "el-icon-house",
          title: "首页"
        },
        {
          index: "1",
          icon: "el-icon-menu",
          title: "赛事",
          menuItem: [
            { index: "list_venue", route: "/list_venue", title: "场馆" },
            {
              index: "list_franchisee",
              route: "/list_franchisee",
              title: "加盟商"
            },
            { index: "list_match", route: "/list_match", title: "赛事" },
            {
              index: "list_enroll",
              route: "/list_enroll",
              title: "报名(订单)"
            },
            {
              index: "list_achievement",
              route: "/list_achievement",
              title: "比赛成绩"
            },
            { index: "list_member", route: "/list_member", title: "会员" },
            {
              index: "list_sponsor",
              route: "/list_sponsor",
              title: "赞助商"
            },
            {
              index: "list_sponsorship",
              route: "/list_sponsorship",
              title: "赛事赞助"
            }
          ]
        },
        {
          index: "2",
          icon: "el-icon-document",
          title: "其他数据",
          menuItem: [
            {
              index: "list_article_category",
              route: "/list_article_category",
              title: "文章分类"
            },
            {
              index: "list_article",
              route: "/list_article",
              title: "文章管理"
            }
          ]
        },
        {
          index: "3",
          icon: "el-icon-setting",
          title: "系统管理",
          menuItem: [
            { index: "list_admin", route: "/list_admin", title: "管理员" }
          ]
        }
      ]
    };
  },
 created() {
   //*引用当前用户名
   this. currentUserName=localStorage.loginUserName
 
 }
};
</script>



