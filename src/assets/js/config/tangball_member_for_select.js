
let obj = {
  isRefreshAfterCUD:true,//是否在增删改操作后刷新列表

    pageSize: 10,
    focusMenu: false, //进行菜单聚焦
    isShowBreadcrumb: false, //面包屑
    isShowToolBar: false, //批量操作栏
    isShowOperateColumn: false, //单项操作列
    isRefreshAfterCUD: false, //是否在增删改操作后自动更新列表
    isMultipleSelect: false, //不支持多选
    url: {
      list: "/crossList?page=tangball_member" //列表接口
    },


   
    //-------列配置数组-------
    columns: [
      "Id", "member_name", "openid", "sex", "phone","career","ballAge"
    ],
    //-------筛选表单字段数组-------
    searchFormItems: [
      "search_member_name","phone", "openid"
    ],
    detailItems: [],
    formItems: []
  }
  util.reformCFListItem(obj)

export default obj
