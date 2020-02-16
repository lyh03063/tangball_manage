<template>
  <div class>
    <table class="n-table">
      <tr>
        <td>选择城市</td>
        <td>
          <dm_debug_list>
            <dm_debug_item v-model="arrArea" text="arrArea" />
          </dm_debug_list>

          <select_area v-model="arrArea" value-type="arrObj" level="2"></select_area>
          <!-- <select_area v-model="arrArea" value-type="lastId" level="2"></select_area> -->
        </td>
      </tr>
      <tr>
        <td>选择场馆</td>
        <td>
          <div class="venue-list-box">
            <!-- <div class>根据地区id,ajax查询场馆列表</div> -->
            <div class="venue-box" v-for="doc in venueOp" :key="doc.P1">
              <el-radio
                v-model="venue"
                :label="doc.P1"
                border
                class="venue-radio"
                @change="changeVanue(doc)"
              >{{doc.name}}</el-radio>
            </div>
          </div>

          <div class="C_f60" v-if="!(venueOp&&venueOp.length)">该城市还没用合作的唐球场</div>
        </td>
      </tr>
    </table>
  </div>
</template>
<script>
import select_area from "./select_area.vue";

export default {
  components: { select_area },
  props: {
    value: {
      type: Object
      // default:function(){
      //  return ["44", "4401"]
      // }
    }
  },
  data() {
    return {
      valueNeed: this.value,
      venue: this.value.venueId,
      venueOp: [],
      cityName: this.value.cityName,
      url: {
        list: "/crossList?page=tangball_venue" //场馆列表接口
      },

      arrArea: [
        { value: this.value.cityId.slice(0, 2) },
        { label: this.value.cityName, value: this.value.cityId }
      ]
    };
  },
  watch: {
    valueNeed: {
      handler(newName, oldName) {
        this.$emit("input", this.valueNeed); //同步valueNeed值到value
      },
      immediate: true,
      deep: true
    },
    arrArea: {
      //监听地区数组
      async handler(newName, oldName) {
        this.cityIdTemp = this.arrArea[1].value;
        if (!this.cityIdTemp) return;
        this.venueOp = await this.ajaxGetVenue(this.cityIdTemp);
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    changeVanue(docVenue) {
      //场馆变动的函数，进行数据同步
      this.valueNeed.venueId = docVenue.P1; //变动valueNeed
      this.valueNeed.venueName = docVenue.name; //变动valueNeed
      this.valueNeed.cityId = this.cityIdTemp; //变动valueNeed***
      this.valueNeed.cityName = lodash.get(this.arrArea, `[1].label`);; //变动valueNeed***
    },
    async ajaxGetVenue(cityId) {
      //请求接口
      let { data } = await axios({
        method: "post",
        url: PUB.domain + this.url.list,
        //传递参数
        data: {
          findJson: { area: cityId }
        }
      });

      return data.list;
    }
  },
  async created() {
    //this.venueOp = await this.ajaxGetVenue("4401");
  }
};
</script>

<style scoped>
.venue-list-box {
  /* display: flex */
}
.venue-box {
  float: left;
  width: 33.3%;
  margin-bottom: 10px;
}
.venue-radio {
  width: 90%;
}
</style>