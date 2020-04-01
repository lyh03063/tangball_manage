
export default {
  powerPath: "newsCenter.list_article_category",//权限路径
  listIndex: "list_article_category", //vuex对应的字段
  isRefreshAfterCUD:true,//是否在增删改操作后刷新列表
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
  columns: [
    {
      label: "分类编号",
      prop: "P1",
      width: 100
    },
    {
      label: "分类名称",
      prop: "name",
      width: 120
    },
    {
      label: "分类说明",
      prop: "remark",
      width: 250,
    },
    {
      label: "资讯数量",
      prop: "acticleNumber",
      width: 90,
      statistics: { listIndex: 'list_article', targetIdKey: 'articleCategory' }
    },
  ],
  //-------筛选表单字段数组-------
  searchFormItems: [
    {
      label: "分类编号",
      prop: "P1",
      type: "input"
    },
    {
      label: "分类编号",
      prop: "name",
      type: "input"
    },
  ],
  //-------详情字段数组-------
  detailItems: [
    {
      label: "分类编号",
      prop: "P1"
    },
    {
      label: "分类名称",
      prop: "name"
    },
    {
      label: "分类说明",
      prop: "remark"
    },
    {
      label: "该分类下的资讯总量",
      prop: "articleNumber"
    },
  ],
  //-------新增、修改表单字段数组-------
  formItems: [
    {
      label: "分类名称",
      prop: "name",
      type: "input"
    },
    {
      label: "分类说明",
      prop: "remark",
      type: "textarea"
    }
  ]
}
