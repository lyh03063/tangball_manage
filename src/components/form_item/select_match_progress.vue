<template>
  <div class>
    <el-select
      class="MR20"
      v-model="valueNeed.bigProgress"
      placeholder="请选择"
      @change="selectBigProcess"
      v-if="matchType==2"
    >
      <el-option v-for="item in options" :key="item.code" :label="item.name" :value="item.code"></el-option>
    </el-select>
    <el-select v-model="valueNeed.smallProgress" placeholder="请选择" @change="selectSmallProcess">
      <el-option
        v-for="item in optionsSmall"
        :key="item.code"
        :label="item.name"
        :value="item.code"
      ></el-option>
    </el-select>
  </div>
</template>

<script>
export default {
  //用于列表模糊查询的组件
  props: {
    value: [Object],
    matchType: [String, Number] //赛事类型
  },
  data() {
    return {
      valueNeed: this.value || {},
      bigProgress: "",
      smallProgress: "",
      optionsSmall: [],
      options: [
        {
          code: 1,
          name: "城市赛",
          childrens: [
            {
              code: 11,
              name: "选拔赛"
            },
            {
              code: 12,
              name: "晋级赛"
            },
            {
              code: 13,
              name: "决赛"
            }
          ]
        },
        {
          code: 2,
          name: "城际赛",
          childrens: [
            {
              code: 21,
              name: "淘汰赛/循环赛"
            },
            {
              code: 22,
              name: "1/4决赛"
            },
            {
              code: 23,
              name: "决赛"
            }
          ]
        }
      ]
    };
  },
  
  watch: {


    valueNeed: {
      handler(newVal, oldVal) {
        console.log("valueNeed#############################################");
        this.$emit("input", this.valueNeed); //同步valueNeed值到value
      },
      // immediate: true,//组件初始化时立即执行一次变动
      deep: true //深度监听
    },
    matchType: {
      handler(newVal, oldVal) {
        this.init(); //调用：{初始化函数}
      },
      immediate: true, //组件初始化时立即执行一次变动
      deep: true //深度监听
    }
  },
  methods: {
    selectSmallProcess() {
      //函数：{选择小赛段后函数}
      // this.valueNeed.smallProgress = this.smallProgress;
      // this.valueNeed.bigProgress = this.bigProgress;
      //  this.$emit("input", this.valueNeed); //同步valueNeed值到value
    },
    selectBigProcess(value) {
      //函数：{选择大赛段后函数}
      console.log(value);
      this.optionsSmall = this.options[value - 1].childrens;
      this.valueNeed.smallProgress = this.optionsSmall[0].code;
      // this.selectSmallProcess()//函数：{选择小赛段后函数}

    },
 
    //函数：{初始化函数}
    init() {
      
      
      //如果是普通比赛
      if (this.matchType == 1) {
        this.optionsSmall = [
          {
            code: 21,
            name: "淘汰赛/循环赛"
          },
          {
            code: 22,
            name: "1/4决赛"
          },
          {
            code: 23,
            name: "决赛"
          }
        ];
      }else if(this.valueNeed.bigProgress){
        let docNeed=this.options.find(docEach=>docEach.code==this.valueNeed.bigProgress);
        if(!docNeed)return;
        this.optionsSmall = docNeed.childrens;

      }
    },
    created() {}
  }
};
</script>

<style scoped>
</style>
