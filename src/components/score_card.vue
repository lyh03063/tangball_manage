<template>
  <div>
    <div v-if="!readOnly">点击白色小格子修改选手成绩</div>
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
        <td width class="bgColor">标准杆</td>
        <td v-for="(item,index) in scoreLeftList" :key="index" class="bgColor">1</td>
        <td class="bgColor">9</td>
        <td v-for="(item,index) in scoreRightList" :key="index+10" class="bgColor">1</td>
        <td class="bgColor">9</td>
        <td class="bgColor">18</td>
      </tr>
      <!-- 不是只读模式 -->
      <tr v-if="!readOnly">
        <td width class="bgColor">选手一</td>
        <td
          v-for="(item,index) in scoreLeftList"
          :key="index"
          width
          style="cursor: pointer;"
          :class="`${active==index?'active ':''}${item.score!=0?'active':''}`"
          @mouseover="active=index"
          @mouseleave="active=-1"
          @click="registerScore(index)"
        >{{item.score}}</td>
        <td class="allScore">{{leftSum}}</td>
        <td
          v-for="(item,index) in scoreRightList"
          :key="index+10"
          width
          style="cursor: pointer;"
          :class="`${active==index+9?'active ':''}${item.score!=0?'active':''}`"
          @mouseover="active=index+9"
          @mouseleave="active=-1"
          @click="registerScore(index+9)"
        >{{item.score}}</td>
        <td class="allScore">{{rightSum}}</td>
        <td class="allScore">{{allSum}}</td>
      </tr>
      <!-- 只读模式 -->
      <tr v-if="readOnly">
        <td class="bgColor">选手一</td>
        <td
          v-for="(item,index) in scoreLeftList"
          :key="index"
        >{{item.score}}</td>
        <td class="allScore">{{leftSum}}</td>
        <td
          v-for="(item,index) in scoreRightList"
          :key="index+10"
        >{{item.score}}</td>
        <td class="allScore">{{rightSum}}</td>
        <td class="allScore">{{allSum}}</td>
      </tr>
    </table>
    <!-- 1-8杆数弹窗 -->
    <el-dialog title="修改选手杆数" :visible.sync="showScoreDialog" width="30%" append-to-body>
        <div class="score-box" v-for="i in 3" :key='i'>
          <div v-for="index in 3" :key='index' class="score" >
            <div  
            :class="scoreActive==(i==1?index:i==2?index+3:index+6)?'active':''"
            style="cursor: pointer;"
            @mouseover="scoreActive=(i==1?index:i==2?index+3:index+6)"
            @mouseleave="scoreActive=-1"
            @click="modifyScore((i==1?index==1?-2:index==2?-1:index-2:i==2?index+1:index+4))"
            v-if="index!=3||i!=3">
            {{i==1?index==1?-2:index==2?-1:index-2:i==2?index+1:index+4}}
            </div>
            <div v-else
            :class="scoreActive==(i==1?index:i==2?index+3:index+6)?'active':''"
            style="cursor: pointer;"
            @mouseover="scoreActive=(i==1?index:i==2?index+3:index+6)"
            @mouseleave="scoreActive=-1"
            @click="elseCount">
              其它
            </div>
          </div>
        </div>
        <div style="clear:both;height:20px;"></div>
        <el-button @click="showScoreDialog = false" style='margin-left:40%'>关闭</el-button>
    </el-dialog>
    <!-- 其他杆数弹窗 -->
    <el-dialog title="修改选手杆数" :visible.sync="showElseScoreDialog" width="17%" append-to-body>
       杆数：<el-input-number v-model="elseScore"  label="请输入杆数"></el-input-number>
        <!-- <el-input v-model="elseScore" placeholder="请输入杆数"></el-input> -->
        <div style="height:20px;"></div>
        <el-button @click="modifyElseScore" style='margin-left:20 %'>修改</el-button>
        <el-button @click="showElseScoreDialog = false" >关闭</el-button>
    </el-dialog>
  </div>
</template>


<script>
export default {
  props: ["value",'readOnly' ],//readOnly  为是否是只读模式
  computed: {
    // 左九杆总数
    leftSum() {
      let index = 0;
      this.scoreLeftList.forEach(item => {
        index += Number(item.score);
      });
      return index;
    },
    // 右九杆总数
    rightSum() {
      let index = 0;
      this.scoreRightList.forEach(item => {
        index += Number(item.score);
      });
      return index;
    },
    // 总杆数
    allSum() {
      let index = 0;
      this.scoreList.forEach(item => {
        index += Number(item.score);
      });
      return index;
    }
  },
  data() {
    return {
      elseScore:'',  //其他杆数
      showElseScoreDialog:false, //设置其他杆数key
      showScoreDialog:false,  //设置1-8杆数key
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
      ],//距离list 
      poorList: [18, 16, 14, 12, 10, 8, 6, 4, 2, 17, 15, 13, 11, 9, 7, 5, 3, 1],//差杆list
      scoreList: this.value,//所有杆数据
      scoreLeftList: [],//左九杆数据
      scoreRightList: [],//右九杆数据
      active: -1,//聚焦index
      index:-1,//选中杆数的缩影
      scoreActive:1,//杆数弹窗聚焦key
    };
  },
  methods: {
    // 打开修改杆数弹窗的方法
    registerScore(index){
        this.showScoreDialog = true
        this.index = index
    },
    // 杆数1-8的修改方法
    modifyScore(index){
      console.log(this.index);
      
        if (this.index<9) {
            this.scoreLeftList[this.index].score = index
        }
        if (this.index>=9) {
            this.scoreRightList[this.index-9].score= index
        }
        this.scoreList[this.index].score= index
        this.showScoreDialog = false
        this.$emit('input',this.scoreList)
    },
    // 打开其他杆数弹窗的方法
    elseCount(){
      this.showScoreDialog = false,
      this.showElseScoreDialog = true
    },
    // 修改其他杆数的方法
    modifyElseScore(){

        if (this.index<9) {
            this.scoreLeftList[this.index].score = this.elseScore
        }
        if (this.index>=9) {
            this.scoreRightList[this.index-9].score= this.elseScore
        }
        this.scoreList[this.index].score= this.elseScore
        this.showElseScoreDialog = false
        this.$emit('input',this.scoreList)
        this.elseScore = ''

    }
  },
  mounted() {},
  created() {
    // 进入页面时,若杆数不存在,设定初始值
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
  padding: 0px
}
.bgColor {
  background-color: rgb(202, 230, 206);
  color: #000;
}
.active {
  background-color: rgb(64, 158, 255);
  color: white;
  font-weight: 700
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
.allScore{
  background-color:rgb(202, 230, 206);
  color:red;
  font-size: 18px;
  font-weight: 700
  
}
</style>
