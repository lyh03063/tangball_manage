<template>
  <div class="MT5 MB5">
    <!-- <div class="FR">
      <el-button plain @click="isEdit=false" size="mini" v-if="isEdit">取消编辑</el-button>
      <el-button type="primary" size="mini" @click="isEdit=true" v-if="!isEdit">编辑</el-button>
    </div> -->
    <table class="n-table n-table-debug " v-if="valueNeed.data">
      <tr>
        <td class="WP20 FWB">调试数据</td>
        <td class="WP20 FWB">说明</td>
        <td class="FWB">字段值</td>
      </tr>
      <tr v-for="(item,index) in valueNeed.list" :key="index">
        <td>{{item.key}}</td>
        <td>{{item.label}}</td>
        <td>
          <span
            :title="getValue(item.key)"
            class="DPIB valueShow"
          >{{getValue(item.key)}}</span>
          
        </td>
      </tr>
    </table>
  </div>
</template>

<script>

export default {
  components: {
    //注册组件

  },
  //用于列表模糊查询的组件
  props: {
    value: {
      type: [Object],
      default() {
        return {
          dataObj: {
            name: "李四"
          },
          list: [{ label: "名称", key: "name" }]
        };
      }
    }
  },
  data() {
    return {
      isEdit: false,
      valueNeed: this.value
    };
  },
  watch: {
    valueNeed: {
      handler(newVal, oldVal) {
        this.$emit("input", this.valueNeed); //同步valueNeed值到value
      },
      // immediate: true,//组件初始化时立即执行一次变动
      deep: true //深度监听
    }
  },
  methods: {
    getValue(key) {
      //变量：{根据属性路径获取到对应的属性值}
      //lodash.get函数*****
      let isData = lodash.has(this.valueNeed.data, key); //变量：{是否为data},通过lodash.has方法来判断
      let value;
      //如果key在data中存在，则在data中读取，否则从props中读取
      if (isData) {
        value = lodash.get(this.valueNeed.data, key);
      } else {
        value = lodash.get(this.valueNeed.props, key);
      }

      return value;
    }
  },
  created() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.valueShow {
  overflow-y: auto;
  max-height: 50px;
}

table.n-table.n-table-debug td,
table.n-table.n-table-debug th {
  padding: 5px;
}
</style>
