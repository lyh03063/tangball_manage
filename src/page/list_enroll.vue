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
    <dm_list_data
      :cf="cfList"
      @after-show-Dialog-Add="showAdd"
      @after-show-Dialog-Modify="showModify"
      @after-show-Dialog-Detail="showDetail"
      @after-modify="modifyEnroll"
      @after-add="addEnroll"
    >
      <!-- 选择赛事和球场 -->
      <template v-slot:slot_form_item_matchInfo="{formData}">
        <match_venue v-model="formData.cityVenueId" :matchId="formData.matchId"></match_venue>
      </template>
      <!-- 赛事球场详情 -->
      <template v-slot:slot_detail_item_matchInfo="{row}">
        <match_venue v-model="row.cityVenueId" :matchId="row.matchId" :readOnly="true"></match_venue>
      </template>
      <!-- 报名订单插槽 -->
      <template v-slot:slot_form_item_orderId="{formData}">
        <enroll_orderId v-model="formData.orderId"></enroll_orderId>
      </template>
      <!-- 新增修改队伍信息插槽 -->
      <template v-slot:slot_form_item_groups="{formData}">
        <from_groups
          v-model="formData.groups"
          :orderId="formData.orderId"
          :matchId="formData.matchId"
        ></from_groups>
      </template>
      <!-- 队伍信息详情插槽 -->
      <template v-slot:slot_detail_item_groups="{row}">
        <groups_detail v-model="row.orderId"></groups_detail>
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
import from_groups from "@/components/from_groups";
import groups_detail from "@/components/groups_detail";
export default {
  components: { match_venue, enroll_orderId, from_groups, groups_detail },
  // mixins: [PUB.listCF.tangball_enroll],
  data() {
    let cfList = util.deepCopy(PUB.listCF.tangball_enroll);
    return {
      cfList,
      showDialogBigImg: false
    };
  },
  methods: {
    async addEnroll(newData, oldData) {
      let { data } = await axios({
        method: "post",
        url: PUB.domain + "/crossAdd?page=tangball_team",
        data: {
          data: oldData.groups
        }
      }).catch(() => {});
    },
    async modifyEnroll(newData, oldData) {
      let { data } = await axios({
        method: "post",
        url: PUB.domain + "/crossModify?page=tangball_team",
        data: {
          findJson: {
            P1: newData.groups.P1
          },
          modifyJson: newData.groups
        }
      }).catch(() => {});
    },
    showBigImg(url) {
      this.showDialogBigImg = true;
      this.urlBigImg = url;
    },
    showDetail(row) {
      if (row.matchDoc.matchForm == 2) {
        this.cfList.detailItems = [
          {
            label: "报名球员",
            prop: "memberId",
            slot: "slot_detail_item_memberId"
          },
          {
            label: "赛事",
            prop: "matchId",
            slot: "slot_detail_item_matchId"
          },
          {
            label: "赛事信息",
            prop: "cityVenueId",
            slot: "slot_detail_item_matchInfo"
          },
          {
            label: "队伍信息",
            prop: "groups",
            slot: "slot_detail_item_groups"
          },
          {
            label: "报名时间",
            prop: "time",
            formatter: function(row) {
              return moment(row.time).format("YYYY-MM-DD HH:mm");
            }
          },
          {
            label: "支付状态",
            prop: "payStatus",
            width: 100,
            formatter: function(rowData) {
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
            formatter: function(rowData) {
              if (rowData.auditStatus == 1) {
                return "未审核";
              } else if (rowData.auditStatus == 2) {
                return "审核不通过";
              } else {
                return "审核通过";
              }
            }
          }
        ];
      } else {
        this.cfList.detailItems = PUB.listCF.tangball_enroll.data().cfList.detailItems;
      }
    },
    showAdd(row) {
      //还原配置（formItems是共用的，可能被showModify修改）
      this.cfList.formItems = util.deepCopy(
        PUB.listCF.tangball_enroll.data().cfList.formItems
      );
      console.log(row);
    },
    showModify(row) {
      //报名球员和赛事不允许修改

      if (row.matchDoc.matchForm == 2) {
        this.cfList.formItems = [
          F_ITEMS.memberId_readonly,
          F_ITEMS.matchId_readonly,
          F_ITEMS.matchInfo,
          F_ITEMS.groups,
          F_ITEMS.time,
          F_ITEMS.payStatus,
          F_ITEMS.auditStatus
        ];
      } else {
        this.cfList.formItems = util.deepCopy(
          PUB.listCF.tangball_enroll.data().cfList.formItems
        );
        //调用：{处理字段数组的某个字段配置的函数}
        this.$handelItem({
          action: "replace",
          items: this.cfList.formItems,
          prop: "memberId",
          itemNew: F_ITEMS.memberId_readonly
        });
        //调用：{处理字段数组的某个字段配置的函数}
        this.$handelItem({
          action: "replace",
          items: this.cfList.formItems,
          prop: "matchId",
          itemNew: F_ITEMS.matchId_readonly
        });
      }
    }
  },
  created() {
    this.cfList.batchBtns = {
      addon: [util.cfList.bBtns.delete], //空数组表示没有操作按钮
      tips: {
        text: "数据来源于小程序或赛事的“报名表”中添加"
        // style:{"color":"#3a0"}
      }
    };
    this.cfList.singleBtns = {
      //空数组表示没有操作按钮
      addon: [
        util.cfList.sBtns.detail,
      ]
    };
  }
};
</script>


<style scoped>
</style>
