<template>
  <div class>
    <!--成绩单弹窗-->
    <el-dialog
      custom-class="n-el-dialog"
      width="95%"
      :title="titleDialogAchievement"
      :close-on-press-escape="false"
      :close-on-click-modal="false"
      :append-to-body="true"
      v-bind:visible.sync="showDialogAchievement"
      v-if="showDialogAchievement"
    >
      <div class>
        <match_achievement :matchId="matchId" :debug111="true"></match_achievement>
      </div>
    </el-dialog>
    <!--报名表弹窗-->
    <el-dialog
      custom-class="n-el-dialog"
      width="95%"
      :title="titleDialogEnroll"
      :close-on-press-escape="false"
      :close-on-click-modal="false"
      :append-to-body="true"
      v-bind:visible.sync="showDialogEnroll"
      v-if="showDialogEnroll"
    >
      <div class>
        <match_enroll :matchId="matchId" :debug111="true"></match_enroll>
      </div>
    </el-dialog>
    <dm_list_data :cf="cfList">
      <!-- 成绩列插槽 (列表)-->
      <template v-slot:slot_column_enroll="{row}">
        <a
          href="javascript:;"
          class="link-blue"
          @click="dialogEnroll(row)"
        >报名表({{row.registeredPersons||0}})</a>
      </template>
      <!-- 成绩列插槽 (列表)-->
      <template v-slot:slot_column_achievement="{row}">
        <a href="javascript:;" class="link-blue" @click="dialogAchievement(row)">对阵分组/成绩</a>
      </template>
      <!-- 全国性赛事-城市场馆列表 (新增修改表单)-->
      <template v-slot:slot_form_item_cityVenueList="{formData}">
        <city_venue_list v-model="formData.venue"></city_venue_list>
      </template>
      <!-- 全国性赛事-城市场馆列表-(详情弹窗)-->
      <template v-slot:slot_detail_item_cityVenueList="{row}">
        <dm_debug_list level-up="2">
          <dm_debug_item v-model="row.venue" text="场馆列表" />
        </dm_debug_list>

        <city_venue_list v-model="row.venue" :isEdit="false"></city_venue_list>
      </template>
      <template v-slot:slot_detail_item_album="{row}">
        <img :src="img.url" width="150" height="150" v-for="(img,index) in row.album" :key="index" />
      </template>
      <!-- 赛程联动下拉框 ,通过matchType进行初始化(新增修改表单)-->
      <template v-slot:slot_modify_item_matchProgress="{formData}">
        <select_match_progress v-model="formData.matchProgress" :matchType="formData.matchType"></select_match_progress>
      </template>
      <!-- 自定义组队修改表单插槽 -->
      <template v-slot:slot_form_item_progress="{formData}">
        <custom_progress v-model="formData.progress"></custom_progress>
      </template>
      <!-- 自定义组队详情表单插槽 -->
      <template v-slot:slot_detail_item_progress="{row}">
        <div>
          <div
            v-for="(item,index) in row.progress"
            :key="index"
          >赛程{{index+1}}：{{item.name}}，参与人/队数：{{item.joinPerson}}，决出人/队数：{{item.remainPersom}}，轮数{{item.roundCount}}</div>
          <div>
            最终赛程：&nbsp;&nbsp;&nbsp;
            <span
              v-for="(item,index) in row.progress"
              :key="index"
            >{{item.name}}{{index==row.progress.length-1?'':'→'}}</span>
          </div>
          <div v-for="item in row.progress" :key="item.remainPersom+item.name">
            <div v-if="item.checked==true">当前赛程：{{item.name}}</div>
            <div></div>
          </div>
        </div>
      </template>
    </dm_list_data>
  </div>
</template>
<script>
import city_venue_list from "@/components/form_item/city_venue_list.vue";
import select_match_progress from "@/components/form_item/select_match_progress.vue";
import match_achievement from "@/components/bussiness/match_achievement.vue";
import match_enroll from "@/components/bussiness/match_enroll.vue";
import custom_progress from "../components/custom_progress";
export default {
  components: {
    city_venue_list,
    select_match_progress,
    match_achievement,
    match_enroll,
    custom_progress
  },
  data() {
    let cfList = util.deepCopy(PUB.listCF.tangball_match);//深拷贝
    return {
      matchId: null,
      titleDialogAchievement: "", //成绩弹窗标题
      showDialogAchievement: false, //是否显示成绩弹窗
      titleDialogEnroll: "", //报名弹窗标题
      showDialogEnroll: false, //是否显示报名弹窗
      cfList
    };
  },

  methods: {
    dialogAchievement(doc) {
      this.matchId = doc.P1;
      this.titleDialogAchievement = `【${doc.matchName}】成绩单`;
      this.showDialogAchievement = true;
    },
    dialogEnroll(doc) {
      this.matchId = doc.P1;
      this.titleDialogEnroll = `【${doc.matchName}】报名表`;
      this.showDialogEnroll = true;
    }
  }
};
</script>


