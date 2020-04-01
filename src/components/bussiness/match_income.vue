<template>
  <div class>
    <dm_debug_list>
      <dm_debug_item v-model="matchInfo" text="赛事信息-" />
    </dm_debug_list>
    <div class v-if="ready">
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="财务概况" name="survey">
          <dm_space height="20"></dm_space>
          <el-row :gutter="2" v-if="readyIncome">
            <el-col :span="4">
              <span class="label">已支付金额：</span>

              <span class="C_f30 FM4 FS20">￥{{dataMatchIncome.moneyPayOrder}}</span>
            </el-col>
            <el-col :span="4">
              <span class="label">已支付订单数：</span>

              <span class="FM4 FS20">{{dataMatchIncome.countPayOrder}}</span>
            </el-col>
          </el-row>
          <el-row :gutter="2" class="MT20" v-if="readyIncome">
            <el-col :span="4">
              <span class="label">未支付金额：</span>

              <span class="FM4 FS20">￥{{dataMatchIncome.moneyUnPayOrder}}</span>
            </el-col>
            <el-col :span="4">
              <span class="label">未支付订单数：</span>

              <span class="FM4 FS20">{{dataMatchIncome.countUnPayOrder}}</span>
            </el-col>
          </el-row>
          <dm_space height="100"></dm_space>
        </el-tab-pane>
        <el-tab-pane label="订单明细" name="list_order">
          <dm_list_data :cf="cfListEnrool"></dm_list_data>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
export default {
  name: "match_enroll",
  components: {},
  props: {
    matchId: [String, Number]
  },
  mixins: [],
  data() {
    return {
      activeName: 'survey',
      dataMatchIncome: {},
      incomeMoney: 33445,
      isEdit: false, //是否为可编辑状态
      matchInfo: null, //赛事信息
      ready: false, //赛事信息是否加载完毕
      readyIncome: false, //赛事输入数据加载完毕

      cfListEnrool: lodash.cloneDeep(PUB.listCF.tangball_match_enroll_income)
    };
  },
  watch: {

    matchId: {
      handler(newVal, oldVal) {
        if (!this.matchId) return;
        this.getMatchData();
        this.ajaxGetMatchIncome();//调用：{根据赛事id，ajax获取赛事收入数据函数}
      },
      immediate: true //组件初始化时立即执行一次变动
    }
  },
  methods: {
    async getMatchData() {
      if (!this.matchId) return;
      //函数：{根据赛事id，ajax获取赛事信息函数}
      let { data } = await axios({//请求接口
        method: "post", url: PUB.domain + "/crossDetail?page=tangball_match",
        data: { id: this.matchId } //传递参数
      });
      this.matchInfo = data.Doc;
      //补充列表参数
      this.cfListEnrool.objParamAddon = { findJson: { matchId: this.matchId } }
      this.ready = true;


    },
    async ajaxGetMatchIncome() {//函数：{根据赛事id，ajax获取赛事收入数据函数}
      if (!this.matchId) return;

      let { data } = await axios({//请求接口
        method: "post", url: PUB.domain + "/tangball/getMatchIncome",
        data: { matchId: this.matchId } //传递参数
      });
      this.dataMatchIncome = data.data;

      this.readyIncome = true;

    }
  },
  created() {



  },
  mounted() {

  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.label {
  font-size: 14px;
}
</style>
