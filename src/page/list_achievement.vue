<template>
  <div class>
    <listData :cf="cfList">
      <!-- 城市赛场馆(新增/修改表单) -->
      <template v-slot:slot_form_item_matchInfo="{formData}">
        <member_enroll
          v-model="formData.cityVenueId"
          :matchId="formData.matchId"
          :memberId="formData.participantsId"
        ></member_enroll>
      </template>
      <!--详情弹窗的 participantsId 字段组件，注意插槽命名-->
      <template v-slot:slot_detail_item_participantsId="{row}">
        <ajax_populate :id="row.participantsId" populateKey="name" page="tangball_member">
          <template v-slot:default="{doc}">
            {{doc.P1}}
            (
            {{doc.name}})
          </template>
        </ajax_populate>
      </template>
      <!--详情弹窗的 matchId 字段组件，注意插槽命名-->
      <template v-slot:slot_detail_item_matchId="{row}">
        <ajax_populate :id="row.matchId" populateKey="matchName" page="tangball_match">
          <template v-slot:default="{doc}">
            {{doc.P1}}
            (
            {{doc.matchName}})
          </template>
        </ajax_populate>
      </template>
      <!--详情弹窗的 cityVenueId 字段组件，注意插槽命名-->
      <template v-slot:slot_detail_item_cityVenueId="{row}">
        <ajax_populate :id="row.cityVenueId" populateKey="name" page="tangball_venue">
          <template v-slot:default="{doc}">
            {{doc.P1}}
            (
            {{doc.name}})
          </template>
        </ajax_populate>
      </template>

      <!-- 赛程联动下拉框 ,通过matchId进行初始化-->
      <template v-slot:slot_modify_item_matchProgress="{formData}">
        <select_match_progress
          v-model="formData.matchProgress"
          :matchType="formData.matchType"
          :matchId="formData.matchId"
        ></select_match_progress>
      </template>
      <template v-slot:slot_detmember_enrollail_item_matchProgress="row">
        <achievement_matchProgress :matchProgress="row.row.matchProgress" ></achievement_matchProgress>
      </template>
      <template v-slot:slot_detail_item_matchProgress="row">
        <achievement_matchProgress :matchProgress="row.row.matchProgress" ></achievement_matchProgress>
      </template>
      
    </listData>
  </div>
</template>
<script>
import listData from "../components/list-data/list-data.vue";
import ajax_populate from "../components/common/ajax_populate.vue";
import select_match_progress from "../components/form_item/select_match_progress.vue";
import member_enroll from "../components/form_item/member_enroll.vue";
import achievement_matchProgress from "../components/form_item/achievement_matchProgress.vue";
export default {
  components: { listData, ajax_populate, select_match_progress, member_enroll,achievement_matchProgress },
  data() {
    return {
      cfList: {
        listIndex: "list_achievement", //vuex对应的字段
        twoTitle: "赛事",
        threeTitle: "比赛成绩",
        flag: true,
        url: {
          list: "http://120.76.160.41:3000/crossList?page=tangball_achievement", //列表接口
          add: "http://120.76.160.41:3000/crossAdd?page=tangball_achievement", //新增接口
          modify:
            "http://120.76.160.41:3000/crossModify?page=tangball_achievement", //修改接口
          detail:
            "http://120.76.160.41:3000/crossDetail?page=tangball_achievement", //查看单条数据详情接口，在修改表单或详情弹窗用到

          delete:
            "http://120.76.160.41:3000/crossDelete?page=tangball_achievement" //删除接口
        },
        //-------列配置数组-------
        columns: [
          {
            label: "参赛人Id",
            prop: "participantsId",
            slot: "slot_detail_item_participantsId",
            width: 120
          },

          {
            label: "赛事ID",
            prop: "matchId",
            slot: "slot_detail_item_matchId",
            width: 160
          },
          {
            label: "城市赛场馆",
            prop: "cityVenueId",
            slot: "slot_detail_item_cityVenueId",
            width: 150
          },
          {
            label: "赛事阶段",
            prop: "matchProgress",
            width: 180,
            slot:"slot_detmember_enrollail_item_matchProgress"
          },
          {
            label: "比赛得分",
            prop: "matchScore",
            width: 90
          },
          {
            label: "名次",
            prop: "ranking",
            width: 70
          }
        ],
        //-------筛选表单字段数组-------
        searchFormItems: [
          {
            label: "参赛人Id",
            prop: "participantsId"
          },

          {
            label: "赛事ID",
            prop: "matchId"
          }
        ],
        //-------详情字段数组-------
        detailItems: [
          {
            label: "参赛人Id",
            prop: "participantsId",
            slot: "slot_detail_item_participantsId"
          },
          {
            label: "赛事ID",
            prop: "matchId",
            slot: "slot_detail_item_matchId"
          },
          {
            label: "赛事阶段",
            prop: "matchProgress",
            slot:"slot_detail_item_matchProgress"
          },
          {
            label: "比赛得分",
            prop: "matchScore"
          },
          {
            label: "名次",
            prop: "ranking"
          }
        ],
        //-------新增、修改表单字段数组-------
        formItems: [
          {
            label: "参赛人Id",
            prop: "participantsId",
            type: "select",
            ajax: {
              url: "http://120.76.160.41:3000/crossList?page=tangball_member",
              keyLabel: "name",
              keyValue: "P1"
            }
          },

          {
            label: "赛事ID",
            prop: "matchId",
            type: "select",
            ajax: {
              url: "http://120.76.160.41:3000/crossList?page=tangball_match",
              keyLabel: "matchName",
              keyValue: "P1"
            }
          },
          {
            label: "赛事报名信息",
            prop: "memberId",
            slot: "slot_form_item_matchInfo"
          },
          {
            label: "赛事阶段",
            prop: "matchProgress",
            type: "select",
            slot: "slot_modify_item_matchProgress"
          },
          {
            label: "比赛得分",
            prop: "matchScore",
            type: "input"
          }
         
        ]
      }
    };
  },
  beforeCreate() {
    this.$store.commit("changeActiveMenu", "listCategory"); //菜单聚焦
  },
  methods: {}
};
</script>


<style scoped>

</style>
