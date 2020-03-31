<template>

  <div id="app" style>
    <div class="float-tips" v-if="!isProEnvConfig" >
非生产
</div>
    <el-container>
      <el-header class="home-head-box ">
        <el-row>
          <div class="FL MT13 FS24 C_fff">唐球体育全国运营管理中心</div>
          <div class="FR MT30 C_fff">
            <i class="el-icon-s-custom MR5" title="用户名"></i>
            {{this.tangball_loginUserName}}({{this.tangball_roleName}})&nbsp;&nbsp;&nbsp;
            <a
              href="javascript:;"
              class="MR10"
              @click="logout"
              style="color:white;"
            >
              <i class="el-icon-right MR5 middle-box"></i>退出登录
            </a>
            <router-link to="/modify_password">
              <i class="el-icon-key MR5 middle-box" style="cursor: pointer;color:white;">修改密码</i>
            </router-link>
          </div>
        </el-row>
      </el-header>
    </el-container>
    <el-container>
      <NavMenu :cf="navMenuList" ></NavMenu>

      <el-main>
        <dm_space height="10" ></dm_space>
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import Vue from "vue";
import NavMenu from "./components/NavMenu/NavMenu";
export default {
    name: "manage",
  components: { NavMenu }, //注册组件
  methods: {
    // //函数：{切换调试模式函数}
    // toggleDebug() {
    //   //来自vuex的当前行数据
    //   let debug = this.$store.state.debug;
    //   console.log("debug", debug);
    //   this.$store.commit("setDebug", !debug);

    // },
    logout() {
      //退出登录函数
      localStorage.tangball_isLogin = "0";
      localStorage.tangball_loginUserName = null;
      this.$router.push({ path: "/login" }); //跳转到manage
    }
  },
  computed: {
    //计算属性
    isProEnvConfig(){
      return (PUB.domain == "https://www.dmagic.cn")
    },

    activeMenuIndex() {
      //
      //当前激活的菜单index
      return this.$store.state.activeMenuIndex; //从vuex的store里面读取值
    }
  },
  data() {
    //当前用户角色的权限数据
  
    window.rolePower = util.getLocalStorageObj("tangball_power");

    //完整的菜单列表
    let menuListAll = [
      {
        //菜单
        index: "listHome",
        route: "/listHome",
        icon: "el-icon-house",
        title: "首页"
      },
      {
        index: "matchCenter",
        icon: "el-icon-baseball",
        title: "赛事中心",
        menuItem: [
          { index: "list_match", route: "/list_match", title: "赛事" },
          {
            index: "list_enroll",
            route: "/list_enroll",
            title: "报名(订单)"
          },
          {
            index: "list_rule",
            route: "/list_rule",
            title: "规则库"
          },
          {
            index: "list_team",
            route: "/list_team",
            title: "球队"
          },
          // {
          //   index: "list_group",route: "/list_group",title: "对阵分组"
          // },
          {
            index: "list_achievement",
            route: "/list_achievement",
            title: "比赛成绩"
          }
        ]
      },
      {
        index: "memberCenter",
        icon: "el-icon-user",
        title: "球员信息库",
        menuItem: [
          { index: "list_member", route: "/list_member", title: "球员" }
        ]
      },
      {
        index: "venue",
        icon: "el-icon-school",
        title: "唐球场",
        menuItem: [
          { index: "list_venue", route: "/list_venue", title: "唐球场" },
          {
            index: "list_franchisee",
            route: "/list_franchisee",
            title: "加盟商"
          },
          {
            index: "list_area",
            route: "/list_area",
            title: "地区管理"
          }
        ]
      },
      {
        index: "newsCenter",
        icon: "el-icon-document",
        title: "资讯中心",
        menuItem: [
          {
            index: "list_article_category",
            route: "/list_article_category",
            title: "资讯分类"
          },
          {
            index: "list_article",
            route: "/list_article",
            title: "资讯管理"
          },
          {
            index: "list_recommend",
            route: "/list_recommend",
            title: "首页轮播图"
          },
          {
            index: "home_page_title",
            route: "/home_page_title",
            title: "首页推荐内容"
          }
        ]
      },

      {
        index: "sponsorCenter",
        icon: "el-icon-present",
        title: "招商管理",
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
        index: "msgCenter",
        icon: "el-icon-bell",
        title: "系统消息",
        menuItem: [
          {
            index: "list_msg",
            route: "/list_msg",
            title: "消息"
          },
          {
            index: "list_msg_read",
            route: "/list_msg_read",
            title: "消息已读记录"
          }
        ]
      },

      {
        index: "systemManage",
        icon: "el-icon-setting",
        title: "系统管理",
        menuItem: [
          { index: "list_admin", route: "/list_admin", title: "管理员" },
          { index: "list_role", route: "/list_role", title: "角色" }
        ]
      }
    ];

    //最终需要的菜单列表
    let menuListNeed = [];
    //*****遍历完整的菜单列表，返回有权限的菜单列表
    menuListAll.forEach(groupEach => {
      let groupKey = groupEach.index;
      //如果没有menuItem且有route，直接返回
      if (!groupEach.menuItem && groupEach.route) {
        return menuListNeed.push(groupEach);
      }

      let menuItemNeed = []; //当前菜单组最终可用的菜单项
      // console.log("aaa:", aaa);
      groupEach.menuItem.forEach(menuItemEach => {
        let menuIndex = menuItemEach.index;
        //获取权限
        let hasPower = lodash.get(window.rolePower , `${groupKey}.${menuIndex}.search`);
        if (hasPower) {
          menuItemNeed.push(menuItemEach);
        }
      });

      console.log("menuItemNeed:", menuItemNeed);
      //如果{当前菜单组最终可用的菜单项}存在
      if (menuItemNeed.length > 0) {
        menuListNeed.push({
          index: groupEach.index,
          icon: groupEach.icon,
          title: groupEach.title,
          menuItem: menuItemNeed
        });
      }
    });

    return {
      // 导航菜单列表
      navMenuList: menuListNeed
    };
  },
  created() {
    //*引用当前用户名
    this.tangball_loginUserName = localStorage.tangball_loginUserName;
    this.tangball_roleName = localStorage.tangball_roleName;
    document.onkeydown = e => {
      //绑定ctrl+D事件
      var keyCode = e.keyCode || e.which || e.charCode;
      var ctrlKey = e.ctrlKey || e.metaKey;
      if (ctrlKey && keyCode == 68) {
        console.log("ctrlKey", ctrlKey);
        console.log("keyCode", keyCode);
        // this.toggleDebug();//调用：{切换调试模式函数}

        let debug = this.$store.state.debug;
        console.log("debug", debug);
        this.$store.commit("setDebug", !debug);
        e.preventDefault(); //阻止默认事件
        return false;
      }
    };
    
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
.home-head-box {
  background-color: rgb(84, 92, 100);
}
.el-header {
  background-color: rgb(84, 92, 100) !important;
}
.middle-box {
  border-left: 1px solid #ddd;
  padding-left: 5px;
}

.float-tips{
border: 1px #f00 solid;
width: 80px;
height: 30px;
position:fixed;
top:3px;
right: 3px;
background-color: #fff;
padding: 5px;
text-align: center;
z-index: 999;

}
</style>

