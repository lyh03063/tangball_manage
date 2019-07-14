<template>
  <tr>
    <td class="WP20">{{path}}</td>
    <td class="WP20">{{text}}</td>
    <td class>
      <span class="DPIB valueShow">{{getValue(path)}}</span>
    </td>
  </tr>
</template>

<script>

export default {
  components: {
    //注册组件

  },

  props: ["path", "text"],
  data() {
    return {
      dataValue: this.getValue(this.path),
    };
  },

  methods: {
    getValue(path) {
      let objDebugList = this.$parent;
      console.log("objDebugList.levelUp", objDebugList.levelUp);



      let objNeed = objDebugList.objNeedDebug;

      // let pathObjNeed = "$parent"//变量：{所需调试组件对象的父级路径}

      // if (objDebugList.levelUp > 0) {//如果{所需调试组件对象的父级层级}大于0,
      //   let n = Number(objDebugList.levelUp);
      //   for (var i = 0; i < n; i++) {

      //     pathObjNeed += ".$parent"
      //   }

      // }
      // objNeed = lodash.get(objNeed, pathObjNeed)//进行重新定位

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

table.n-table.n-table-debug td,
table.n-table.n-table-debug th {
  padding: 5px;
}
</style>
