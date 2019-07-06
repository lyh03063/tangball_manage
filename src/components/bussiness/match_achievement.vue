<template>
  <div class>
    <div class="TAC FS18 LH40">标题</div>
    <div class="TAC FS18 LH40">当前赛事进度</div>

    <div class>
      <div class="FWB">城市赛（时间2019-4-5到2019-6-5）</div>
      <div class="" >城市选项卡</div>
      <div class="" >赛事阶段选项卡</div>

      <listData :cf="cfList">
        <!--详情弹窗的 participantsId 字段组件，注意插槽命名-->
        <template v-slot:slot_detail_item_participantsId="{row}">
          <ajax_populate :id="row.participantsId" populateKey="name" page="tangball_member">
            <template v-slot:default="{doc}">
              <div class v-if="doc && doc.P1">
                {{doc.P1}}
                (
                {{doc.name}})
              </div>
            </template>
          </ajax_populate>
        </template>
        <!--详情弹窗的 matchId 字段组件，注意插槽命名-->
        <template v-slot:slot_detail_item_matchId="{row}">
          <ajax_populate :id="row.matchId" populateKey="matchName" page="tangball_match">
            <template v-slot:default="{doc}">
              <div class v-if="doc && doc.P1">
                {{doc.P1}}
                (
                {{doc.matchName}})
              </div>
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
      </listData>
    </div>
  </div>
</template>

<script>
import listData from "../list-data/list-data.vue";
import ajax_populate from "../common/ajax_populate.vue";
import select_match_progress from "../form_item/select_match_progress.vue";
export default {
  components: { listData, ajax_populate, select_match_progress },
  props: {
    matchId: [String, Number]
  },
  data() {
    return {
      cfList: {
        isShowSearchForm: false, //隐藏查询表单
        isShowBreadcrumb: false, //隐藏面包屑导航
        isShowPageLink: false, //隐藏分页
        // isShowOperateColumn: false, //隐藏操作列
        //默认查询参数
        findJsonDefault: { matchId: 37,"matchProgress.smallProgress" : 22,"cityId" : 111 },

        listIndex: "match_achievement", //vuex对应的字段
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
            label: "参赛人",
            prop: "participantsId",
            slot: "slot_detail_item_participantsId",
            width: 150
          },

          {
            label: "赛事ID",
            prop: "matchId",
            slot: "slot_detail_item_matchId",
            width: 200
          },
          {
            label: "赛事阶段",
            prop: "matchProgress",
            width: 300
          },
          {
            label: "比赛得分",
            prop: "matchScore",
            width: 90
          },
          {
            label: "名次",
            prop: "ranking",
            "min-width": "150"
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
            prop: "matchProgress"
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
          // {
          //   label: "名次",
          //   prop: "ranking",
          //   type: "input"
          // }
        ]
      }
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
