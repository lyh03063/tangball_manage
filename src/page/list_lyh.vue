<template>
  <div class>{{arrProvice}}</div>
</template>
<script>
//导入自定义复选框组件，注意路径改为自己的
import ajax_populate from "../components/common/ajax_populate.vue";

export default {
  components: { ajax_populate },
  data() {
    return {
      arrProvice: null
    };
  },
  created() {
    let arrDataBase = [
      {
        P2: "广西",
        P7: "45",
        P8: "0001"
      },
      {
        P2: "广东",
        P7: "44",
        P8: "0001"
      },
      {
        P2: "深圳",
        P7: "4403",
        P8: "44"
      },
      {
        P2: "韶关",
        P7: "4402",
        P8: "44"
      },
      {
        P2: "南山区",
        P7: "440305",
        P8: "4403"
      },
      {
        P2: "福田区",
        P7: "440304",
        P8: "4403"
      }
    ];
    //变量：{省份地区数组}----使用filter过滤
    this.arrProvice = arrDataBase.filter(docBase => docBase.P8 == "0001");
    //函数定义：{获取子数据函数}
    function getChildren(arr) {
      console.count("getChildren");
      arr.forEach(docEach => {
        //使用filter过滤出当前地区的子地区数组
        let arrChildren = arrDataBase.filter(
          docBase => docBase.P8 == docEach.P7
        );

        //如果子地区数组存在
        if (arrChildren.length) {
          docEach.children = arrChildren;
        }

        if (docEach.children) {
          //如果子地区数组存在
          getChildren(docEach.children); //递归调用：{获取子数据函数}
        }
      });
    }

    getChildren(this.arrProvice); //首次调用：{获取子数据函数}
  }
};
</script>


