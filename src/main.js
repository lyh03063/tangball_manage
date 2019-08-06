// window.pub_debug=true;//开启调试模式

window.PUB={}
 window.PUB.domain="http://120.76.160.41:3000"
// window.PUB.domain="http://localhost:3000"




import Vue from 'vue'
Vue.config.productionTip = false

import lodash from 'lodash'//导入lodash方法库
window.lodash=lodash
import axios from "axios";
window.axios = axios;

import ajax from "@/assets/js/ajax.js";
window.ajax = ajax;





import moment from "moment";
window.moment = moment; 
import  "./assets/js/mix.js";//注意位置要提前







import space from './components/space/index.js';   //默认情况下找的是index文件
Vue.use(space);   //必须有install
import debug_list from './components/common/debug_list/index.js';   //导入debug_list
Vue.use(debug_list);   //作为全局组件，必须有install
import debug_item from './components/common/debug_item/index.js';   //导入debug_item
Vue.use(debug_item);   //作为全局组件，必须有install
import ajax_populate from './components/common/ajax_populate/index.js';   //导入ajax_populate
Vue.use(ajax_populate);   //作为全局组件，必须有install
import loading from './components/common/loading/index.js';   //导入loading
Vue.use(loading);   //作为全局组件，必须有install



import VueRouter from 'vue-router'
Vue.use(VueRouter)
import "./mock.js";


import login from "@/login";
import manage from "@/manage";
import listHome from "@/page/listHome";
import listCategory from "@/page/listCategory";
import listCommodity from "@/page/listCommodity";
import util from "@/assets/js/util.js";


import list_lyh from "@/page/list_lyh";
import list_cdc from "@/page/list_cdc";
import list_cdx from "@/page/list_cdx";
import list_dgx from "@/page/list_dgx";
import list_dgz from "@/page/list_dgz";
import list_hjp from "@/page/list_hjp";
import list_lfh from "@/page/list_lfh";
import list_lxc from "@/page/list_lxc";
import list_wxd from "@/page/list_wxd";
import list_xql from "@/page/list_xql";
import list_zjw from "@/page/list_zjw";
import list_zsr from "@/page/list_zsr";
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
import list_area from "@/page/list_area";
import list_msg from "@/page/list_msg";
import list_msg_read from "@/page/list_msg_read";
import list_recommend from "@/page/list_recommend";
import dynamic_form_demo from "@/page/dynamic_form_demo";
import demo_common from "@/demo/common.vue";


window.util=util;

// 3. 创建 router 实例，然后传 `routes` 配置
const router = new VueRouter({
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', component: login },
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
          path: '/listCommodity',
          component: listCommodity
        },
        {
          path: '/listCategory',
          component: listCategory,
        },
        {
          path: '/list_recommend',
          component: list_recommend
        },
      
       
        
        {
          path: '/list_lyh',
          component: list_lyh
        },
        {
          path: '/list_cdc',
          component: list_cdc
        },
        {
          path: '/list_cdx',
          component: list_cdx
        },
        {
          path: '/list_dgx',
          component: list_dgx
        },
        {
          path: '/list_dgz',
          component: list_dgz
        },
        {
          path: '/list_hjp',
          component: list_hjp
        },
        {
          path: '/list_lfh',
          component: list_lfh
        },
        {
          path: '/list_lxc',
          component: list_lxc
        },
        {
          path: '/list_wxd',
          component: list_wxd
        },
        {
          path: '/list_xql',
          component: list_xql
        },
        {
          path: '/list_zjw',
          component: list_zjw
        },
        {
          path: '/list_zsr',
          component: list_zsr
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




import Vuex from 'vuex'//导入vuex模块
Vue.use(Vuex)//应用组件

const store = new Vuex.Store({//定义Vuex的存储对象
  state: {
    debug:true,
    activeMenuIndex: "",//当前激活的菜单index
    listState: {//存放列表的共享状态，

    }, 
    defultFindJson: {//存放列表的默认查询参数，
      // list_article:{articleCategory:3  }

    },   
  },
 
  mutations: {//变更事件
    setDebug(state, param) {//设置debug模式
      state.debug= param;
      
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
    openDialogAdd(state, listIndex) {//打开新增弹窗事件
      state.listState[listIndex].isShowDialogAdd = true;
    },
    closeDialogAdd(state, listIndex) {//关闭新增弹窗事件
      state.listState[listIndex].isShowDialogAdd = false;
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
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);


import Main from './main.vue'
new Vue({
  render: h => h(Main),
  router,
}).$mount('#app')