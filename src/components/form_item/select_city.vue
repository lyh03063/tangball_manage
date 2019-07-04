<template>
  <div class>
    <el-cascader
      :options="options"
      @active-item-change="handleItemChange"
      @change="changeArea"
      :props="props"
      v-model="valueNeed"
    ></el-cascader>
  </div>
</template>

<script>
/** 这个组件比较坑的地方在于其默认绑定的value数据格式是编号数组形式
 * 获取城市名称很不方便
 *
 */
export default {
  props: {
    value: {
      // type: [Array,String],
      // default: function() {
      //   return ["44", "4401"];
      // }
    },
    cityName: {
      type: String
    },
    valueType: {
      //值类型
      type: String
    }
  },
  data() {
    return {
      url: {
        list: "http://120.76.160.41:3000/crossList?page=dmagic_area" //列表接口
      },
      valueNeed: [],
      options: [
        {
          value: "44",
          label: "广东",
          cities: [
            {
              value: "4401",
              label: "广州"
            }
          ]
        },
        {
          value: "45",
          label: "广西",
          cities: []
        }
      ],
      cityList: null, //缓存的城市文档列表，用于获取城市名称
      props: {
        // value: "label",
        children: "cities" //指定children键名
      }
    };
  },
  // watch: {
  //   valueNeed: {
  //     handler(newName, oldName) {
  //       //Q1:{值类型}不是城市ID
  //       if (this.valueType != "cityId") {
  //         this.$emit("input", this.valueNeed); //同步valueNeed值到value
  //       }
  //     },
  //     immediate: true,
  //     deep: true
  //   }
  // },

  methods: {
    changeArea(arr) {
      //函数：{城市地区变动函数}
      //这里如何获取到cityName
      let cityId = arr[1];
      let docCity = this.cityList.find(doc => doc.P7 == cityId);
      let cityName = docCity.P2;
      this.$emit("change-city-name", cityName); //同步外部的城市名称
      //Q1:{值类型}是城市ID
      if (this.valueType == "cityId") {
        this.$emit("input", cityId); //同步valueNeed值到value
      } else {
        this.$emit("input", this.valueNeed); //同步valueNeed值到value
      }
    },
    async ajaxGetOp(pid) {
      //请求接口
      let { data } = await axios({
        method: "post",
        url: this.url.list,
        //传递参数
        data: {
          findJson: { P8: pid }
        }
      });
      if (pid != "0001") {
        //如果不是获取一级数据
        this.cityList = data.list; //缓存城市列表
      }

      return data.list.map(docEach => {
        return {
          value: docEach.P7,
          label: docEach.P2,
          cities: pid == "0001" ? [] : null //如果是省份数据，给个空数组
        };
      });
    },
    async handleItemChange(val, p2) {
      let provinceId = val[0];
      if(!provinceId)return;
      let objOption = this.options.find(opEach => opEach.value == provinceId);
      //如果能找到
      if (objOption) {
        
        objOption.cities = await this.ajaxGetOp(provinceId);
      }
    }
  },
  async created() {
    this.options = await this.ajaxGetOp("0001");

    if (this.value && this.value[0]) {
      let provinceId = this.value[0];
      //Q1:{值类型}是城市ID
      if (this.valueType == "cityId") {
        provinceId = this.value.substr(0, 2); //字符串截取前2位

        this.valueNeed = [provinceId, this.value];
        //Q1:{值类型}是地区数组
      } else {
        this.valueNeed = this.value;
      }

      let objOption = this.options.find(opEach => opEach.value == provinceId);
      if (objOption) {
        //如果{000}000
        objOption.cities = await this.ajaxGetOp(provinceId);
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
