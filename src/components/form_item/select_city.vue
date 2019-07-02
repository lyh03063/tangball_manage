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
      type: Array,
      default: function() {
        return ["44", "4401"];
      }
    },
    cityName: {
      type: String,
    }
  },
  data() {
    return {
      url: {
        list: "http://120.76.160.41:3000/crossList?page=dmagic_area" //列表接口
      },
      valueNeed: this.value,
      options: [
        {
          value: "44",
          label: "广东",
          cities: [
            {
              value: "4401",
              label: "aaas"
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
  watch: {
    valueNeed: {
      handler(newName, oldName) {
        this.$emit("input", this.valueNeed); //同步valueNeed值到value
      },
      immediate: true,
      deep: true
    }
  },

  methods: {
    changeArea(arr) {//函数：{城市地区变动函数}
      console.log("arr####", arr);

      //这里如何获取到cityName
      let cityId = arr[1];
      console.log("cityId", cityId);
      console.log("this.cityList", this.cityList);
      let docCity = this.cityList.find(doc => doc.P7 == cityId);
      console.log("docCity", docCity);
      let cityName = docCity.P2;
      console.log("cityName##########", cityName);
      this.$emit("change-city-name", cityName); //同步外部的城市名称

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
      console.log("active item:", val);
      console.log("p2", p2);

      let provinceId = val[0];
      let objOption = this.options.find(opEach => opEach.value == provinceId);
      objOption.cities = await this.ajaxGetOp(provinceId);
    }
  },
  async created() {
    this.options = await this.ajaxGetOp("0001");

    if (this.valueNeed && this.valueNeed[0]) {
      let provinceId = this.valueNeed[0];
      let objOption = this.options.find(opEach => opEach.value == provinceId);
      objOption.cities = await this.ajaxGetOp(provinceId);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
