
let obj = {

  powerPath: "newsCenter.list_article",//权限路径
  listIndex: "list_article", //vuex对应的字段~
  isRefreshAfterCUD: true,//是否在增删改操作后刷新列表
  focusMenu: true, //进行菜单聚焦
  twoTitle: "其他数据",
  threeTitle: "资讯管理",
  flag: true,
  findJsonDefault: { P1: { $ne: 38 } },
  url: {
    list: "/crossList?page=tangball_article", //列表接口
    add: "/crossAdd?page=tangball_article", //新增接口
    modify: "/crossModify?page=tangball_article", //修改接口
    detail: "/crossDetail?page=tangball_article",
    delete: "/crossDelete?page=tangball_article" //删除接口
  },
  // objParamAddon: {
    
  // },
  sortJsonDefault: { topSort: -1,_id: -1, },//排序参数
  dynamicDict: [
    {
      page: "tangball_article_category",
      populateColumn: "categoryDoc",
      idColumn: "articleCategory",
      idColumn2: "P1"
    },
    {
      page: "tangball_franchisee",
      populateColumn: "franchisee",
      idColumn: "franchiseeId",
      idColumn2: "P1"
    },
  ],

  //-------列配置数组-------
  columns: ["Id", "acticle_articleTitle","topSort", "acticle_articleCategory", "acticle_franchiseeId", "acticle_auditStatus", "acticle_recommend", "acticle_CreateTime", "acticle_extend", ],
  //-------筛选表单字段数组-------
  searchFormItems: ["acticle_articleCategory", "acticle_search_articleTitle",],
  //-------详情字段数组-------
  detailItems: [
    "Id", "acticle_articleTitle", "acticle_articleCategory", "acticle_franchiseeId", "acticle_auditStatus",
    "acticle_recommend", "acticle_CreateTime", "acticle_articleContent", "acticle_extend", "topSort",
  ],
  //-------新增、修改表单字段数组-------
  formItems: ["acticle_auditStatus", "acticle_recommend", "acticle_articleCategory", "acticle_articleTitle", "acticle_articleContent", "acticle_extend", "topSort",]

}
util.reformCFListItem(obj)

export default obj