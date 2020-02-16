<template>
  <div class>
    <!--弹出图片显示 -->
    <!-- <el-dialog
      custom-class="n-el-dialog"
      width="70%"
      title="显示大图"
      :close-on-press-escape="false"
      v-bind:visible.sync="showDialogBigImg"
      v-if="showDialogBigImg"
    >
      <div class="TAC">
        <img :src="urlBigImg" alt>
      </div>
    </el-dialog>-->
<div class="" >xxxxx</div>
    <dm_list_data :cf="cfList">
      <template v-slot:slot_area="{formData}">
        <!-- <select_city v-model="formData.area" value-type="cityId"></select_city> -->
       
        <select_city v-model="formData.area" value-type="lastId" level="2"></select_city>
      </template>
      <!--弹出图片显示点击事件 -->
      <template v-slot:slot_detail_item_album="{row}">
        <openPhoto v-model="row.album"></openPhoto>
      </template>
      <template v-slot:slot_detail_item_franchiseeId="{row}">
        
          <dm_ajax_populate
            :id="row.franchiseeId"
            populateKey="name"
            page="tangball_franchisee"
            idKey="P1"
          ></dm_ajax_populate>
        </template>
    </dm_list_data>
  </div>
</template>
<script>
import select_city from "@/components/form_item/select_city.vue";
import openPhoto from "@/components/common/openPhoto/openPhoto.vue";
export default {
  components: { select_city, openPhoto },
  methods: {
    // showBigImg(url) {
    //   this.showDialogBigImg = true;
    //   this.urlBigImg = url;
    // }
  },
  watch: {
    formData: {
      handler: function() {},
      deep: true //深度监听
    }
  },
  data() {
    let cfList = util.deepCopy(PUB.listCF.tangball_venue)
    cfList.findJsonDefault = {
      franchiseeId:localStorage.franchisee_P1
    }
    cfList.formDataAddInit = { franchiseeId:localStorage.franchisee_P1}
    cfList.listIndex = 'franchisee_venue'
    cfList.columns = [
      {
       label: "编号",
       prop: "P1",
       width: 70
     },
     {
       label: "场馆名称",
       prop: "name",
       width: 170
     },
     {
       label: "城市",
       prop: "area",
       width: 160,
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
       width: 150,
       formatter: function(row) {
         return moment(row.time).format("YYYY-MM-DD HH:DD");
       }
     },
     {
       label: "联系方式",
       prop: "phoneNumber",
       width: 140
     }
    ]
    cfList.searchFormItems = [
      {
       label: "场馆编号",
       prop: "P1",
       type: "input"
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
    ]
    cfList.formItems = [{
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
    return {
      // showDialogBigImg: false,
      cfList
      
    };
  },created(){

  }
};
</script>


<style>
</style>
