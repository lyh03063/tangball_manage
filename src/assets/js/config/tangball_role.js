//函数定义：{获取菜单权限表单配置函数}
function getFormMenuGPower({ menuName = "XXX" }) {
  

  return {
    col_span: 4,
    labelWidth: "10px",
    formItems: [
      {
        label: "",
        prop: "menuName",
        default: menuName,
        col_span: 4,
        type: "text"
      },
      {
        label: "",
        prop: "add",
        col_span: 3,
        type: "checkbox",
        default: false,
        options: [{ value: "1", label: "添加" }]
      },
      {
        label: "",
        prop: "modify",
        col_span: 3,
        type: "checkbox",
        default: false,
        options: [{ value: "1", label: "修改" }]
      },
      {
        label: "",
        prop: "search",
        col_span: 3,
        type: "checkbox",
        default: false,
        options: [{ value: "1", label: "查询" }]
      },
      {
        label: "",
        prop: "delete",
        col_span: 3,
        type: "checkbox",
        default: false,
        options: [{ value: "1", label: "删除" }]
      }
    ]
  };
}

let styleMenuPowerItem = `margin-bottom:10px;padding:0 5px`;
let styleMenuGPowerItem = `margin-bottom:0;border:none;padding:0`;
export default {
  powerPath: "systemManage.list_role",//权限路径
  listIndex: "list_role", //vuex对应的字段
  isRefreshAfterCUD:true,//是否在增删改操作后刷新列表
  focusMenu: true,//进行菜单聚焦
  twoTitle: "系统管理",
  threeTitle: "角色",
  flag: true,
  url: {
    // list:"/list_login",
    list: "/crossList?page=tangball_role", //列表接口
    add: "/crossAdd?page=tangball_role", //新增接口
    modify: "/crossModify?page=tangball_role", //修改接口
    detail: "/crossDetail?page=tangball_role", //修改接口
    delete: "/crossDelete?page=tangball_role" //删除接口
  },
  //-------列配置数组-------
  
  columns: [
    COLUMNS.Id,
    COLUMNS.roleName,
    COLUMNS.rolePower
  ],
  //-------筛选表单字段数组-------
  searchFormItems: [
    F_ITEMS.Id
  ],
  //-------详情字段数组-------
  detailItems: [
    COLUMNS.Id,
    COLUMNS.roleName,
    COLUMNS.rolePower
  ],
  //-------新增、修改表单字段数组-------
  formItems: [
    {
      label: "角色名",
      prop: "name",
      type: "input"
    },
    // {
    //   label: "权限",
    //   prop: "power",
    //   type: "jsonEditor"
    // },
    {
      label: "权限",

      prop: "power",
      default: {},
      cfForm: {
        labelWidth: "150px",
        formItems: [
          {
            label: "赛事中心",
            prop: "matchCenter",
            style: styleMenuGPowerItem,
            default: {},
            cfForm: {
              col_span: 12,
              formItems: [
                {
                  // label: "赛事列表",
                  prop: "list_match",
                  style: styleMenuPowerItem,
                  cfForm: getFormMenuGPower({menuName:"赛事列表"})
                },
                {
                  // label: "成绩列表",
                  prop: "list_achievement",
                  style: styleMenuPowerItem,
                  cfForm: getFormMenuGPower({menuName:"成绩列表"})
                },
                {
                  prop: "list_enroll",
                  style: styleMenuPowerItem,
                  cfForm: getFormMenuGPower({menuName:"报名列表"})
                },
                {
                  prop: "list_rule",
                  style: styleMenuPowerItem,
                  cfForm: getFormMenuGPower({menuName:"规则库"})
                },
                {
                  prop: "list_team",
                  style: styleMenuPowerItem,
                  cfForm: getFormMenuGPower({menuName:"球队"})
                },
                {
                  prop: "list_group",
                  style: styleMenuPowerItem,
                  cfForm: getFormMenuGPower({menuName:"对阵分组"})
                }
              ]
            }
          },
          {
            label: "球员信息库",
            prop: "memberCenter",
            style: styleMenuGPowerItem,
            default: {},
            cfForm: {
              col_span: 12,
              formItems: [
                {
                  // label: "资讯列表",
                  prop: "list_member",
                  style: styleMenuPowerItem,
                  cfForm: getFormMenuGPower({menuName:"球员"})
                }
              ]
            }
          },
          {
            label: "唐球场",
            prop: "venue",
            style: styleMenuGPowerItem,
            default: {},
            cfForm: {
              col_span: 12,
              formItems: [
                {
              
                  prop: "list_venue",
                  style: styleMenuPowerItem,
                  cfForm: getFormMenuGPower({menuName:"唐球场"})
                },
                {
                 
                  prop: "list_franchisee",
                  style: styleMenuPowerItem,
                  cfForm: getFormMenuGPower({menuName:"加盟商"})
                },
                {
       
                  prop: "list_area",
                  style: styleMenuPowerItem,
                  cfForm: getFormMenuGPower({menuName:"地区管理"})
                }
              ]
            }
          },
          {
            label: "资讯中心",
            prop: "newsCenter",
            style: styleMenuGPowerItem,
            default: {},
            cfForm: {
              col_span: 12,
              formItems: [
                {
                  // label: "资讯列表",
                  prop: "list_article",
                  style: styleMenuPowerItem,
                  cfForm: getFormMenuGPower({menuName:"资讯列表"})
                },
                {
                  // label: "资讯分类",
                  prop: "list_article_category",
                  style: styleMenuPowerItem,
                  cfForm: getFormMenuGPower({menuName:"资讯分类"})
                },
                {
       
                  prop: "list_recommend",
                  style: styleMenuPowerItem,
                  cfForm: getFormMenuGPower({menuName:"首页轮播图"})
                },
                {
       
                  prop: "home_page_title",
                  style: styleMenuPowerItem,
                  cfForm: {
                    col_span: 4,
                    labelWidth: "10px",
                    formItems: [
                      {
                        label: "",
                        prop: "menuName",
                        default: "首页推荐内容",
                        col_span: 4,
                        type: "text"
                      },
                      
                      {
                        label: "",
                        prop: "search",
                        col_span: 3,
                        type: "checkbox",
                        default: false,
                        options: [{ value: "1", label: "操作" }]
                      }
                    ]
                  }
                }
              ]
            }
          },
          {
            label: "招商管理",
            prop: "sponsorCenter",
            style: styleMenuGPowerItem,
            default: {},
            cfForm: {
              col_span: 12,
              formItems: [
                {
                  prop: "list_sponsor",
                  style: styleMenuPowerItem,
                  cfForm: getFormMenuGPower({menuName:"赞助商"})
                },
                {
                  prop: "list_sponsorship",
                  style: styleMenuPowerItem,
                  cfForm: getFormMenuGPower({menuName:"赛事赞助"})
                }
              ]
            }
          },
          {
            label: "系统消息",
            prop: "msgCenter",
            style: styleMenuGPowerItem,
            default: {},
            cfForm: {
              col_span: 12,
              formItems: [
                {
                  prop: "list_msg",
                  style: styleMenuPowerItem,
                  cfForm: getFormMenuGPower({menuName:"消息列表"})
                },
                {
                  prop: "list_msg_read",
                  style: styleMenuPowerItem,
                  cfForm: getFormMenuGPower({menuName:"消息已读记录"})
                }
              ]
            }
          },
          {
            label: "系统管理",
            prop: "systemManage",
            style: styleMenuGPowerItem,
            default: {},
            cfForm: {
              col_span: 12,
              formItems: [
                {
                  prop: "list_admin",
                  style: styleMenuPowerItem,
                  cfForm: getFormMenuGPower({menuName:"管理员"})
                },
                {
                  prop: "list_role",
                  style: styleMenuPowerItem,
                  cfForm: getFormMenuGPower({menuName:"角色"})
                }
              ]
            }
          }
        ]
      }
    },
  ]
}
