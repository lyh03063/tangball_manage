<template>
  <div>
    <table border="1" cellspacing="0">
      <tr>
        <td width="50px" class="bgColor">洞号</td>
        <td
          v-for="(item,index) in scoreLeftList"
          :key="index"
          width="40px"
          class="bgColor"
        >{{item.holeNum}}</td>
        <td rowspan="3" class="bgColor">左九</td>
        <td
          v-for="(item,index) in scoreRightList"
          :key="index+10"
          width="40px"
          class="bgColor"
        >{{item.holeNum}}</td>
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
        <td width class="bgColor">杆数</td>
        <td v-for="(item,index) in scoreLeftList" :key="index" width>1</td>
        <td>9</td>
        <td v-for="(item,index) in scoreRightList" :key="index+10" width>1</td>
        <td>9</td>
        <td>18</td>
      </tr>
      <tr>
        <td width class="bgColor">选手一</td>
        <td
          v-for="(item,index) in scoreLeftList"
          :key="index"
          width
          style="cursor: pointer;"
          :class="active==index?'active':''"
          @mouseover="active=index"
          @mouseleave="active=-1"
          @click="registerScore(index)"
        >{{item.score}}</td>
        <td>{{leftSum}}</td>
        <td
          v-for="(item,index) in scoreRightList"
          :key="index+10"
          width
          style="cursor: pointer;"
          :class="active==index+9?'active':''"
          @mouseover="active=index+9"
          @mouseleave="active=-1"
          @click="registerScore(index+9)"
        >{{item.score}}</td>
        <td>{{rightSum}}</td>
        <td>{{allSum}}</td>
      </tr>
    </table>
    <el-dialog title="修改选手杆数" :visible.sync="showScoreDialog" width="30%" append-to-body>
        <div class="score-box" v-for="i in 3" :key='i'>
            <div v-for="index in 3" :key='index' class="score" 
            :class="scoreActive==(i==1?index:i==2?index+3:index+6)?'active':''"
            style="cursor: pointer;"
            @mouseover="scoreActive=(i==1?index:i==2?index+3:index+6)"
            @mouseleave="scoreActive=-1"
            @click="modifyScore((i==1?index:i==2?index+3:index+6))">
            {{i==1?index:i==2?index+3:index+6}}
            </div>
        </div>
        <div style="clear:both;height:20px;"></div>
        <el-button @click="showScoreDialog = false" style='margin-left:40%'>关闭</el-button>
    </el-dialog>
  </div>
</template>


<script>
export default {
  props: ["value"],
  computed: {
    leftSum() {
      let index = 0;
      this.scoreLeftList.forEach(item => {
        index += Number(item.score);
      });
      return index;
    },
    rightSum() {
      let index = 0;
      this.scoreRightList.forEach(item => {
        index += Number(item.score);
      });
      return index;
    },
    allSum() {
      let index = 0;
      this.scoreLeftList.forEach(item => {
        index += Number(item.score);
      });
      return index;
    }
  },
  data() {
    return {
      showScoreDialog:false,
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
      ],
      poorList: [18, 16, 14, 12, 10, 8, 6, 4, 2, 17, 15, 13, 11, 9, 7, 5, 3, 1],
      scoreList: this.value,
      scoreLeftList: [],
      scoreRightList: [],
      active: -1,
      index:-1,
      scoreActive:1,
    };
  },
  methods: {
    add() {
      this.scoreLeftList[0].score = 1;
    },
    registerScore(index){
        this.showScoreDialog = true
        this.index = index
    },
    modifyScore(index){
        if (this.index<9) {
            this.scoreLeftList[this.index].score = index
        }
        if (this.index>=9) {
            this.scoreLeftList[this.index-9].score= index
        }
        this.scoreList[this.index].score= index
        this.showScoreDialog = false
        this.$emit('input',this.scoreList)
    }
  },
  mounted() {},
  created() {
    if (!this.scoreList) {
      this.scoreList = [];
    }
    for (let index = 0; index < 18; index++) {
      if (!this.scoreList[index]) {
        this.scoreList[index] = { holeNum: index + 1, score: 0 };
      }
      if (index < 9) {
        this.scoreLeftList.push(this.scoreList[index]);
      } else {
        this.scoreRightList.push(this.scoreList[index]);
      }
    }
    console.log(this.scoreList, this.scoreLeftList, this.scoreRightList);
  }
};
</script>

<style scoped>
table tr td {
  text-align: center;
  height: 40px;
  line-height: 40px;
  border: black solid 1px;
}
.bgColor {
  background-color: rgb(172, 218, 177);
  color: #000;
}
.active {
  background-color: rgb(64, 158, 255);
  color: white;
}
.score-box{
    margin:0 10%;
    display: flex;
    justify-content: center;
    align-items:center;
}
.score{
    height: 100px;
    border: 1px  solid black;
    flex:0 0 33%;
    height: 100px;
    line-height: 100px;
    text-align: center;
    font-size: 24px;
    font-weight: 700
}
</style>
