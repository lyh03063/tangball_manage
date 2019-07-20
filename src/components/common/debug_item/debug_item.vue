<template>
  <tr>
    <td class>{{path}}</td>
    <td class>{{text}}</td>
    <td class>
      <el-tooltip class="item" effect="dark" placement="left" >
        <div slot="content">
          <pre class="valueShowInTip">{{getValueStr(path)}}</pre>
        </div>
        <span class="DPIB valueShow">{{getValue(path)}}</span>
      </el-tooltip>
    </td>
  </tr>
</template>

<script>

export default {
  components: {
    //注册组件

  },

  props: ["path", "text", "value"],
  data() {
    return {
      dataValue: this.getValue(this.path),
    };
  },

  methods: {
    getValueStr(path) {
      let data = this.getValue(path);
      let type = util.type(data);
      let arrType=["object","array"];
      if (arrType.includes(type)) {//如果类型是对象或数组
        data = JSON.stringify(data, null, 4);//{Json对象转换Json字符串函数}-后面两个参数可以设置缩进

      } else {
        data += "";//转成字符串
      }
      return data
    },
    getValue(path) {
      let objDebugList = this.$parent;
      let objNeed = objDebugList.objNeedDebug;//需要调试的组件对象
      //变量：{根据属性路径获取到对应的属性值}
      //lodash.get函数*****
      let isData = lodash.has(objNeed.$data, path); //变量：{是否为data},通过lodash.has方法来判断
      console.log("objNeed.$data", objNeed.$data);
      let value;
      //如果path在data中存在，则在data中读取，否则从props中读取
      if (isData) {

        value = lodash.get(objNeed.$data, path);
      } else {
        value = lodash.get(objNeed.$props, path);
      }

      return value;
    }
  },
  created() {


    console.log("this.path", this.path);
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.valueShow {
  overflow-y: auto;
  max-height: 50px;
}
.valueShowInTip {
  overflow-y: auto;
  max-height: 350px;
  font-size: 16px;
}
table.n-table.n-table-debug td,
table.n-table.n-table-debug th {
  padding: 3px;
}
</style>
