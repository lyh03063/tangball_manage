
export default {
  powerPath: "venue.list_venue",//权限路径
   listIndex: "list_venue", //vuex对应的字段
   focusMenu: true, //进行菜单聚焦
   twoTitle: "赛事",
   threeTitle: "场馆",
   flag: true,
   url: {
     list: "/crossList?page=tangball_venue", //列表接口
     add: "/crossAdd?page=tangball_venue", //新增接口
     modify: "/crossModify?page=tangball_venue", //修改接口
     detail: "/crossDetail?page=tangball_venue", //查看单条数据详情接口，在修改表单或详情弹窗用到
     delete: "/crossDelete?page=tangball_venue" //删除接口
   },
   //dynamicDict动态数据字典配置
   dynamicDict: [
     {
       page: "tangball_franchisee",
       populateColumn: "franchiseeDoc",
       idColumn: "franchiseeId",
       idColumn2: "P1"
     },
     {
       page: "dmagic_area",
       populateColumn: "areaDoc",
       idColumn: "area",
       idColumn2: "P7"
     }
   ],
   //cfDialogForm新增修改弹窗的配置
cfDialogForm: {
  tips:{
    text:`填写经度和纬度时需要用到：
    <a  target="_blank" class="link-blue"  href="http://api.map.baidu.com/lbsapi/getpoint/index.html">百度经纬度拾取坐标系统 &gt;&gt;</a>`,
    style:{color:"#666","padding":"0 0 30px 123px"}
  }
  
},
   //-------列配置数组-------
   columns: [
     {
       label: "编号",
       prop: "P1",
       width: 70
     },
     {
       label: "加盟商",
       prop: "franchiseeId",
       width: 100,
       formatter: function(rowData) {
         return lodash.get(rowData, `franchiseeDoc.name`);
       
       }
     },
     {
       label: "场馆名称",
       prop: "name",
       width: 200
     },
     {
       label: "城市",
       prop: "area",
       width: 180,
        formatter: function(rowData) {
         return lodash.get(rowData, `areaDoc.P2`);
       
       }
     },
    //  {
    //    label: "详细地址",
    //    prop: "address",
    //    width: 100
    //  },
     {
       label: "赛事数量",
       prop: "countMatch",
       width: 100
     },
     {
       label: "加盟时间",
       prop: "time",
       width: 130,
       formatter: function(row) {
         return moment(row.time).format("YYYY-MM-DD");
       }
     },
     {
       label: "联系方式",
       prop: "phoneNumber",
       width: 140
     }
   ],
   //-------筛选表单字段数组-------
   searchFormItems: [
     {
       label: "场馆编号",
       prop: "P1",
       type: "input"
     },
     {
       label: "加盟商",
       prop: "franchiseeId",
       type: "select",
       ajax: {
         url: "/crossList?page=tangball_franchisee",
         keyLabel: "name",
         keyValue: "P1"
       }
     },
     {
       label: "加盟时间",
       prop: "time",
       type: "time_period"
     },
     {
       label: "地区",
       prop: "area"
     }
   ],
   //-------详情字段数组-------
   detailItems: [
     {
       label: "分类编号",
       prop: "P1"
     },
     {
       label: "加盟商",
       prop: "franchiseeId",
       slot:'slot_detail_item_franchiseeId'
     },
     {
       label: "场馆名称",
       prop: "name"
     },
     {
       label: "所属地区",
       prop: "area"
     },
     {
       label: "详细地址",
       prop: "address"
     },
     {
       label: "赛事数量",
       prop: "countMatch"
     },
     {
       label: "加盟时间",
       prop: "time"
     },
     {
       label: "联系方式",
       prop: "phoneNumber"
     },
     {
       label: "相册",
       prop: "album",
       slot: "slot_detail_item_album"
     }
   ],
   //-------新增、修改表单字段数组-------
   formItems: [
     // {
     //   label: "分类编号",
     //   prop: "P1"
     // },
     {
       label: "加盟商",
       prop: "franchiseeId",
       type: "select",
       ajax: {
         url: "/crossList?page=tangball_franchisee",
         keyLabel: "name",
         keyValue: "P1"
       }
     },
     {
       label: "场馆名称",
       prop: "name",
       rules: [{ required: true, message: "不能为空" }]
     },
     {
       label: "所属地区",
       prop: "area",
       slot: "slot_area",
       rules: [{ required: true, message: "不能为空" }]
     },
     {
       label: "详细地址",
       prop: "address",
       rules: [{ required: true, message: "不能为空" }]
     },
     // {
     //   label: "赛事数量",
     //   prop: "countMatch"
     // },
     {
       type: "date",
       label: "加盟时间",
       prop: "time"
     },
     {
       label: "联系方式",
       prop: "phoneNumber",
       rules: [{ required: true, message: "不能为空" }]
     },
     {
       label: "相册",
       prop: "album",
       type: "upload"
     },
     // {
     //   label: "经度",
     //   prop: "extend",
     //   path:"longitude",
     // },
     // {
     //   label: "纬度",
     //   prop: "extend",
     //   path:"latitude",
     // },
     {
       label: "场馆其他信息",
       prop: "extend",
       default: {}, //默认值必须要有，否则新增的时候会出问题
       cfForm: {
         formItems: [
           {
             label: "场馆长宽",
             prop: "venueSize"
           },
           {
             label: "场馆层数",
             prop: "floorCount"
           },
           {
             label: "洞数",
             prop: "holeCount"
           },
           {
             label: "打位数",
             prop: "placesCount"
           },
           {
             label: "联系人",
             prop: "contacts"
           }
         ]
       }
     },
     {
       label: "地图位置信息",
       prop: "extend",
       default: {}, //默认值必须要有，否则新增的时候会出问题
       cfForm: {
         formItems: [
           {
             label: "经度",
             prop: "longitude"
           },
           {
             label: "纬度",
             prop: "latitude"
           }
         ]
       }
     }
     // {
     //   label: "纬度",
     //   prop: "extend.latitude"
     // },

     // {
     //   label: "其他",
     //   prop: "extend",
     //   type: "vueJsonEditor",

     // }
   ]
 }