<template>
  <div>
    <dm_debug_list>
      <dm_debug_item v-model="achievementList" text="achievementList" />
      <dm_debug_item v-model="arrTeam" text="arrTeam" />
    </dm_debug_list>

    <div v-if="!readOnly">点击白色/蓝色小格子修改选手成绩</div>
    <table border="1" cellspacing="0">
      <tr>
        <td width="80px" class="bgColor">洞号</td>
        <td v-for="index in 9" :key="index" width="40px" class="bgColor">{{index}}</td>
        <td rowspan="3" class="bgColor">左九</td>
        <td v-for="index in 9" :key="index+10" width="40px" class="bgColor">{{index+9}}</td>
        <td rowspan="3" class="bgColor">右九</td>
        <td rowspan="3" class="bgColor">总杆数</td>
        <td rowspan="3" class="bgColor">比洞成绩<br>（按最优）</td>
      
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
        <td class="bgColor">18</td>
      </tr>

      <template class v-for="(teamEach) in arrTeam">
        <tr class :key="teamEach.P1">
          <td width class="bgColor FWB">{{teamEach.name}}</td>
          <td class="PSR td-holeScore" v-for="index in 9" :key="index">{{$lodash.get(teamEach, `dictScore[${index}].score`)}}
            <i class="holeScore " >{{$lodash.get(teamEach, `dictScore[${index}].teamHoleScore`)}}</i>
          </td>
          <td class="allScore">{{sumLeft(teamEach)}}</td>
          <td
          class="PSR td-holeScore"
            v-for="index in 9"
            :key="index+10"
          >{{$lodash.get(teamEach, `dictScore[${index+9}].score`)}}
          
          <i class="holeScore" >{{$lodash.get(teamEach, `dictScore[${index+9}].teamHoleScore`)}}</i>
          </td>
          <td class="allScore">{{sumRight(teamEach)}}</td>
          <td class="allScore">{{sumLeft(teamEach)+sumRight(teamEach)}}</td>
          <td class="allScore">{{teamEach.teamHoleScoreTotal}}</td>
        </tr>

        <!-- 不是只读模式 v-if="!readOnly"  -->
        <tr v-for="(docAch) in teamEach.memberList" :key="docAch.P1">
          <td width class="bgColor">&nbsp;&nbsp;{{dictMember[docAch.participantsId]||"未获取"}}</td>
          <td v-for="index in 9" :key="index">{{$lodash.get(docAch, `dictScore[${index}].score`)}}</td>
          <td class="allScore">{{sumLeft(docAch)}}</td>

          <td
            v-for="index in 9"
            :key="index+10"
          >{{$lodash.get(docAch, `dictScore[${index+9}].score`)}}</td>
          <td class="allScore">{{sumRight(docAch)}}</td>
          <td class="allScore">{{sumLeft(docAch)+sumRight(docAch)}}</td>
          <td class="allScore"></td>
        </tr>
      </template>
    </table>
  </div>
</template>


<script>
export default {
  //isTeam为true时启用团体模式，multiple为true时启用多人模式
  props: ["value", "readOnly", "isTeam", "multiple"], //readOnly  为是否是只读模式
  computed: {},
  data() {
    return {
      dictMember: {
        91: "孙悟空",
        98: "白骨精"
      },

      arrTeam: [
        { P1: 19, name: "西游队" },
        { P1: 20, name: "海贼队" }
      ],
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
    // 计算左九洞总杆数
    sumLeft(docAch) {
      console.log("docAch:", docAch);
      let score = 0;
      for (var i = 1; i <= 9; i++) {
        score += lodash.get(docAch, `dictScore[${i}].score`, 0);
      }
      return score;
    },
    // 计算右九洞总杆数
    sumRight(docAch) {
      let score = 0;
      for (var i = 10; i <= 18; i++) {
        score += lodash.get(docAch, `dictScore[${i}].score`, 0);
      }
      return score;
    },

    // 传入单洞的两队成绩并返回两队得分函数
    getTeamHoleAch(arrAch1, arrAch2) {
      let arrResult = [0, 0];
      //两个数字按杆数从低到高排序
      arrAch1.sort(function(a, b) {
        return a - b;
      });
      arrAch2.sort(function(a, b) {
        return a - b;
      });

      let max = 3; //最高杆数，大于该杆数即使赢了也不得分

      //for循环
      var n = arrAch1.length;
      let flagEqual = true; //两队是否同分
      for (var i = 0; i < n; i++) {
        let result = arrAch1[i] - arrAch2[i];
        if (result > 0 && arrAch2[i] <= max) {
          //第1队胜且分数没有超限
          arrResult[1] += 1;
          flagEqual = false;
          break;
        } else if (result < 0 && arrAch1[i] <= max) {
          //第2队胜且分数没有超限
          arrResult[0] += 1;
          flagEqual = false;
          break;
        }
      }

      if (flagEqual) {
        //如果两队同分
        for (var i = 0; i < n; i++) {
          //如果分数没有超限
          if (arrAch1[i] <= max) {
            arrResult = [0.5, 0.5];
            break;
          }
        }
      }

      return arrResult;
    }
  },
  mounted() {},
  created() {
    this.value.forEach(itemEach => {
      //循环：{value数组}
      //补充数据字典
      itemEach.dictScore = lodash.keyBy(itemEach.scoreList, "holeNum");
    });

    //循环：{队伍数组}
    this.arrTeam.forEach(teamEach => {
      teamEach.memberList = this.value.filter(doc => doc.teamId == teamEach.P1);
      teamEach.dictScore = {}; //团体的分数数据字典
      teamEach.teamHoleScoreTotal = 0; //团体的洞数总分初始化
      for (var i = 1; i <= 18; i++) {
        let scoreHoleTeam = 0;

        let arrAch = []; //团体的个人单洞成绩数组
        //循环：{每队的个人成绩数组}
        teamEach.memberList.forEach(memberEach => {
          let scoreEach = lodash.get(memberEach, `dictScore[${i}].score`, 0);
          arrAch.push(scoreEach); //团体的个人单洞成绩数组
          scoreHoleTeam += scoreEach;
        });
        teamEach.dictScore[i] = {
          holeNum: i,
          score: scoreHoleTeam,
          arrAch
        };
      }
    });

    //按最优成绩计算团队每洞得分
    for (var i = 1; i <= 18; i++) {
      let arrAch1 = lodash.get(this.arrTeam, `[0].dictScore[${i}].arrAch`, 0);
      let arrAch2 = lodash.get(this.arrTeam, `[1].dictScore[${i}].arrAch`, 0);

      console.log("arrAch1:##########", arrAch1);
      console.log("arrAch2:#", arrAch2);
      let arrResult = this.getTeamHoleAch(arrAch1, arrAch2); //调用：{传入单洞的两队成绩并返回两队得分函数}
      console.log("arrResult:#", arrResult);

      lodash.set(
        this.arrTeam,
        `[0].dictScore[${i}].teamHoleScore`,
        arrResult[0]
      );

      this.arrTeam[0].teamHoleScoreTotal+=arrResult[0];//第1队洞数总分更新
    
      lodash.set(
        this.arrTeam,
        `[1].dictScore[${i}].teamHoleScore`,
        arrResult[1]
      );
      this.arrTeam[1].teamHoleScoreTotal+=arrResult[1];//第1队洞数总分更新
    }
  }
};
</script>

<style scoped>
table tr td {
  text-align: center;
  height: 40px;
  line-height: 40px;
  border: black solid 1px;
  padding: 0px;
}
.bgColor {
  background-color: rgb(202, 230, 206);
  color: #000;
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
  background-color: rgb(202, 230, 206);

  font-size: 18px;
  font-weight: 700;
}
.td-holeScore{
  height:50px;
  line-height: 30px;
  vertical-align: top;
  font-weight: 700;
  
}
.holeScore{
  display: block;
  background: #3a0;
  opacity: 0.7;
  color: #ffffff;
  position:absolute;
  bottom: 0;
  left:0;
  right:0;
  height:18px;
  line-height: 18px;
   font-weight: 300;
  font-style: normal

}
</style>
