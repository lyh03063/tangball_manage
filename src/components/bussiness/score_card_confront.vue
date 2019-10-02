<template>
  <div>
    <dm_debug_list>
      <dm_debug_item v-model="achievementList" text="achievementList" />
      <dm_debug_item v-model="arrTeamNeed" text="arrTeamNeed" />
      <dm_debug_item v-model="matchInfo.ruleId" text="赛事规则" />
    </dm_debug_list>

   
    <table class="n-table">
      <tr>
        <td width="80px" class="bgColor">洞号</td>
        <td v-for="index in 9" :key="index" width="40px" class="bgColor">{{index}}</td>
        <td rowspan="3" class="bgColor">左九</td>
        <td v-for="index in 9" :key="index+10" width="40px" class="bgColor">{{index+9}}</td>
        <td rowspan="3" class="bgColor">右九</td>
        <td rowspan="3" class="bgColor">总杆数</td>
      </tr>
      <tr>
        <td width class="bgColor">距离</td>
        <td v-for="(item,index) in distanceList" :key="index" class="bgColor">{{item}}</td>
      </tr>
      <tr>
        <td width class="bgColor">差杆</td>
        <td v-for="(item,index) in poorList" :key="index" class="bgColor">{{item}}</td>
      </tr>
      <tr>
        <td width class="bgColor">标准杆</td>
        <td v-for="index in 9" :key="index" class="bgColor">1</td>
        <td class="bgColor">9</td>
        <td v-for="index in 9" :key="index+9" class="bgColor">1</td>
        <td class="bgColor">9</td>
        <td class="bgColor">18</td>
      </tr>

      <template class v-for="(teamEach) in arrTeamNeed">
        <tr class :key="teamEach.id">
          <td width class="bgColor FWB allScore td-holeScore">
            {{teamEach.name}}
            <i class="holeScore">积分</i>
          </td>
          <td class="td-holeScore" v-for="index in 9" :key="index">
            {{$lodash.get(teamEach, `dictScore[${index}].score`)}}
            <i
              class="holeScore"
            >
            {{getTeamHoleSingle(teamEach,index) }}
            </i>
          </td>
          <td class="allScore td-holeScore">
            {{sumLeftPoles(teamEach)}}
            <i class="holeScore">{{sumLeftTeamHole(teamEach)}}</i>
          </td>
          <td class="td-holeScore" v-for="index in 9" :key="index+10">
            {{$lodash.get(teamEach, `dictScore[${index+9}].score`)}}
            <i
              class="holeScore"
            >
            {{getTeamHoleSingle(teamEach,index+9) }}
            </i>
          </td>
          <td class="allScore td-holeScore">
            {{sumRightPoles(teamEach)}}
            <i class="holeScore">{{sumRightTeamHole(teamEach)}}</i>
          </td>
          <td class="allScore td-holeScore">
            {{sumLeftPoles(teamEach)+sumRightPoles(teamEach)}}
            <i
              class="holeScore"
            >{{getTeamHoleTotal(teamEach)}}</i>
          </td>
        </tr>

        <tr v-for="(docAch) in teamEach.personAchList" :key="docAch.P1">
          <td width class="bgColor">&nbsp;&nbsp;{{dictMember[docAch.participantsId]||"未获取"}}</td>
          <td v-for="index in 9" :key="index">{{$lodash.get(docAch, `dictScore[${index}].score`)}}</td>
          <td class="allScore">{{sumLeftPoles(docAch)}}</td>

          <td
            v-for="index in 9"
            :key="index+10"
          >{{$lodash.get(docAch, `dictScore[${index+9}].score`)}}</td>
          <td class="allScore">{{sumRightPoles(docAch)}}</td>
          <td class="allScore">{{sumLeftPoles(docAch)+sumRightPoles(docAch)}}</td>
        </tr>
      </template>
    </table>
  </div>
</template>


<script>
let T;
export default {
  name: "match_card_confront",
  //isTeam为true时启用团体模式，multiple为true时启用多人模式
  props: {
    value: {},
    matchInfo: {
      //赛事信息
      default() {
        return {};
      }
    },
    readOnly: {},
    isTeam: {},
    arrTeam: {
      type: Array,
      default() {
        return [{ id: 19, name: "西游队11" }, { id: 20, name: "海贼队" }];
      }
    },
    dictMember: {
      type: Object,
      default() {
        return {
          91: "孙悟空",
          98: "白骨精"
        };
      }
    }
  }, //readOnly  为是否是只读模式
  // props: ["value", "readOnly", "isTeam", "arrTeamNeed"], //readOnly  为是否是只读模式
  computed: {
    
  },
  data() {
    return {
      arrTeamNeed: this.arrTeam,
      elseScore: "", //其他杆数
      showElseScoreDialog: false, //设置其他杆数key
      showScoreDialog: false, //设置1-8杆数key
      distanceList: [
        25,
        50,
        75,
        100,
        120,
        150,
        175,
        200,
        225,
        40,
        60,
        80,
        110,
        140,
        160,
        190,
        210,
        240
      ], //距离list
      poorList: [18, 16, 14, 12, 10, 8, 6, 4, 2, 17, 15, 13, 11, 9, 7, 5, 3, 1], //差杆list
      scoreList: this.value, //所有杆数据
      achievementList: this.value, //所有杆数据
      scoreLeftList: [], //左九杆数据
      scoreRightList: [], //右九杆数据

      index: -1, //选中杆数的缩影
      scoreActive: 1 //杆数弹窗聚焦key
    };
  },
  methods: {
    // 获取单洞积分
    getTeamHoleSingle(teamDoc,index) {
     
      return lodash.get(teamDoc, `dictScore[${index}].teamHoleScore`)
    },
    // 获取比洞总积分
    getTeamHoleTotal(teamDoc) {
      
      return teamDoc["teamHoleScoreTotal"];
    },
    // 计算左九洞比洞分数
    sumLeftTeamHole(teamDoc) {
      let score = 0;
      for (var i = 1; i <= 9; i++) {
        score += lodash.get(teamDoc, `dictScore[${i}].teamHoleScore`, 0);
      }
      return score;
    },
    // 计算右九洞比洞分数
    sumRightTeamHole(teamDoc) {
      let score = 0;
      for (var i = 1; i <= 9; i++) {
        score += lodash.get(teamDoc, `dictScore[${i + 9}].teamHoleScore`, 0);
      }
      return score;
    },
    // 计算左九洞总杆数
    sumLeftPoles(docAch) {
      console.log("docAch:111", docAch);
      let score = 0;
      for (var i = 1; i <= 9; i++) {
        score += lodash.get(docAch, `dictScore[${i}].score`, 0);
      }
      return score;
    },
    // 计算右九洞总杆数
    sumRightPoles(docAch) {
      let score = 0;
      for (var i = 10; i <= 18; i++) {
        score += lodash.get(docAch, `dictScore[${i}].score`, 0);
      }
      return score;
    }
  },
  mounted() {},
  created() {
    T = this;
  }
};
</script>

<style scoped>
table tr td {
  text-align: center;
  height: 40px;
  line-height: 40px;

  padding: 0px;
}
.bgColor {
  background-color: #f8f8f8;
}

.score-box {
  margin: 0 10%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.score {
  height: 100px;
  border: 1px solid black;
  flex: 0 0 33%;
  height: 100px;
  line-height: 100px;
  text-align: center;
  font-size: 24px;
  font-weight: 700;
}
.allScore {
  background-color: #f8f8f8;

  font-size: 14px;
  font-weight: 700;
}
.td-holeScore {
  height: 50px;
  line-height: 30px;
  vertical-align: top;
  font-weight: 700;
  position: relative;
}
.holeScore {
  display: block;
  background: #3a0;
  opacity: 0.7;
  color: #ffffff;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 18px;
  line-height: 18px;
  font-weight: 300;
  font-style: normal;
}
</style>
