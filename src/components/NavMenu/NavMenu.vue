<template>
  <div id="app" style>
         <el-container>
    <el-aside  class="ML10">
      <el-menu
        :default-active="activeMenuIndex"
        class="el-menu-vertical-demo"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        :router="menu.isRouter"
        :collapse="menu.isCollapse"
   
      >
        <template v-for="(menuEach,index) in menuList">
          <el-menu-item
            :index="menuEach.index"
            :route="menuEach.route"
            v-if="menuEach.route"
            :key="index"
          >
            <i :class="menuEach.icon"></i>
            <span slot="title">{{menuEach.title}}</span>
          </el-menu-item>
          <el-submenu :index="menuEach.index" :key="index" v-else>
            <template slot="title">
              <i :class="menuEach.icon"></i>
              <span>{{menuEach.title}}</span>
            </template>

            <el-menu-item
              :index="item.index"
              :route="item.route"
              v-for="item in menuEach.menuItem"
              :key="item.index"
            >{{item.title}}</el-menu-item>
          </el-submenu>
        </template>
      </el-menu>
    </el-aside>

    <!-- 路由输出：不用改 -->
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

export default {
  components: {}, //注册组件
  methods: {},
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
      //导航菜单列表
      menu: {
        isRouter: true,
        isCollapse: true
      },
      menuList: [
        {
          index: "listHome",
          route: "/listHome",
          icon: "el-icon-house",
          title: "首页",
          menuItem: []
        },
        {
          index: "1",
          icon: "el-icon-menu",
          title: "赛事",
          menuItem: [
            { index: "list_venue", route: "/lisist_venue", title: "场馆" },
            {
              index: "list_franchisee",
              route: "/list_franchisee",
              title: "加盟商"
            },
            { index: "list_match", route: "/list_match", title: "赛事" }
          ]
        }
      ]
    };
  }
};
</script>
<style>
/* .el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
} */
</style>



