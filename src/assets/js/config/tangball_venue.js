


let obj={
  powerPath: "venue.list_venue",//权限路径
   listIndex: "list_venue", //vuex对应的字段
   isRefreshAfterCUD:true,//是否在增删改操作后刷新列表
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
    <a  target="_blank" class="n-a-blue"  href="http://api.map.baidu.com/lbsapi/getpoint/index.html">百度经纬度拾取坐标系统 &gt;&gt;</a>`,
    style:{color:"#666","padding":"0 0 30px 123px"}
  }
  
},
   //-------列配置数组-------
   columns: [
   "Id","franchiseeName","venueName","venue_city", "countMatch","joinTime","phoneNumber",
  
   ],
   //-------筛选表单字段数组-------
   searchFormItems: [
    "Id","franchiseeId","joinTime_search","area"
     
   ],
   //-------详情字段数组-------
   detailItems: [
     "Id","franchiseeId","venueName","area","address","countMatch","joinTime","phoneNumber","albumVenue"
     
   ],
   //-------新增、修改表单字段数组-------
   formItems: [
    "franchiseeId","venueName","area","address","joinTime","phoneNumber","albumVenue","venueOtherInfo","positionInfo"
   ]
 }

 util.reformCFListItem(obj)

 export default obj