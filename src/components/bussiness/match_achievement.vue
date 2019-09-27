<template>
  <div class v-if="matchInfo">
    <dm_debug_list>
      <dm_debug_item v-model="matchInfo" text="赛事信息" />
      <dm_debug_item v-model="matchInfo.matchProgress" text="赛事阶段" />
      <dm_debug_item v-model="cfList.findJsonDefault" text="成绩列表的默认查询参数" />
      <dm_debug_item v-model="cfList.formDataAddInit" text="新增成绩表单默认参数" />
      <dm_debug_item v-model="roundNum" text="轮数" />
      <dm_debug_item v-model="progressCurr" text="当前选中赛段数据" />
      <dm_debug_item
        v-model="cfList.formItems[0].ajax.param.sheetRelation.findJson"
        text="弹窗表单的第一个字段的下拉框选项ajax查询参数"
      />
    </dm_debug_list>

    <div class="panel">
      <div class>
        <div class="OFH">
          <div class="FL FWB FS16 LH30">成绩表</div>

          <div class="FR">
            <el-button plain @click="isEdit=false" size="mini" v-if="isEdit">取消编辑</el-button>
            <el-button type="primary" size="mini" @click="isEdit=true" v-if="!isEdit">编辑</el-button>
          </div>
        </div>
        <el-radio-group
          v-model="progressIndex"
          style="margin-bottom: 10px;"
          @change="changeMatchProgress()"
        >
          <!-- <el-radio-button label>全部</el-radio-button> -->
          <el-radio-button
            :label="index+1"
            v-for="(item,index) in matchInfo.progress"
            :key="index"
          >{{item.name}}</el-radio-button>
        </el-radio-group>
        <dm_space height="1"></dm_space>

        <el-radio-group
          v-model="roundNum"
          style="margin-bottom: 10px;"
          @change="changeMatchRound()"
          v-if="progressCurr"
        >
          <!-- <el-radio-button label>全部</el-radio-button> -->
          <el-radio-button
            :label="item"
            v-for="(item,index) in progressCurr.roundCount*1"
            :key="index"
          >第{{item}}轮</el-radio-button>
        </el-radio-group>
      </div>

      <dm_list_data
        :cf="cfList"
        ref="list1"
        @after-add="updateList"
        @after-modify="updateList"
        @after-delete="updateList"
      >
        <!--详情弹窗的 participantsId 字段组件，注意插槽命名-->
        <template v-slot:slot_detail_item_participantsId="{row}">
          <dm_ajax_populate :id="row.participantsId" populateKey="name" page="tangball_member">
            <template v-slot:default="{doc}">
              <div class v-if="doc && doc.P1">
                {{doc.P1}}
                (
                {{doc.name}})
              </div>
            </template>
          </dm_ajax_populate>
        </template>
      </dm_list_data>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    matchId: [String, Number]
  },
  mixins: [
    PUB.listCF.tangball_achievement,
    PUB.listCF.tangball_achievement_simple
  ],
  data() {
    return {
      matchProgress: { smallProgress: 11, bigProgress: 1 }, //赛事进度条

      isEdit: false,

      progressIndex: 1, //赛段索引
      roundNum: 1, //轮数

      matchInfo: null, //赛事信息
      cfList: {
        isRefreshAfterCUD: false, //增删改操作后是否自动刷新
        //默认查询参数
        findJsonDefault: {
          matchId: this.matchId
        },

        //新增表单初始赋值
        formDataAddInit: {
          matchId: this.matchId
        },

        listIndex: "match_achievement" //vuex对应的字段
      }
    };
  },
  computed: {
    progressCurr() {
      //当前选中赛段数据
      console.log("progressCurr####");
      // return this.$lodash.get(this.matchInfo, `progress[this.progressIndex]`)
      let result;
      if (this.matchInfo && this.matchInfo.progress) {
        result = this.matchInfo.progress[this.progressIndex - 1];
      } else {
        result = {};
      }
      return result;
    }
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
    //函数：{更新小组成绩名次函数}
    async updateList() {
      this.$refs.list1.getDataList(); //调用：{列表组件查询函数}
    },

    /**
     * @name 切换赛段函数
     */
    changeMatchProgress: async function() {
        this.roundNum=1;
        this.changeMatchRound()//调用：{切换轮数函数}

    },
    //函数：{切换轮数函数}
    changeMatchRound() {
      let dataInit = {
        progressIndex: this.progressIndex,
        roundNum: this.roundNum
      };
      Object.assign(this.cfList.findJsonDefault, dataInit); //默认查询参数

      this.$set(
        this.cfList.formDataAddInit,
        "progressIndex",
        this.progressIndex
      );
      this.$set(this.cfList.formDataAddInit, "roundNum", this.roundNum);

      // Object.assign(this.cfList.formDataAddInit, dataInit);//默认新增参数---这种不会响应

      if (!this.$refs.list1) return;
      this.$refs.list1.getDataList(); //调用：{列表组件查询函数}
    },

    async getMatchData() {
      if (!this.matchId) return;
      //函数：{根据赛事id，ajax获取赛事信息函数}
      let { data } = await axios({
        //请求接口
        method: "post",
        url: PUB.domain + "/crossDetail?page=tangball_match",
        data: {
          id: this.matchId
        } //传递参数
      });
      this.matchInfo = data.Doc;
      lodash.set(
        this.cfList,
        `formItems[0].ajax.param.sheetRelation.findJson.matchId`,
        this.matchId
      );
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
