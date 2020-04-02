<template>
  <div class>
    <dm_list_data :cf="cfList" v-if="show">
      <!-- 赛事收入插槽 (列表)-->
      <template v-slot:slot_column_matchIncome="{row}">
        <a href="javascript:;" class="n-a-blue" @click="dialogIncome(row)" :key="row.P1">查看收入</a>
      </template>
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
              (-->
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
      <!-- 全国性赛事-城市球场列表 (新增修改表单)-->
      <template v-slot:slot_form_item_cityVenueList="{formData}">
        <city_venue_list v-model="formData.venue"></city_venue_list>
      </template>
      <!-- 赛程联动下拉框 ,通过matchType进行初始化(新增修改表单)-->
      <template v-slot:slot_modify_item_matchProgress="{formData}">
        <select_match_progress v-model="formData.matchProgress" :matchType="formData.matchType"></select_match_progress>
      </template>
      <!-- 自定义组队修改表单插槽 -->
      <template v-slot:slot_form_item_progress="{formData}">
        <custom_progress v-model="formData.progress"></custom_progress>
      </template>
    </dm_list_data>
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
    <!--赛事收入弹窗-->
    <el-dialog
      custom-class="n-el-dialog"
      width="85%"
      :title="titleDialogIncome"
      :close-on-press-escape="false"
      :close-on-click-modal="false"
      :append-to-body="true"
      v-bind:visible.sync="showDialogIncome"
      v-if="showDialogIncome"
    >
      <div class>
        <match_income :matchId="matchId" :debug111="true"></match_income>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import city_venue_list from "@/components/form_item/city_venue_list.vue";
import select_match_progress from "@/components/form_item/select_match_progress.vue";
import custom_progress from "../components/custom_progress";
import match_achievement from "@/components/bussiness/match_achievement.vue";
import match_enroll from "@/components/bussiness/match_enroll.vue";
import match_income from "@/components/bussiness/match_income.vue";
export default {
  components: {
    city_venue_list, match_achievement, match_enroll, select_match_progress,
    custom_progress, match_income
  },
  data() {
    let cfList = util.deepCopy(PUB.listCF.tangball_match);
    cfList.powerPath = null; //清除权限路径
    cfList.listIndex = "franchisee_mymacth";
    cfList.formDataAddInit = { sponsorId: localStorage.franchisee_P1 };
    cfList.batchBtns = {
      addon: [util.cfList.bBtns.add], //空数组表示没有操作按钮
      // delete: false,
      // add: false, //配置基础按钮隐藏（默认显示）,
      tips: {
        text: ""
        // style:{"color":"#3a0"}
      }
    };
    cfList.singleBtns = {
      //空数组表示没有操作按钮
      addon: [
        util.cfList.sBtns.detail,
        util.cfList.sBtns.modify,
        util.cfList.sBtns.delete
      ]
    };
    return {
      titleDialogAchievement: "", //成绩弹窗标题
      showDialogAchievement: false, //是否显示成绩弹窗
      titleDialogEnroll: "", //报名弹窗标题
      showDialogEnroll: false, //是否显示报名弹窗
      titleDialogIncome: "", //赛事收入弹窗标题
      showDialogIncome: false, //是否显示赛事收入弹窗
      cfList,
      show: false //控制列表显示的key
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
    },
    dialogIncome(doc) {
      this.matchId = doc.P1;
      this.titleDialogIncome = `【${doc.matchName}】赛事收入`;
      this.showDialogIncome = true;
    }
    // 获取该加盟商下的球场列表，进行筛选
    // async getVenueId() {
    //   let { data } = await axios({
    //     method: "post",
    //     url: PUB.domain + "/crossList?page=tangball_venue",
    //     data: {
    //       findJson: {
    //         franchiseeId: localStorage.franchisee_P1
    //       }
    //     }
    //   }).catch(() => {});
    //   let arr = [];
    //   data.list.forEach(item => {
    //     arr.push(item.P1);
    //   });
    //   this.cfList.findJsonDefault = {
    //     venue: {
    //       $elemMatch: {
    //         venueId: { $in: arr }
    //       }
    //     }
    //   };
    //   this.show = true;
    // }
  },
  created() {
    // this.getVenueId();
    this.cfList.findJsonDefault = {
      sponsorId: localStorage.franchisee_P1
    };
    this.show = true;


  }
};
</script>

<style scoped>
</style>