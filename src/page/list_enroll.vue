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
      <!-- 选择赛事和场馆 -->
      <template v-slot:slot_form_item_matchInfo="{formData}">
        <match_venue v-model="formData.cityVenueId" :matchId="formData.matchId"></match_venue>
      </template>
      <!-- 赛事场馆详情 -->
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
  mixins: [PUB.listCF.tangball_enroll],
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
      if (row.matchMsg.matchForm == 2) {
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
              if (row.time) {
                var dt = new Date(row.time);
                return dt.toLocaleDateString() + dt.toLocaleTimeString();
              } else {
                return "暂无报名时间";
              }
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
      this.cfList.formItems = util.deepCopy(PUB.listCF.tangball_enroll.data().cfList.formItems);
      console.log(row);
    },
    showModify(row) {
      //报名球员和赛事不允许修改
      let cf_item_memberId = {
        label: "报名球员",
        prop: "memberId",
        type: "ajax_populate",
        cfAjaxPopulate: { populateKey: "name", page: "tangball_member" }
      };

      let cf_item_matchId = {
        label: "赛事",
        prop: "matchId",
        type: "ajax_populate",
        cfAjaxPopulate: { populateKey: "matchName", page: "tangball_match" }
      };

      if (row.matchMsg.matchForm == 2) {
        this.cfList.formItems = [
          cf_item_memberId,
          cf_item_matchId,

          
          {
            label: "赛事信息",
            prop: "cityVenueId",
            slot: "slot_form_item_matchInfo"
          },
          {
            label: "队伍信息",
            prop: "groups",
            slot: "slot_form_item_groups"
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
        ];
      } else {
        this.cfList.formItems = util.deepCopy(PUB.listCF.tangball_enroll.data().cfList.formItems);
        let index_memberId = this.cfList.formItems.findIndex(
          item => item.prop == "memberId"
        );
        this.$set(this.cfList.formItems, index_memberId, cf_item_memberId);
        let index_matchId = this.cfList.formItems.findIndex(
          item => item.prop == "matchId"
        );
        this.$set(this.cfList.formItems, index_matchId, cf_item_matchId);
      }
    }
  },
  data() {
    return {
      showDialogBigImg: false
    };
  }
};
</script>


<style scoped>
</style>
