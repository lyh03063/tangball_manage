<template>
  <div class>
      <dm_list_data :cf="cfList">
          <template v-slot:slot_form_item_phone="{formData}">
              <!-- {{formData}} -->
              <verify_phone v-model="formData.phone"></verify_phone>
         </template>
         <template v-slot:slot_detail_item_franchiseeId="{row}">
          <dm_ajax_populate
            :id="row.franchiseeId"
            populateKey="name"
            page="tangball_franchisee"
            idKey="P1"
          ></dm_ajax_populate>
        </template>
      <template v-slot:slot_detail_item_venueId="{row}">
          <dm_ajax_populate
            :id="row.venueId"
            populateKey="name"
            page="tangball_venue"
            idKey="P1"
          ></dm_ajax_populate>
        </template>
      </dm_list_data>
  </div>
</template>

<script>
import verify_phone from "@/components/verify_phone.vue";
export default {
  components:{verify_phone},
  data() {
    let cfList =PUB.listCF.tangball_member
    cfList.listIndex = 'franchisee_member'
    cfList.bactchBtns = {
          delete: false,
          add: true, //配置基础按钮隐藏（默认显示）,
          tips: {
            text: ""
            // style:{"color":"#3a0"}
          }
    },
    cfList.formDataAddInit = { franchiseeId:localStorage.franchisee_P1}
    cfList.findJsonDefault = {
      franchiseeId:localStorage.franchisee_P1
    },
    cfList.columns = [
       {
        label: "会员号",
        prop: "P1",
        width: 80
      },
      {
        label: "球员姓名",
        prop: "name",
        width: 100
      },
      {
        label: "微信openid",
        prop: "openid",
        width: 130
      },
       {
        label: "性别",
        prop: "sex",
        width: 65,
        formatter:function(data) {
          if (data.sex==1) {
            return '男'
          }else{
            return '女'
          }
        }
      },
      {
        label: "手机号",
        prop: "phone",
        width: 130
      },
      {
        label: "所属加盟商",
        prop: "franchiseeId",
        width: 130,
        formatter:function (data) {
          if (data.franchisee) {
            return data.franchisee.name?data.franchisee.name:'无'
          }
        }
      },
      {
        label: "所属球场",
        prop: "venueId",
        width: 130,
        formatter:function (data) {
          if (data.venue) {
            return data.venue.name?data.venue.name:"无"
          }
        }
      },
      {
        label: "参赛次数",
        prop: "entries",
        width: 100,
        // slot:"slot_list_column_entries"

      },
       {
        label: "成绩数",
        prop: "countAchievement",
        width: 80,
        statistics:{listIndex:'list_achievement', targetIdKey:'memberId'}
      },
      // {
      //   label: "唐球积分",
      //   prop: "integral",
      //   width: 65
      // },       
      // {
      //   label: "备注",
      //   prop: "remark",
      //   width: 65
      // },
      {
        label: "职业",
        prop: "career",
        width: 70
      },
      {
        label: "球龄",
        prop: "ballAge",
        width: 100,
        formatter: function(rowData) {
          if (rowData.ballAge == 1) {
            return "一年以下";
          } else if (rowData.ballAge == 2) {
            return "一到三年";
          } else if (rowData.ballAge == 3) {
            return "三到五年";
          } else if (rowData.ballAge == 4) {
            return "五到十年";
          }else if (rowData.ballAge == 5) {
            return "十年以上";
          }else{
            return "暂无";
          }
        }
      }
    ]
    cfList.singleBtns={
          delete: false,
          modify: true
        },
    cfList.formItems = [
     {
        label: "球员姓名",
        prop: "name",
        width: 100
      },
      // {
      //   label: "微信openid",
      //   prop: "openid",
      //   width: 100
      // },
      {
        label: "手机号",
        prop: "phone",
        width: 100,
        slot:'slot_form_item_phone',
        rules:{required: true,message: "手机号不能为空", trigger: 'blur' }
      },
      {
        label: "所属球场",
        prop: "venueId",
        type: "select",
        ajax:{
          url: "/crossList?page=tangball_venue",
          keyLabel: "name",
          keyValue: "P1",
          param:{
            findJson:{
              franchiseeId:localStorage.franchisee_P1
            }
          }
        },
      },
      {
        label: "性别",
        prop: "sex",
        type: "select",
        default:1,
        options: [{ value: 1, label: "男" }, { value: 2, label: "女" }]
      },
      {
        label: "身份证号",
        prop: "idCard",
        width: 100
      },
      {
        label: "备注",
        prop: "remark",
        width: 150
      } ,
      {
        label: "职业",
        prop: "career",
        type: "input"
      },
      {
        label: "球龄",
        prop: "ballAge",
        type: "select",
        options: [
          { label: "一年以下", value: 1 },
          { label: "一到三年", value: 2 },
          { label: "三到五年", value: 3 },
          { label: "五到十年", value: 4 },
          { label: "十年以上", value: 5 }
        ]
      }, 
    ]
    return {
      cfList 
    };
  },
  methods: {
    
  },
  created() {
  }
};
</script>

<style scoped>

</style>