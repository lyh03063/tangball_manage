
let obj =  {
  powerPath: "venue.list_area",//权限路径
    listIndex: "list_area", //vuex对应的字段
    isRefreshAfterCUD:true,//是否在增删改操作后刷新列表
    //默认排序参数
    sortJsonDefault: {
      "tangball.countVenue": -1//按球场数量降序
    },
    
    focusMenu: true,//进行菜单聚焦
    flag: true,
    url: {
      list: "/crossList?page=dmagic_area", //列表接口
      add: "/crossAdd?page=dmagic_area", //新增接口
      modify: "/crossModify?page=dmagic_area", //修改接口
      delete: "/crossDelete?page=dmagic_area" //删除接口
    },
    //-------列配置数组-------
    columns: ["areaName_P2","areaId_P7","areaFatherId_P8","area_tangball"],
    //-------筛选表单字段数组-------
    searchFormItems: ["areaName_P2","areaId_P7","areaFatherId_P8"],
    //-------详情字段数组-------
    detailItems: ["areaName_P2","areaId_P7","areaFatherId_P8"],
    //-------新增、修改表单字段数组-------
    formItems: ["areaName_P2","areaId_P7","areaFatherId_P8"]
  }
  util.reformCFListItem(obj)

  export default obj