// import Vue from 'vue'
Vue.config.productionTip = false
// import lodash from 'lodash'//导入lodash方法库
import "@/components/registComponents.js";//引入注册全局组件
window.lodash = lodash
Vue.prototype.$lodash = lodash//让vue实例中可访问$store
import axios from "axios";
window.axios = axios;
import ajax from "@/assets/js/ajax.js";
window.ajax = ajax;
import moment from "moment";
window.moment = moment;

import config from "@/assets/js/config.js";



// import VueRouter from 'vue-router'
Vue.use(VueRouter)
import "./mock.js";
import login from "@/login";
import modify_password from "@/page/modify_password";
import manage from "@/manage";
import listHome from "@/page/listHome";

import list_venue from "@/page/list_venue";
import list_franchisee from "@/page/list_franchisee";
import list_match from "@/page/list_match";
import list_enroll from "@/page/list_enroll";
import list_achievement from "@/page/list_achievement";
import list_member from "@/page/list_member";
import list_sponsor from "@/page/list_sponsor";
import list_sponsorship from "@/page/list_sponsorship";
import list_article_category from "@/page/list_article_category";
import list_article from "@/page/list_article";
import list_admin from "@/page/list_admin";
import list_role from "@/page/list_role";
import list_area from "@/page/list_area";
import list_msg from "@/page/list_msg";
import list_msg_read from "@/page/list_msg_read";
import list_recommend from "@/page/list_recommend";
import list_team from "@/page/list_team";
import list_rule from "@/page/list_rule";
import list_group from "@/page/list_group";
import home_page_title from "@/page/home_page_title";
import dynamic_form_demo from "@/page/dynamic_form_demo";
import demo_common from "@/demo/common.vue";
import franchisee_login from "@/franchisee_login.vue";
import franchisee_home from "@/franchisee_home.vue";
import franchisee_article from '@/franchise_page/franchisee_article.vue'
import franchisee_macth from '@/franchise_page/franchisee_macth.vue'
import franchisee_mymacth from '@/franchise_page/franchisee_mymacth.vue'
import franchisee_member from '@/franchise_page/franchisee_member.vue'
import franchisee_venue from '@/franchise_page/franchisee_venue.vue'
import franchisee_enroll from '@/franchise_page/franchisee_enroll.vue'
// window.util=util;
// 3. 创建 router 实例，然后传 `routes` 配置
const router = new VueRouter({
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', component: login },
    {
      path: '/franchisee_login',
      component: franchisee_login
    },
    {
      path: '/franchisee_home',
      component: franchisee_home,
      redirect: '/franchisee_mymacth',
      children: [
        {
          path: '/franchisee_article',
          component: franchisee_article
        },
        {
          path: '/franchisee_macth',
          component: franchisee_macth
        },
        {
          path: '/franchisee_mymacth',
          component: franchisee_mymacth
        },
        {
          path: '/franchisee_member',
          component: franchisee_member
        },
        {
          path: '/franchisee_venue',
          component: franchisee_venue
        },
        {
          path: '/franchisee_enroll',
          component: franchisee_enroll
        },
        {
          path: '/franchisee_modify_password', component: modify_password
        },
      ]
    },

    {
      path: '/manage',
      component: manage,
      redirect: '/listHome', //跳转
      children: [//子路由
        {
          path: '/list_venue',
          component: list_venue
        },
        {
          path: '/modify_password', component: modify_password
        },
        {
          path: '/list_franchisee',
          component: list_franchisee
        },
        {
          path: '/list_match',
          component: list_match
        },
        {
          path: '/list_enroll',
          component: list_enroll
        },
        {
          path: '/list_achievement',
          component: list_achievement
        },
        {
          path: '/list_member',
          component: list_member
        },
        {
          path: '/home_page_title',
          component: home_page_title
        },
        {
          path: '/list_sponsor',
          component: list_sponsor
        },
        {
          path: '/list_sponsorship',
          component: list_sponsorship
        },
        {
          path: '/list_article_category',
          component: list_article_category
        },
        {
          path: '/list_article',
          component: list_article
        },
        {
          path: '/list_area',
          component: list_area
        },
        {
          path: '/list_admin',
          component: list_admin
        },
        {
          path: '/list_role',
          component: list_role
        },
        {
          path: '/list_msg',
          component: list_msg
        },
        {
          path: '/list_msg_read',
          component: list_msg_read
        },
        {
          path: '/listHome',
          component: listHome
        },
      
      
        {
          path: '/list_recommend',
          component: list_recommend
        },
        {
          path: '/list_team',
          component: list_team
        },
        {
          path: '/list_rule',
          component: list_rule
        },
        {
          path: '/list_group',
          component: list_group
        },
     

        {
          path: '/dynamic_form_demo',
          component: dynamic_form_demo
        },
        {
          path: '/demo_common',
          component: demo_common
        },
      ]
    },
  ]
})

router.beforeEach((to, from, next) => {
  //to.fullPath == "/franchisee_login"
  if (to.fullPath.includes("/franchisee_")) {//Q1：加盟商相关页，不使用守卫
    next();
  } else {//Q2：其他页面使用守卫
    // 如果用户未登录，跳转登录页面
    if (localStorage[PUB.keyIsLogin] != 1) {
      if (to.path == '/login') {
        next();
      } else {
        PUB.goUrlAfterLogin = to.fullPath//变量赋值：{登录后要跳转的地址}
        next('/login');
      }
    } else {
      PUB.goUrlAfterLogin = null//变量赋值：{登录后要跳转的地址}
      next();
    }
  }




})
// import Vuex from 'vuex'//导入vuex模块
// Vue.use(Vuex)//应用组件
const store = new Vuex.Store({//定义Vuex的存储对象
  state: {
    debug: false,
    activeMenuIndex: "",//当前激活的菜单index
    listState: {//存放列表的共享状态，
    },
    defultFindJson: {//存放列表的默认查询参数，
      // list_article:{articleCategory:3  }
    },
  },
  mutations: {//变更事件
    setDebug(state, param) {//设置debug模式
      state.debug = param;
    },

    setListFindJson(state, param) {//设置列表的初始筛选参数值
      state.defultFindJson[param.listIndex] = param.findJson;
      //对listState进行整个对象的变更（深拷贝），因为listState是有注册的，可以触发响应
      let str = JSON.stringify(state.defultFindJson)//对象转换成字符串
      state.defultFindJson = JSON.parse(str)//字符串转换成对象
    },
    initListState(state, param) {//改变列表的初始状态值
      state.listState[param.listIndex] = param.objState;
      //对listState进行整个对象的变更（深拷贝），因为listState是有注册的，可以触发响应
      let str = JSON.stringify(state.listState)//对象转换成字符串
      state.listState = JSON.parse(str)//字符串转换成对象
    },
    changeActiveMenu(state, activeMenuIndex) {//改变聚焦菜单
      state.activeMenuIndex = activeMenuIndex
    },
    openDialogDetail(state, param) {//打开详情弹窗事件
      state.listState[param.listIndex].isShowDialogDetail = true;
      // state.listState[param.listIndex].tableDataDetail.forEach(doc => {
      //   //遍历详情弹窗的表格数据
      //   doc.itemValue = param.row[doc.field]; //修改itemValue
      // });
      state.listState[param.listIndex].row = param.row;//将行数据保存到vuex
    },
    closeDialogDetail(state, listIndex) {//关闭详情弹窗事件
      state.listState[listIndex].isShowDialogDetail = false;
    },
  }
})
Vue.prototype.$store = store//让vue实例中可访问$store




Vue.prototype.$handelItem = util.handelItem//让vue实例中可访问$handelItem




import Main from './main.vue'
new Vue({
  render: h => h(Main),
  router,
}).$mount('#app')