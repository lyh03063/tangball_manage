
window.PUB = {}
 //PUB.domain = "http://localhost:3000"
//PUB.domain = 'http://test.dmagic.cn'
//PUB.domain="http://e6234kn.hn3.mofasuidao.cn"//魔法隧道地址
PUB.domain = "http://120.76.160.41:3000"
PUB.urlUpload = `https://up-z2.qiniup.com`//七牛云上传地址（域名）
PUB.urlGetQiniuToken = `${PUB.domain}/api_third_part/get_qiniu_token?scope=tangball`

import tangball_member_for_select from "@/assets/js/config/tangball_member_for_select.js"
// window.F_ITEMS = {};

// //调用：{处理字段数组的某个字段配置的函数}
// util.handelItem({ action: "replace", items: items, prop: prop, itemNew: {} })



// F_ITEMS基础表单字段
window.COLUMNS = {
  Id: {
    label: "Id",
    prop: "P1",
    width: 80
  },
  roleName: {
    label: "角色名",
    prop: "name",
    width: 120
  },
  rolePower: {
    label: "权限",
    prop: "power",
    width: 200
  }
}



// F_ITEMS基础表单字段
window.F_ITEMS = {
  Id: {
    label: "数据id",
    prop: "P1",
    type: "input"
  },
  memberId: {
    label: "球员",
    prop: "memberId",
    type: "select_list_data",
    cfSelectList: {
      //选择列表配置
      dataName: "球员",
      valueKey: "P1",
      labelKey: "name",
      pageName: "tangball_member",
      cfList: tangball_member_for_select
    },
    rules: [{ required: true, message: "球员不能为空" }]
  },
  memberId_readonly: {
    label: "球员",
    prop: "memberId",
    type: "ajax_populate",
    cfAjaxPopulate: { populateKey: "name", page: "tangball_member" }
  },
  "matchId_readonly": {
    label: "赛事",
    prop: "matchId",
    type: "ajax_populate",
    cfAjaxPopulate: { populateKey: "matchName", page: "tangball_match" }
  },
  "time": {
    label: "报名时间",
    prop: "time",
    type: "date"
  },
  "payStatus": {
    label: "支付状态",
    prop: "payStatus",
    type: "select",
    options: [
      { label: "已支付", value: 2 },
      { label: "未支付", value: 1 }
    ]
  },
  "auditStatus": {
    label: "审核状态",
    prop: "auditStatus",
    type: "select",
    options: [
      { label: "未审核", value: 1 },
      { label: "审核不通过", value: 2 },
      { label: "审核通过", value: 3 }
    ]
  },
  "groups": {
    label: "球队信息",
    prop: "groups",
    slot: "slot_form_item_groups"
  },
  "matchInfo": {
    label: "赛事信息",
    prop: "matchInfo",
    slot: "slot_form_item_matchInfo"
  },
  "aaa": 11111,
  "aaa": 11111,
  "aaa": 11111,
  "aaa": 11111,
  "aaa": 11111,

};

