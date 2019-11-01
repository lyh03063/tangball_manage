
export default  {
  powerPath: "newsCenter.list_recommend",//权限路径
listIndex: "list_recommend", //vuex对应的字段~
focusMenu: true, //进行菜单聚焦
twoTitle: "其他数据",
threeTitle: "首页轮播图",

url: {
  list: "/crossList?page=tangball_recommend", //列表接口
  add: "/crossAdd?page=tangball_recommend", //新增接口
  modify: "/crossModify?page=tangball_recommend", //修改接口
  detail: "/crossDetail?page=tangball_recommend",
  delete: "/crossDelete?page=tangball_recommend" //删除接口
},
dynamicDict: [
  {
    page: "tangball_article_category",
    populateColumn: "categoryDoc",
    idColumn: "articleCategory",
    idColumn2: "P1"
  }
],
//cfDialogForm新增修改弹窗的配置
cfDialogForm: {
  tips:{
    text:`
    关于“小程序页面”字段说明(xxx要替换成对应的数据id)：<br>
   赛事详情地址：/pages/matchDetail/main?id=xxx，
    <br>
    资讯详情地址：/pages/articleDetail/main?dataId=xxx
    <br> <br>
    轮播图的尺寸比例最好保持在1:0.42  建议尺寸：宽500px，高210px
    `,
    style:{color:"#f90","padding":"0 0 30px 123px"}
  }
  
},
//-------列配置数组-------
columns: [
  {
    label: "标题",
    prop: "name",
    width: 260
  },
  {
    label: "链接页面",
    prop: "link",
    width: 250
  },

  {
    label: "创建时间",
    prop: "CreateTime",
    width: 160,
    formatter: function(extend) {
      return moment(extend.CreateTime).format('YYYY-MM-DD HH:mm');
    }
  },
  {
    label: "其他",
    prop: "extend",
    width: 200,
    formatter: function(extend) {
      return JSON.stringify(extend.extend);
    }
  }
],
//-------筛选表单字段数组-------
searchFormItems: [
  {
    label: "标题",
    prop: "name",
    type: "input_find_vague"
  }
],
//-------详情字段数组-------
detailItems: [
  {
    label: "标题",
    prop: "name"
  },
  {
    label: "链接页面",
    prop: "link"
  },

  {
    label: "图片",
    prop: "album",
    slot: "slot_detail_item_album"
  }
],
//-------新增、修改表单字段数组-------
formItems: [
  {
    label: "资讯标题",
    prop: "name"
  },
  {
    label: "小程序页面",
    prop: "link"
  },
  {
    label: "相册",
    prop: "album",
    type: "upload"
  },
]
}