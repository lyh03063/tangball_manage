
export default {
  powerPath: "systemManage.list_admin",//权限路径
    listIndex: "list_admin", //vuex对应的字段
    focusMenu:true,//进行菜单聚焦
    twoTitle: "系统管理",
    threeTitle: "管理员",
    flag:true,
    url: {
      // list:"/list_login",
      list: "/crossList?page=tangball_admin", //列表接口
      add: "/crossAdd?page=tangball_admin", //新增接口
      modify: "/crossModify?page=tangball_admin", //修改接口
      detail: "/crossDetail?page=tangball_admin", //修改接口
      delete: "/crossDelete?page=tangball_admin" //删除接口
    },
    //-------列配置数组-------
    columns: [
      COLUMNS.Id,
      {
        label: "用户名",
        prop: "userName",
        width: 200
      },
      {
        label: "密码",
        prop: "passWord",
        width: 200
      },
       {
        label: "昵称",
        prop: "nickName",
        width: 200
      },
      
    ],
    //-------筛选表单字段数组-------
    searchFormItems: [
      {
        label: "数据id",
        prop: "P1",
        type: "input"
      }
    ],
    //-------详情字段数组-------
    detailItems: [
      COLUMNS.Id,
      {
        label: "用户名",
        prop: "userName"
      },
      {
        label: "密码",
        prop: "passWord"
      },
      
    ],
    //-------新增、修改表单字段数组-------
    formItems: [
      {
        label: "用户名",
        prop: "userName",
        type: "input"
      },
      {
        label: "密码",
        prop: "passWord",
        type: "passWord"
      },
      {
        label: "昵称",
        prop: "nickName",
        type: "input"
      },
      {
        label: "所属角色",
        prop: "role",
        type: "select",
        ajax: {
    
          url: "/crossList?page=tangball_role",
          keyLabel: "name",
          keyValue: "P1"
        }
      },
    ]
  }
