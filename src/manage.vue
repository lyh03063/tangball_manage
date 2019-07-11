<template>
  <div id="app" style @dblclick.ctrl="toggleDebug">
    <el-container>
      <el-header class="MB10">
        <el-row>
          <div class="FL MT13 FS24 C_fff">唐球赛事管理后台</div>
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
        <router-view></router-view>
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
    toggleDebug() {
  
      //来自vuex的当前行数据
      let debug = this.$store.state.debug;
      this.$store.commit("setDebug", !debug);
    },
    logout() {
      //退出登录函数
      localStorage.isLogin = "0";
      localStorage.loginUserName = null;
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
            { index: "list_member", route: "/list_member", title: "会员" }
          ]
        },
        {
          index: "2",
          icon: "el-icon-document",
          title: "其他数据",
          menuItem: [
            {
              index: "list_area",
              route: "/list_area",
              title: "地区管理"
            },
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
          title: "赛事赞助",
          menuItem: [
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
          index: "4",
          icon: "el-icon-setting",
          title: "系统管理",
          menuItem: [
            { index: "list_admin", route: "/list_admin", title: "管理员" }
          ]
        },
        {
          index: "4",
          icon: "el-icon-setting",
          title: "demo页面",
          menuItem: [
            {
              index: "dynamic_form_demo",
              route: "/dynamic_form_demo",
              title: "动态表单demo"
            },
            {
              index: "demo_common",
              route: "/demo_common",
              title: "普通组件demo"
            },
            {
              index: "listCategory",
              route: "/listCategory",
              title: "商品分类"
            },
            {
              index: "listCommodity",
              route: "/listCommodity",
              title: "商品列表"
            }
          ]
        }
      ]
    };
  },
  created() {
    //*引用当前用户名
    this.currentUserName = localStorage.loginUserName;
  }
};
</script>

<style >
/* 单选框补丁 */
body .el-radio-button__orig-radio:checked + .el-radio-button__inner {
  color: #fff;
  background-color: #e6a23c;
  border-color: #e6a23c;
  -webkit-box-shadow: -1px 0 0 0 #e6a23c;
  box-shadow: -1px 0 0 0 #e6a23c;
}
</style>

