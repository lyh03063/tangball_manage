


//#region 球员姓名
{
  let objBase = {
      label: "球员姓名",
      prop: "name"
  }

  D_ITEMS.member_name = {
      ...objBase,
  };
  COLUMNS.member_name = { ...objBase, width: 80, };

  F_ITEMS.member_name = { ...objBase, type: "input" };

  F_ITEMS.search_member_name = { ...objBase, type:"input_find_vague" };
}

//#endregion

//#region 球龄
{
  let objBase = {
      label: "球龄",
      prop: "ballAge",
  }

  D_ITEMS.ballAge = {
      ...objBase,
      formatter: function (rowData) {
          if (rowData.ballAge == 1) {
              return "一年以下";
          } else if (rowData.ballAge == 2) {
              return "一到三年";
          } else if (rowData.ballAge == 3) {
              return "三到五年";
          } else if (rowData.ballAge == 4) {
              return "五到十年";
          } else if (rowData.ballAge == 5) {
              return "十年以上";
          } else {
              return "暂无";
          }
      }
  }
  COLUMNS.ballAge = { ...objBase, width: 90,formatter: function (rowData) {
      if (rowData.ballAge == 1) {
          return "一年以下";
      } else if (rowData.ballAge == 2) {
          return "一到三年";
      } else if (rowData.ballAge == 3) {
          return "三到五年";
      } else if (rowData.ballAge == 4) {
          return "五到十年";
      } else if (rowData.ballAge == 5) {
          return "十年以上";
      } else {
          return "";
      }
  } };
  F_ITEMS.ballAge = {
      ...objBase,
      type: "select",
      options: [
          { label: "一年以下", value: 1 },
          { label: "一到三年", value: 2 },
          { label: "三到五年", value: 3 },
          { label: "五到十年", value: 4 },
          { label: "十年以上", value: 5 }
      ]
  };
}

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

  console.log("obj:######", obj);
  util.reformCFListItem(obj)

export default obj
