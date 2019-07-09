<template>
  <div class v-if="matchInfo">
    <table class="n-table MTB0" v-if="debug">
      <tr>
        <td class="WP20">字段</td>
        <td class="WP30">说明</td>
        <td>字段值</td>
      </tr>
      <tr>
        <td>matchInfo</td>
        <td>赛事信息</td>
        <td>{{matchInfo}}</td>
      </tr>

      <tr>
        <td>matchInfo.matchProgress</td>
        <td>赛事阶段</td>
        <td>{{matchInfo.matchProgress}}</td>
      </tr>
      <tr>
        <td>cityVenuIdForEnroll</td>
        <td>报名表的城市场馆id</td>
        <td>{{cityVenuIdForEnroll}}</td>
      </tr>
      <tr>
        <td>cfListForEnroll.findJsonDefault</td>
        <td>列表的默认查询参数</td>
        <td>{{cfListForEnroll.findJsonDefault}}</td>
      </tr>
      <tr>
        <td>cfListForEnroll.formDataAddInit</td>
        <td>新增报名数据的初始值</td>
        <td>{{cfListForEnroll.formDataAddInit}}</td>
      </tr>
    </table>
    <!-- {{matchInfo}} -->
    <!-- <div class="TAC FS20 LH40">{{matchInfo.matchName}}</div>
    <div class="TAC FS16 LH40">当前赛事进度</div>-->

    <div class="panel">
      <div class="OFH">
        <div class="FL FWB FS16 LH30">城市赛报名信息</div>

        <div class="FR">
          <el-button plain @click="isEdit=false" size="mini" v-if="isEdit">取消编辑</el-button>
          <el-button type="primary" size="mini" @click="isEdit=true" v-if="!isEdit">编辑</el-button>
        </div>
      </div>

      <div class>
        <el-radio-group
          v-model="cityVenuIdForEnroll"
          style="margin-bottom: 10px;"
          @change="changecityVenuIdForEnroll"
        >
          <el-radio-button
            :label="item.venueId"
            v-for="(item,index) in matchInfo.cityVenueList"
            :key="index"
          >{{item.cityName}}</el-radio-button>
        </el-radio-group>
      </div>
      <listData :cf="cfListForEnroll" ref="listForEnroll">
        <!-- 选择赛事和场馆 -->
        <template v-slot:slot_form_item_matchInfo="{formData}">
          <match_venue v-model="formData.cityVenueId" :matchId="formData.matchId"></match_venue>
        </template>

        <template v-slot:slot_detail_item_album="{row}">
          <div class v-if="row.album && row.album.length">
            <img
              @click="showBigImg(item.url)"
              :src="item.url"
              alt
              v-for="item in row.album"
              :key="item.url"
              class="W100 H100"
            >
          </div>
        </template>
        <!--详情弹窗的 memberId 字段组件，注意插槽命名-->
        <template v-slot:slot_detail_item_memberId="{row}">
          <ajax_populate :id="row.memberId" populateKey="name" page="tangball_member">
            <template v-slot:default="{doc}">
              <div class v-if="doc && doc.P1">
                {{doc.P1}}
                (
                {{doc.name}})
              </div>
            </template>
          </ajax_populate>
        </template>

        <!--详情弹窗的 matchId 字段组件，注意插槽命名-->
        <template v-slot:slot_detail_item_matchId="{row}">
          <ajax_populate :id="row.matchId" populateKey="matchName" page="tangball_match">
            <template v-slot:default="{doc}">
              <div class v-if="doc && doc.P1">
                {{doc.P1}}
                (
                {{doc.matchName}})
              </div>
            </template>
          </ajax_populate>
        </template>
      </listData>
    </div>
  </div>
</template>

<script>
import listData from "../list-data/list-data.vue";
import ajax_populate from "../common/ajax_populate.vue";
import select_match_progress from "../form_item/select_match_progress.vue";
import match_venue from "../form_item/match_venue.vue";
export default {
  components: { listData, ajax_populate, select_match_progress, match_venue },
  props: {
    matchId: [String, Number],

  },
  data() {
    return {
       debug: window.pub_debug,
      isEdit: false, //是否为可编辑状态

      cityMatchVenuId: null, //城市赛场馆选项卡的聚焦值
      cityVenuIdForEnroll: null, //城市赛场馆选项卡的聚焦值(用于报名表)
      matchInfo: null, //赛事信息

      cfListForEnroll: {
        isShowSearchForm: false, //隐藏查询表单
        listIndex: "list_enroll", //vuex对应的字段
        isShowBreadcrumb: false, //隐藏面包屑导航
        isShowOperateColumn: false, //隐藏操作列
        isShowToolBar: false, //隐藏工具栏
        flag: true, //显示新增按钮
        findJsonDefault: {
          matchId: this.matchId
          // cityVenueId: 21
        },
        //新增表单初始赋值
        formDataAddInit: {
          matchId: this.matchId,
          cityVenueId: 21
        },

        url: {
          list: "http://120.76.160.41:3000/crossList?page=tangball_enroll", //列表接口
          add: "http://120.76.160.41:3000/crossAdd?page=tangball_enroll", //新增接口
          modify: "http://120.76.160.41:3000/crossModify?page=tangball_enroll", //修改接口
          detail: "http://120.76.160.41:3000/crossDetail?page=tangball_enroll", //查看单条数据详情接口，在修改表单或详情弹窗用到
          delete: "http://120.76.160.41:3000/crossDelete?page=tangball_enroll" //删除接口
        },
        //-------列配置数组-------
        columns: [
          {
            label: "报名会员id",
            prop: "memberId",
            slot: "slot_detail_item_memberId",
            width: 130
          },
          {
            label: "赛事",
            prop: "matchId",
            slot: "slot_detail_item_matchId",
            width: 180
          },
          {
            label: "手机号",
            prop: "phone",
            width: 100
          },
          {
            label: "性别",
            prop: "sex",
            width: 65,
            formatter: function(rowData) {
              if (rowData.sex == 1) {
                return "男";
              } else {
                return "女";
              }
            }
          },
          {
            label: "年龄",
            prop: "age",
            width: 65
          },

          {
            label: "报名时间",
            prop: "time",
            width: 75
          },
          {
            label: "支付状态",
            prop: "payStatus",
            width: 70,
            formatter: function(rowData) {
              if (rowData.payStatus == 1) {
                return "已支付";
              } else {
                return "未支付";
              }
            }
          },
          {
            label: "审核状态",
            prop: "auditStatus",
            "min-width": "100",
            formatter: function(rowData) {
              if (rowData.auditStatus == 1) {
                return "未审核";
              } else if (rowData.auditStatus == 2) {
                return "审核不通过";
              } else {
                return "审核通过";
              }
            }
          }
        ],
        //-------筛选表单字段数组-------
        searchFormItems: [
          {
            label: "报名会员id",
            prop: "memberId"
          },
          {
            label: "赛事id",
            prop: "matchId",
            type: "select",
            ajax: {
              url: "http://120.76.160.41:3000/crossList?page=tangball_match",
              keyLabel: "matchName",
              keyValue: "P1"
            }
          },
          {
            label: "城市场馆",
            prop: "cityVenueId"
          },
          {
            label: "支付状态",
            prop: "payStatus",
            type: "select",
            options: [
              { label: "已支付", value: 1 },
              { label: "未支付", value: 2 }
            ]
          },
          {
            label: "审核状态",
            prop: "auditStatus",
            type: "select",
            options: [
              { label: "未审核", value: 1 },
              { label: "审核不通过", value: 2 },
              { label: "审核通过", value: 3 }
            ]
          }
        ],
        //-------详情字段数组-------
        detailItems: [
          {
            label: "报名会员id",
            prop: "memberId",
            slot: "slot_detail_item_memberId"
          },
          {
            label: "赛事id",
            prop: "matchId",
            slot: "slot_detail_item_matchId"
          },
          {
            label: "手机号",
            prop: "phone",
            width: 100
          },
          {
            label: "性别",
            prop: "sex",
            width: 50,
            formatter: function(rowData) {
              if (rowData.sex == 1) {
                return "男";
              } else {
                return "女";
              }
            }
          },
          {
            label: "年龄",
            prop: "age",
            width: 50
          },
          {
            label: "职业",
            prop: "career",
            width: 50
          },
          {
            label: "球龄",
            prop: "ballAge",
            width: 100,
            formatter: function(rowData) {
              if (rowData.ballAge == 1) {
                return "一年以下";
              } else if (rowData.ballAge == 2) {
                return "一到三年";
              } else if (rowData.ballAge == 3) {
                return "三到五年";
              } else if (rowData.ballAge == 4) {
                return "五到十年";
              } else {
                return "十年以上";
              }
            }
          },
          {
            label: "身份证号",
            prop: "idCard"
          },

          {
            label: "报名时间",
            prop: "time",
            formatter: function(row) {
              return moment(row.time).format("YYYY-MM-DD");
            }
          },
          {
            label: "支付状态",
            prop: "payStatus",
            width: 100,
            formatter: function(rowData) {
              if (rowData.payStatus == 1) {
                return "已支付";
              } else {
                return "未支付";
              }
            }
          },
          {
            label: "审核状态",
            prop: "auditStatus",
            width: 100,
            formatter: function(rowData) {
              if (rowData.auditStatus == 1) {
                return "未审核";
              } else if (rowData.auditStatus == 2) {
                return "审核不通过";
              } else {
                return "审核通过";
              }
            }
          }
        ],
        //-------新增、修改表单字段数组-------
        formItems: [
          {
            label: "报名会员id",
            prop: "memberId",

            type: "select",
            ajax: {
              url: "http://120.76.160.41:3000/crossList?page=tangball_member",
              keyLabel: "name",
              keyValue: "P1"
            },
            rules: [{ required: true, message: "报名会员id" }]
          },
          {
            label: "赛事id",
            prop: "matchId",

            type: "select",
            ajax: {
              url: "http://120.76.160.41:3000/crossList?page=tangball_match",
              keyLabel: "matchName",
              keyValue: "P1"
            },
            rules: [{ required: true, message: "赛事id" }],
            hide: true
          },
          {
            label: "赛事信息",
            prop: "cityVenueId",
            slot: "slot_form_item_matchInfo",
            hide: true
          },

          {
            label: "手机号",
            prop: "phone",
            type: "input"
          },
          {
            label: "性别",
            prop: "sex",
            type: "select",
            options: [{ label: "男", value: 1 }, { label: "女", value: 2 }]
          },
          {
            label: "年龄",
            prop: "age",
            type: "input"
          },
          {
            label: "职业",
            prop: "career",
            type: "input"
          },
          {
            label: "球龄",
            prop: "ballAge",
            type: "select",
            options: [
              { label: "一年以下", value: 1 },
              { label: "一到三年", value: 2 },
              { label: "三到五年", value: 3 },
              { label: "五到十年", value: 4 },
              { label: "十年以上", value: 5 }
            ]
          },
          {
            label: "身份证号",
            prop: "idCard"
          },
          {
            label: "报名时间",
            prop: "time",

            type: "date"
          },

          {
            label: "支付状态",
            prop: "payStatus",
            type: "select",
            options: [
              { label: "已支付", value: 1 },
              { label: "未支付", value: 2 }
            ]
          },
          {
            label: "审核状态",
            prop: "auditStatus",
            type: "select",
            options: [
              { label: "未审核", value: 1 },
              { label: "审核不通过", value: 2 },
              { label: "审核通过", value: 3 }
            ]
          }
        ]
      }
    };
  },
  watch: {
    isEdit: {
      handler(newVal, oldVal) {
        if (this.isEdit) {
          //如果{000}000
          this.cfListForEnroll.isShowToolBar = true;
          this.cfListForEnroll.isShowOperateColumn = true;
        } else {
          this.cfListForEnroll.isShowToolBar = false;
          this.cfListForEnroll.isShowOperateColumn = false;
        }
      },
      
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
    //函数：{切换报名表城市场馆函数}
    changecityVenuIdForEnroll() {
      console.log("changecityVenuIdForEnroll######");

      this.cfListForEnroll.findJsonDefault.cityVenueId = this.cityVenuIdForEnroll;
      this.cfListForEnroll.formDataAddInit.cityVenueId = this.cityVenuIdForEnroll;
      if (!this.$refs.listForEnroll) return;
      this.$refs.listForEnroll.getDataList(); //调用：{列表组件查询函数}
    },
    async getMatchData() {
      if (!this.matchId) return;
      //函数：{根据赛事id，ajax获取赛事信息函数}
      let { data } = await axios({
        //请求接口
        method: "post",
        url: "http://120.76.160.41:3000/crossDetail?page=tangball_match",
        data: {
          id: this.matchId
        } //传递参数
      });
      this.matchInfo = data.doc;
      if (this.matchInfo.cityVenueList) {
        //如果{000}000
        this.cityMatchVenuId = this.matchInfo.cityVenueList[0].venueId;
        this.cityVenuIdForEnroll = this.cityMatchVenuId;
        //对报名表的初始筛选参数进行赋值
        this.cfListForEnroll.findJsonDefault.cityVenueId = this.cityVenuIdForEnroll;
        this.cfListForEnroll.formDataAddInit.cityVenueId = this.cityVenuIdForEnroll;
      }
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
