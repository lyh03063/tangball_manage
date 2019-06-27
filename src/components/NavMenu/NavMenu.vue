<template>
  <div>
    <!-- <el-radio-group v-model="isCollapse" style="margin:0 0 20px 10px;" size="mini">
      <el-radio-button :label="false">展开</el-radio-button>
      <el-radio-button :label="true">收起</el-radio-button>
    </el-radio-group>-->

    <el-aside class="ML10" style="width%">
      <span>>></span>
      <el-menu
        :default-active="activeMenuIndex"
        class="el-menu-vertical-demo"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        :router="true"
        :collapse="isCollapse"
        :style="[isCollapse?open:close]"
      >
        <template v-for="(menuEach,index) in cf">
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
  </div>
</template>

<script>
import Vue from "vue";

export default {
  props: ["cf"],
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
      open: {
        width: "80px"
      },
      close: {
        width: "210px"
      },
      isCollapse: true
    };
  }
};
</script scoped>
<style>
</style>



