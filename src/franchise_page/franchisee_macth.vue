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
          class="n-a-blue"
          @click="dialogEnroll(row)"
        >报名表({{row.registeredPersons||0}})</a>
      </template>
      <!-- 成绩列插槽 (列表)-->
      <template v-slot:slot_column_achievement="{row}">
        <a href="javascript:;" class="n-a-blue" @click="dialogAchievement(row)">对阵分组/成绩</a>
      </template>
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
      <!--详情弹窗的 主办方字段组件，注意插槽命名-->
      <template v-slot:slot_detail_item_sponsorId="{row}">
        <dm_ajax_populate :id="row.sponsorId" populateKey="name" page="tangball_franchisee">
          <template v-slot:default="{doc}">
            <div class v-if="doc && doc.P1">
              <!-- {{doc.P1}}
              ( -->
              {{doc.name}}
            </div>
          </template>
        </dm_ajax_populate>
      </template>
      <template v-slot:slot_detail_item_cityVenueList="{row}">
        <dm_debug_list level-up="2">
          <dm_debug_item v-model="row.venue" text="球场列表" />
        </dm_debug_list>

        <city_venue_list v-model="row.venue" :isEdit="false"></city_venue_list>
      </template>
      <template v-slot:slot_detail_item_album="{row}">
        <img :src="img.url" width="150" height="150" v-for="(img,index) in row.album" :key="index" />
      </template>
      <template v-slot:slot_detail_item_album="{row}">
        <img :src="img.url" width="150" height="150" v-for="(img,index) in row.album" :key="index" />
      </template>
       
    </dm_list_data>
  </div>
</template>

<script>
import city_venue_list from "@/components/form_item/city_venue_list.vue";
import match_achievement from "@/components/bussiness/match_achievement.vue";
import match_enroll from "@/components/bussiness/match_enroll.vue";
export default {
  components: { city_venue_list, match_achievement, match_enroll },
  data() {
    let cfList = util.deepCopy(PUB.listCF.tangball_match)
    cfList.listIndex = "franchisee_macth";
    // let addon = [util.cfList.bBtns.add]
    cfList.formDataAddInit = { sponsorId :localStorage.franchisee_P1}
    cfList.batchBtns = {
       addon: [
          util.cfList.bBtns.add
       ],
          tips: {
            text: ""
            // style:{"color":"#3a0"}
          }
    },
    cfList.singleBtns = {
      //空数组表示没有操作按钮
      addon: [
            util.cfList.sBtns.detail
      ],
    
    };
    // console.log('cfList',addon)

    return {
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
  },
  created() {
 
    
    // this.cfList.batchBtns = {
    //   addon : [util.cfList.bBtns.add]
    // }
    // let obj = { addon : [util.cfList.bBtns.add] }
    // console.log('batchBtns',this.cfList.batchBtns.addon )
    // console.log('obj',obj  )
  }
};
</script>

<style scoped>
</style>