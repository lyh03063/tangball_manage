
let obj = {
  powerPath: "newsCenter.list_recommend",//权限路径
listIndex: "list_recommend", //vuex对应的字段~
isRefreshAfterCUD:true,//是否在增删改操作后刷新列表
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
  "recommend_name","recommend_link","recommend_CreateTime","recommend_extend",
],
//-------筛选表单字段数组-------
searchFormItems: [
  "recommend_search_name"
],
//-------详情字段数组-------
detailItems: [
  "recommend_name","recommend_link","recommend_album"
],
//-------新增、修改表单字段数组-------
formItems: [
  "recommend_name","recommend_link","recommend_album"
]
}

util.reformCFListItem(obj)

export default obj