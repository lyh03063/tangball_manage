<template>
  <div class>
    <el-container>
      <el-header class="home-head-box ">
          <div class="FL MT13 FS24 C_fff">唐球加盟商管理中心</div>
          <div class="FR MT30 C_fff">
            <i class="el-icon-s-custom MR5" title="用户名"></i>
            {{franchiseeName}}&nbsp;&nbsp;&nbsp;
            <a
              href="javascript:;"
              class="MR10"
              @click="logout"
              style="color:white;"
            >
              <i class="el-icon-right MR5 middle-box"></i>退出登录
            </a>
            <router-link to="/franchisee_modify_password?flag=true">
              <i class="el-icon-key MR5 middle-box" style="cursor: pointer;color:white;">修改密码</i>
            </router-link>
          </div>
      </el-header>
      <el-container>
        <NavMenu :cf="navMenuList"></NavMenu>
        <el-main style="padding-top:10px;">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>


<script>
import NavMenu from "@/components/NavMenu/NavMenu";
export default {
    components:{NavMenu},
  data() {
    return {
        franchiseeName:localStorage.franchisee_name,
      navMenuList: [
        {
        index: "matchCenter",
        icon: "el-icon-baseball",
        title: "赛事",
        menuItem: [
          {
          index: "franchisee_macth",
          icon: "el-icon-baseball",
          title: "赛事中心",
          route: "/franchisee_macth"
        },
        {
          index: "franchisee_mymacth",
          icon: "el-icon-baseball",
          title: "我的赛事",
          route: "/franchisee_mymacth"
        },
        {
          index: "franchisee_enroll",
          icon: "el-icon-baseball",
          title: "赛事订单",
          route: "/franchisee_enroll"
        },
        ]},
       
        {
          index: "franchisee_article",
          icon: "el-icon-document",
          title: "资讯",
          route: "/franchisee_article"
        },
        {
          index: "franchisee_member",
          icon: "el-icon-user",
          title: "球员",
          route: "/franchisee_member"
        },
        {
          index: "franchisee_venue",
          icon: "el-icon-school",
          title: "唐球场",
          route: "/franchisee_venue"
        }
      ]
    };
  },
  methods: {
      logout(){
          localStorage.franchisee_isLogin = 0
          localStorage.franchisee_name = '';
          localStorage.franchisee_P1 = ''
          this.$router.push({ path: "/franchisee_login" });
      }
  },
  created() {
    if (localStorage.franchisee_isLogin != 1) {
          this.$router.push({ path: "/franchisee_login" });
      }
  }
};
</script>

<style scoped>
</style>