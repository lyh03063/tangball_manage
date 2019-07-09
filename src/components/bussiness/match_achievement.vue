<template>
  <div class v-if="matchInfo">
    <table class="n-table MTB0" v-if="debug">
      <tr>
        <td class="WP20">字段</td>
        <td class="WP30">说明</td>
        <td>字段值</td>
      </tr>
      <tr>
        <td>matchInfo</td>
        <td>赛事信息</td>
        <td>{{matchInfo}}</td>
      </tr>
      <tr>
        <td>matchInfo.matchProgress</td>
        <td>赛事阶段</td>
        <td>{{matchInfo.matchProgress}}</td>
      </tr>
      <tr>
        <td>cfList.findJsonDefault</td>
        <td>成绩列表的默认查询参数</td>
        <td>{{ cfList.findJsonDefault}}</td>
      </tr>

      <tr>
        <td>cfList.formItems[0].ajax.param.sheetRelation.findJson</td>
        <td>弹窗表单的第一个字段的下拉框选项ajax查询参数</td>
        <td>{{cfList.formItems[0].ajax.param.sheetRelation.findJson}}</td>
      </tr>
    </table>

    <!-- {{matchInfo}} -->
    <!-- <div class="TAC FS20 LH40">{{matchInfo.matchName}}</div>
    <div class="TAC FS16 LH40">当前赛事进度</div>

    <space height="20"></space>-->
    <div class v-if="matchInfo.matchType==2">
      <div class="panel">
        <div class="OFH">
          <div class="FL FWB FS16 LH30">城市赛（时间2019-4-5到2019-6-5）</div>

          <div class="FR">
            <el-button plain @click="isEdit=false" size="mini" v-if="isEdit">取消编辑</el-button>
            <el-button type="primary" size="mini" @click="isEdit=true" v-if="!isEdit">编辑</el-button>
          </div>
        </div>
        <div class>
          <el-radio-group
            v-model="cityMatchVenuId"
            style="margin-bottom: 10px;"
            @change="changeCityMatchProgress"
          >
            <el-radio-button
              :label="item.venueId"
              v-for="(item,index) in matchInfo.cityVenueList"
              :key="index"
            >{{item.cityName}}</el-radio-button>
          </el-radio-group>
        </div>
        <!-- 城市赛场馆id：{{cityMatchVenuId}} -->
        <div class>
          <el-radio-group v-model="cityMatchProgress" @change="changeCityMatchProgress">
            <el-radio-button :label="11">选拔赛</el-radio-button>
            <el-radio-button :label="12">晋级赛</el-radio-button>
            <el-radio-button :label="13">决赛</el-radio-button>
          </el-radio-group>
        </div>
        <!-- 城市赛阶段：{{cityMatchProgress}} -->
        <listData :cf="cfList" ref="list1">
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

      <space height="20"></space>

      <div class="panel">
        <div class="FWB FS16 LH30">城际赛（时间2019-7-5到2019-8-5）</div>

        <div class v-if="matchInfo.matchProgress.bigProgress==2">
          <!-- 城市赛场馆id：{{cityMatchVenuId}} -->
          <div class>
            <el-radio-group
              v-model="crossCityMatchSmallProgress"
              @change="changeCrossCityMatchProgress"
            >
              <el-radio-button :label="21">循环/淘汰赛</el-radio-button>
              <el-radio-button :label="22">1/4决赛</el-radio-button>
              <el-radio-button :label="23">决赛</el-radio-button>
            </el-radio-group>
          </div>

          <table class="n-table MT10" v-if="debug">
            <tr>
              <td class="WP20">字段</td>
              <td class="WP30">说明</td>
              <td>字段值</td>
            </tr>
            <tr>
              <td>crossCityMatchSmallProgress</td>
              <td>城际赛赛事小阶段</td>
              <td>{{crossCityMatchSmallProgress}}</td>
            </tr>

            <tr>
              <td>arrCrossCityMatchAchievement</td>
              <td>城际赛团队成绩列表</td>
              <td>{{arrCrossCityMatchAchievement}}</td>
            </tr>
            <tr>
              <td>arrCrossCityMatchPersonAchievement:</td>
              <td>城际赛成绩明细总列表</td>
              <td>{{arrCrossCityMatchPersonAchievement}}</td>
            </tr>
            <tr>
              <td>showDialogCCityAchievementPersonal</td>
              <td>显示明细列表弹窗</td>
              <td>{{showDialogCCityAchievementPersonal}}</td>
            </tr>
            <tr>
              <td>findJsonDefaultCCityAchP</td>
              <td>城际赛的明细列表的默认查询参数</td>
              <td>{{findJsonDefaultCCityAchP}}</td>
            </tr>
            <tr>
              <td>infoDefaultCCityAchP</td>
              <td>城际赛的明细列表的一些提示信息</td>
              <td>{{infoDefaultCCityAchP}}</td>
            </tr>
          </table>
          <el-table :data="arrCrossCityMatchAchievement" border style="width: 100%" class="MT10">
            <el-table-column prop="cityName" label="队名" width="180"></el-table-column>
            <el-table-column prop="scoreTeam" label="分数" width="180"></el-table-column>
            <el-table-column label="名次" type="index" width="50"></el-table-column>
            <!-- <el-table-column prop="name" label="备注" width="180"></el-table-column>
            <el-table-column prop="name" label="时间" width="180"></el-table-column>-->
            <el-table-column prop="address" label="明细">
              <template slot-scope="scope">
                <a
                  href="javascript:;"
                  class="link-blue"
                  @click="dialogCCityAchievementPersonal(scope.row)"
                >查看明细</a>
              </template>
            </el-table-column>
          </el-table>
        </div>

        <div class v-else>还未开始</div>
      </div>
    </div>
    <div class v-else>普通赛的成绩表！</div>
    <ccity_match_achievement_personal
      class
      :show.sync="showDialogCCityAchievementPersonal"
      :debug111="true"
      :findJsonDefault="findJsonDefaultCCityAchP"
      :info="infoDefaultCCityAchP"
      @after-add="afterAddCCityAch"
      @after-modify="afterModifyCCityAch"
    ></ccity_match_achievement_personal>
  </div>
</template>

<script>
import listData from "../list-data/list-data.vue";
import ajax_populate from "../common/ajax_populate.vue";
import select_match_progress from "../form_item/select_match_progress.vue";
import match_venue from "../form_item/match_venue.vue";
import ccity_match_achievement_personal from "../bussiness/ccity_match_achievement_personal.vue";
export default {
  components: {
    listData,
    ajax_populate,
    select_match_progress,
    match_venue,
    ccity_match_achievement_personal
  },
  props: {
    matchId: [String, Number],
    
  },
  data() {
    return {
      debug: window.pub_debug,
      isEdit: false,
      //城际赛的明细列表的一些提示信息
      infoDefaultCCityAchP: {},
      //城际赛的明细列表的默认查询参数
      findJsonDefaultCCityAchP: {
        matchId: this.matchId,
        "matchProgress.smallProgress": 11,
        cityVenueId: 23
      },
      showDialogCCityAchievementPersonal: false, //是否显示城际赛成绩明细列表弹窗
      arrCrossCityMatchAchievement: [], //城际赛成绩列表
      arrCrossCityMatchPersonAchievement: [], //城际赛成绩明细总列表
      crossCityMatchSmallProgress: 21, //城际赛赛段id聚焦值
      cityMatchVenuId: null, //城市赛场馆选项卡的聚焦值
      cityMatchProgress: 11, //城市赛阶段选项卡的聚焦值
      matchInfo: null, //赛事信息
      cfList: {
        isShowSearchForm: false, //隐藏查询表单
        isShowBreadcrumb: false, //隐藏面包屑导航
        isShowPageLink: false, //隐藏分页
        isShowOperateColumn: false, //隐藏操作列
        isShowToolBar: false, //隐藏工具栏
        //默认查询参数
        findJsonDefault: {
          matchId: this.matchId,
          "matchProgress.smallProgress": 11,
          cityVenueId: 23
        },
        //新增表单初始赋值
        formDataAddInit: {
          matchId: this.matchId,
          cityVenueId: 21,
          matchProgress: {} //这个要注册
        },

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
            label: "参赛人",
            prop: "participantsId",
            type: "select",
            ajax11111: {
              url: "http://120.76.160.41:3000/crossList?page=tangball_enroll",

              keyLabel: "memberId",
              keyValue: "memberId",
              param: { findJson: { matchId: this.matchId } }
            },
            ajax: {
              url: "http://120.76.160.41:3000/crossListRelation",
              keyLabel: "name",
              keyValue: "P1",

              param: {
                needRelation: "1",
                columnItem: "memberId",
                columnTarget: "P1",
                sheetRelation: {
                  page: "tangball_enroll",
                  findJson: {
                    matchId: this.matchId,
                    cityVenueId: 23
                  }
                },
                sheetTarget: {
                  page: "tangball_member",
                  pageSize: "2000",
                  findJson: {}
                }
              }
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
            },
            hide: true
          },
          {
            label: "赛事阶段",
            prop: "matchProgress",
            type: "select",
            slot: "slot_modify_item_matchProgress",
            hide: true
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
  },
  watch: {
    isEdit: {
      handler(newVal, oldVal) {
        if (this.isEdit) {
          //如果{000}000
          this.cfList.isShowToolBar = true;
          this.cfList.isShowOperateColumn = true;
        } else {
          this.cfList.isShowToolBar = false;
          this.cfList.isShowOperateColumn = false;
        }
      }
    },
    "matchInfo.cityVenueList": {
      handler(newVal, oldVal) {
        this.getCrossCityMatchAchievement(); //调用：{获取城际赛成绩列表函数}
      }
      // immediate: true //组件初始化时立即执行一次变动
    },
    valueNeed: {
      handler(newVal, oldVal) {
        this.$emit("input", this.valueNeed); //同步valueNeed值到value
      },
      // immediate: true,//组件初始化时立即执行一次变动
      deep: true //深度监听
    },
    matchId: {
      handler(newVal, oldVal) {
        if (!this.matchId) return;
        this.getMatchData();
      },
      immediate: true //组件初始化时立即执行一次变动
    }
  },
  methods: {
    //函数：{添加城际赛成绩成功后的回调函数}
    afterAddCCityAch(doc) {
      this.getCrossCityMatchAchievement(); //调用：{获取城际赛成绩列表函数}
    },
    //函数：{修改城际赛成绩成功后的回调函数}
    afterModifyCCityAch(doc) {
      this.getCrossCityMatchAchievement(); //调用：{获取城际赛成绩列表函数}
    },
    //函数：{弹窗显示城际赛成绩明细列表函数}
    dialogCCityAchievementPersonal(doc) {
      this.showDialogCCityAchievementPersonal = true; //显示弹窗
      //修改明细表的城市场馆查询参数
      this.findJsonDefaultCCityAchP["cityVenueId"] = doc.venueId;
      //修改城际赛的明细列表的一些提示信息
      this.infoDefaultCCityAchP.cityName = doc.cityName;
    },
    //函数：{获取城际赛成绩列表函数}
    async getCrossCityMatchAchievement() {
      console.log("matchInfo.cityVenueList变动#####################");
      let { cityVenueList } = this.matchInfo;
      this.arrCrossCityMatchAchievement = util.deepCopy(cityVenueList);

      // this.arrCrossCityMatchPersonAchievement = [];
      //
      let { data } = await axios({
        //请求接口
        method: "post",
        url: "http://120.76.160.41:3000/crossList?page=tangball_achievement",
        data: {
          findJson: {
            matchId: this.matchId,
            "matchProgress.bigProgress": 2
            // cityVenueId: 23
          }
        } //传递参数
      });

      this.arrCrossCityMatchPersonAchievement = data.list;
      this.filterCrossCityMatchAchievement(); //调用：{成城际赛成绩中过滤出当前所在赛段的团队成绩}
    },
    //函数：{成城际赛成绩中过滤出当前所在赛段的团队成绩}
    filterCrossCityMatchAchievement() {
      //修改明细表的赛事阶段查询参数
      this.findJsonDefaultCCityAchP[
        "matchProgress.smallProgress"
      ] = this.crossCityMatchSmallProgress;
      let map = {
        "21": "循环/淘汰赛",
        "22": "1/4决赛",
        "23": "决赛"
      };

      //城际赛的明细列表的一些提示信息
      this.infoDefaultCCityAchP["progressName"] =
        map[this.crossCityMatchSmallProgress || "21"];
      //过滤出城际赛当前小赛段的成绩
      let arrCCPAchievementNeed = this.arrCrossCityMatchPersonAchievement.filter(
        item =>
          item.matchProgress.smallProgress == this.crossCityMatchSmallProgress
      );

      this.arrCrossCityMatchAchievement.forEach(itemCityVenue => {
        //循环：{000数组}
        let scoreTeam = 0;

        let arrAchievementPerson = arrCCPAchievementNeed.filter(
          item => item.cityVenueId == itemCityVenue.venueId
        );
        console.log("arrAchievementPerson$$$$####", arrAchievementPerson);

        itemCityVenue.scoreTeam = arrAchievementPerson.reduce(
          (total, doc) => total + (doc["matchScore"] || 0),
          0
        );
      });

      this.arrCrossCityMatchAchievement.sort(function(a, b) {
        //按团队分降序排序
        return b.scoreTeam - a.scoreTeam;
      });

      this.arrCrossCityMatchAchievement = util.deepCopy(
        this.arrCrossCityMatchAchievement
      ); //深拷贝
    },

    //函数：{切换城际赛赛段函数}
    changeCrossCityMatchProgress() {
      console.log("changeCrossCityMatchProgress######");
      this.filterCrossCityMatchAchievement(); //调用：{成城际赛成绩中过滤出当前所在赛段的团队成绩}
    },
    //函数：{切换城市赛赛段函数}
    changeCityMatchProgress() {
      console.log("changeTagCity######");
      this.cfList.findJsonDefault[
        "matchProgress.smallProgress"
      ] = this.cityMatchProgress;
      this.cfList.findJsonDefault.cityVenueId = this.cityMatchVenuId;
      this.cfList.formDataAddInit.cityVenueId = this.cityMatchVenuId;
      this.cfList.formDataAddInit.matchProgress = {
        bigProgress: 1,
        smallProgress: this.cityMatchProgress
      };

      //修改人员下拉框的ajax参数，不同场馆对应着不同的报名人员
      // this.cfList.formItems[0].ajax.param.findJson.cityVenueId = this.cityMatchVenuId;

      this.cfList.formItems[0].ajax.param.sheetRelation.findJson.cityVenueId = this.cityMatchVenuId;
      if (!this.$refs.list1) return;
      this.$refs.list1.getDataList(); //调用：{列表组件查询函数}
    },

    async getMatchData() {
      if (!this.matchId) return;
      //函数：{根据赛事id，ajax获取赛事信息函数}
      let { data } = await axios({
        //请求接口
        method: "post",
        url: "http://120.76.160.41:3000/crossDetail?page=tangball_match",
        data: {
          id: this.matchId
        } //传递参数
      });
      this.matchInfo = data.doc;
      if (this.matchInfo.cityVenueList) {
        //如果{000}000
        this.cityMatchVenuId = this.matchInfo.cityVenueList[0].venueId;
        this.cfList.formDataAddInit.cityVenueId = this.cityMatchVenuId;
        //修改人员下拉框的ajax参数，不同场馆对应着不同的报名人员
        // this.cfList.formItems[0].ajax.param.findJson.cityVenueId = this.cityMatchVenuId;

        this.cfList.formItems[0].ajax.param.sheetRelation.findJson.cityVenueId = this.cityMatchVenuId;

        this.cfList.formDataAddInit.matchProgress = {
          bigProgress: 1,
          smallProgress: 11
        };
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.panel {
  border: 1px #ddd solid;
  border-radius: 5px;
  padding: 15px;
}
</style>
