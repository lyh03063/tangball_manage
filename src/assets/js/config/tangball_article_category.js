
let obj = {
  powerPath: "newsCenter.list_article_category",//权限路径
  listIndex: "list_article_category", //vuex对应的字段
  isRefreshAfterCUD:true,//是否在增删改操作后刷新列
  focusMenu: true,//进行菜单聚焦
  twoTitle: "赛事",
  threeTitle: "资讯分类",
  flag: true,
  url: {
    list: "/crossList?page=tangball_article_category", //列表接口
    add: "/crossAdd?page=tangball_article_category", //新增接口
    modify: "/crossModify?page=tangball_article_category", //修改接口
    delete: "/crossDelete?page=tangball_article_category" //删除接口
  },
  //-------列配置数组-------
  columns: ["acticle_category_id","acticle_category_name","acticle_category_remark","acticle_category_acticleNumber"],
  //-------筛选表单字段数组-------
  searchFormItems: ["acticle_category_id","acticle_category_name"],
  //-------详情字段数组-------
  detailItems: ["acticle_category_id","acticle_category_name","acticle_category_remark","acticle_category_acticleNumber"],
  //-------新增、修改表单字段数组-------
  formItems: ["acticle_category_name","acticle_category_remark",]
}

util.reformCFListItem(obj)

export default obj