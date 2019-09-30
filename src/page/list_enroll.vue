<template>
  <div class>
    <el-dialog
      custom-class="n-el-dialog"
      width="70%"
      title="显示大图"
      :close-on-press-escape="false"
      v-bind:visible.sync="showDialogBigImg"
      v-if="showDialogBigImg"
    >
      <div class="TAC">
        <img :src="urlBigImg" alt />
      </div>
    </el-dialog>
    <dm_list_data :cf="cfList" 
    @after-show-Dialog-Add="showAdd" 
     @after-show-Dialog-Modify='showModify'
     @after-show-Dialog-Detail='showDetail'>
      <!-- 选择赛事和场馆 -->
      <template v-slot:slot_form_item_matchInfo="{formData}">
     
        <match_venue v-model="formData.cityVenueId" :matchId="formData.matchId"></match_venue>
      </template>
      <!-- 报名订单插槽 -->
      <template v-slot:slot_form_item_orderId="{formData}">
        <enroll_orderId v-model="formData.orderId"></enroll_orderId>
      </template>

      <template v-slot:slot_detail_item_album="{row}">
        <div class v-if="row.album && row.album.length">
          <img
            @click="showBigImg(item.url)"
            :src="item.url"
            alt
            v-for="item in row.album"
            :key="item.url"
            class="W100 H100"
          />
        </div>
      </template>
      <!--详情弹窗的 memberId 字段组件，注意插槽命名-->
      <template v-slot:slot_detail_item_memberId="{row}">
        <dm_ajax_populate :id="row.memberId" populateKey="name" page="tangball_member">
          <template v-slot:default="{doc}">
            <div class v-if="doc && doc.P1">
              {{doc.P1}}
              (
              {{doc.name}})
            </div>
          </template>
        </dm_ajax_populate>
      </template>

      <!--详情弹窗的 matchId 字段组件，注意插槽命名-->
      <template v-slot:slot_detail_item_matchId="{row}">
        <dm_ajax_populate :id="row.matchId" populateKey="matchName" page="tangball_match">
          <template v-slot:default="{doc}">
            <div class v-if="doc && doc.P1">
              {{doc.P1}}
              (
              {{doc.matchName}})
            </div>
          </template>
        </dm_ajax_populate>
      </template>
    </dm_list_data>
  </div>
</template>
<script>
import match_venue from "@/components/form_item/match_venue.vue";
import enroll_orderId from "@/components/enroll_orderId";
export default {
  components: {  match_venue ,enroll_orderId},
  mixins: [PUB.listCF.tangball_enroll],
  methods: {
    showBigImg(url) {
      this.showDialogBigImg = true;
      this.urlBigImg = url;
    },
    showDetail(row){
      console.log(row);
      
      if (row.matchMsg.matchForm==2) {
        this.cfList.detailItems = [
          {
            label: "报名会员id",
            prop: "memberId",
            slot: "slot_detail_item_memberId"
          },
          {
            label: "赛事id",
            prop: "matchId",
            slot: "slot_detail_item_matchId"
          },
          {
            label: "城市场馆id",
            prop: "cityVenueId"
          },
          {
            label: "队伍信息",
            prop: "cityVenueId"
          },
          {
            label: "报名时间",
            prop: "time",
            formatter: function (row) {
              if (row.time) {
                var dt=new Date(row.time);
              return dt.toLocaleDateString()+dt.toLocaleTimeString()
              }else{
                return '暂无报名时间'
              }
            }
          },
          {
            label: "支付状态",
            prop: "payStatus",
            width: 100,
            formatter: function (rowData) {
              if (rowData.payStatus == 2) {
                return "已支付";
              } else {
                return "未支付";
              }
            }
          },
          {
            label: "审核状态",
            prop: "auditStatus",
            width: 100,
            formatter: function (rowData) {
              if (rowData.auditStatus == 1) {
                return "未审核";
              } else if (rowData.auditStatus == 2) {
                return "审核不通过";
              } else {
                return "审核通过";
              }
            }
          }
        ]
      }else{
       this.cfList.detailItems = PUB.listCF.tangball_enroll.data().cfList.detailItems
        
      }
      
    },
    showAdd(row){
      console.log(row);
    },
    showModify(row){
      if (row.matchMsg.matchForm==2) {
        this.cfList.formItems = [
           {
            label: "报名会员",
            prop: "memberId",

            type: "select",
            ajax: {
              url: "/crossList?page=tangball_member",
              keyLabel: "name",
              keyValue: "P1"
            },
            rules: [{ required: true, message: "报名会员" }]
          },
          {
            label: "赛事",
            prop: "matchId",

            type: "select",
            ajax: {
              url: "/crossList?page=tangball_match",
              keyLabel: "matchName",
              keyValue: "P1"
            },
            rules: [{ required: true, message: "赛事" }]
          },
          {
            label: "赛事信息",
            prop: "cityVenueId",
            slot: "slot_form_item_matchInfo"
          },
          {
            label: "队伍信息",
            prop: "cityVenueId",
            slot: "slot_form_item_matchInfo"
          },
          {
            label: "报名时间",
            prop: "time",

            type: "date"
          },
          {
            label: "支付状态",
            prop: "payStatus",
            type: "select",
            options: [
              { label: "已支付", value: 2 },
              { label: "未支付", value: 1 }
            ]
          },
          {
            label: "审核状态",
            prop: "auditStatus",
            type: "select",
            options: [
              { label: "未审核", value: 1 },
              { label: "审核不通过", value: 2 },
              { label: "审核通过", value: 3 }
            ]
          }
        ]
      }else{
       this.cfList.formItems = PUB.listCF.tangball_enroll.data().cfList.formItems
        
      }
    }
  },
  data() {
    return {
      showDialogBigImg: false,
     
    };
  }
};
</script>


<style scoped>
</style>
