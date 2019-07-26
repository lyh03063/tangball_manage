<template>
  <div class>
    <listData :cf="cfList">
      <!-- 全国性赛事 -->
      <template v-slot:slot_modify_item_nationalMatch="{row}">
        <div>城市赛阶段的城市场馆列表（已选{{nationalMatch.length}}个）</div>
        <div class="nationalMatch">
          <i class="el-icon-plus" @click="nationalMatchAdd"></i>
          <span v-for="(item,index) in nationalMatch" :key="index">
            {{item.cityName}}--{{item.venueName}}
            <i
              class="el-icon-remove-outline"
              @click="nationalMatchDelete(index)"
            ></i>
          </span>
        </div>
      </template>
      <!-- 赛程联动下拉框 -->
      <template v-slot:slot_modify_item_selectMatch="{row}">
        <el-select v-model="bigmatchProcess" placeholder="请选择" @change="selectChange">
          <el-option
            v-for="item in matchProcess"
            :key="item.code"
            :label="item.name"
            :value="item.code"
          ></el-option>
        </el-select>
        <el-select v-model="smallmatchProcess" placeholder="请选择">
          <el-option
            v-for="item in newsmallmatchProcess"
            :key="item.code"
            :label="item.name"
            :value="item.code"
          ></el-option>
        </el-select>
      </template>
    </listData>
  </div>
</template>
<script>
import listData from "@/components/list-data/list-data.vue";

export default {
  components: { listData },
  data() {
    return {
      bigmatchProcess: "",
      smallmatchProcess: "",
      newsmallmatchProcess: [],
      matchProcess: [
        {
          code: 1,
          name: "城市赛",
          childrens: [
            {
              code: "01",
              name: "选拔赛"
            },
            {
              code: "02",
              name: "晋级赛"
            },
            {
              code: "03",
              name: "决赛"
            }
          ]
        },
        {
          code: 2,
          name: "城际赛",
          childrens: [
            {
              code: "04",
              name: "淘汰赛/循环赛"
            },
            {
              code: "05",
              name: "1/4决赛"
            },
            {
              code: "06",
              name: "决赛"
            }
          ]
        }
      ],
      nationalMatch: [
        { city: "001", cityName: "深圳1", venueName: "深圳唐球馆1" },
        { city: "001", cityName: "深圳2", venueName: "深圳唐球馆2" },
        { city: "001", cityName: "深圳3", venueName: "深圳唐球馆3" }
      ],

      cfList: {
        listIndex: "list_match", //vuex对应的字段
        twoTitle: "赛事",
        threeTitle: "赛事数据",
        flag: true,
        url: {
          list: "/crossList?page=tangball_match", //列表接口
          add: "/crossAdd?page=tangball_match", //新增接口
          modify: "/crossModify?page=tangball_match", //修改接口
          delete: "/crossDelete?page=tangball_match" //删除接口
        },
        //-------列配置数组-------
        columns: [
          {
            label: "id",
            prop: "P1",
            width: 50
          },
          {
            label: "赛事名称",
            prop: "matchName",
            width: 100
          },
          {
            label: "赛事时间",
            prop: "matchTime",
            width: 100
          },
          {
            label: "比赛场馆",
            prop: "venue",
            width: 90
          },
          {
            label: "报名人数",
            prop: "registeredPersons",
            width: 90
          },
          {
            label: "报名费",
            prop: "registrationFee",
            width: 75
          },
          {
            label: "发布",
            prop: "publicationStatus",
            width: 75,
            formatter: function(rowData) {
              return rowData.publicationStatus == 1 ? "发布" : "未发布"; //三元表达式
            }
          },
          {
            label: "状态",
            prop: "matchStatus",
            width: 75,
            formatter: function(rowData) {
              if (rowData.matchStatus == 1) {
                return "未开始";
              } else if (rowData.matchStatus == 2) {
                return "进行中";
              } else {
                return "已结束";
              }
            }
          },
          {
            label: "类型",
            prop: "matchType",
            width: 75,
            formatter: function(rowData) {
              return rowData.matchType == 1 ? "普通赛" : "全国赛"; //三元表达式
            }
          }
        ],
        //-------筛选表单字段数组-------
        searchFormItems: [
          {
            label: "赛事类型",
            prop: "matchType",
            type: "select",
            options: [
              { label: "普通赛", value: 1 },
              { label: "全国赛", value: 2 }
            ]
          },
          {
            label: "赛事状态",
            prop: "matchStatus",
            type: "select",
            options: [
              { label: "未开始", value: 1 },
              { label: "进行中", value: 2 },
              { label: "已结束", value: 3 }
            ]
          },
          {
            label: "发布状态",
            prop: "publicationStatus",
            type: "select",
            options: [{ label: "是", value: 1 }, { label: "否", value: 2 }]
          },
          {
            label: "赛事时间",
            prop: "matchTime",
            type: "time_period"
          }
        ],
        //-------详情字段数组-------
        detailItems: [
          {
            label: "数据id",
            prop: "P1"
          },
          {
            label: "赛事名称",
            prop: "matchName"
          },
          {
            label: "赛事时间",
            prop: "matchTime"
          },
          {
            label: "比赛场馆",
            prop: "venue"
          },
          {
            label: "报名人数",
            prop: "registeredPersons"
          },
          {
            label: "报名费用",
            prop: "registrationFee"
          },
          {
            label: "赛事状态",
            prop: "matchStatus",
            formatter: function(rowData) {
              if (rowData.matchStatus == 1) {
                return "未开始";
              } else if (rowData.matchStatus == 2) {
                return "进行中";
              } else {
                return "已结束";
              }
            }
          },
          {
            label: "发布状态",
            prop: "publicationStatus",
            formatter: function(rowData) {
              return rowData.publicationStatus == 1 ? "发布" : "未发布"; //三元表达式
            }
          },
          {
            label: "赛事类型",
            prop: "matchType",
            formatter: function(rowData) {
              return rowData.matchType == 1 ? "普通赛" : "全国赛"; //三元表达式
            }
          },
          {
            label: "赛事介绍",
            prop: "matchIntroduce"
          },
          {
            label: "赛事手册",
            prop: "matchManual"
          },
          {
            label: "路线地图",
            prop: "routeMap"
          }
        ],
        //-------新增、修改表单字段数组-------
        formItems: [
          {
            label: "赛事状态",
            prop: "matchStatus",
            type: "select",
            options: [
              { label: "未开始", value: 1 },
              { label: "进行中", value: 2 },
              { label: "已结束", value: 3 }
            ]
          },

          {
            label: "发布状态",
            prop: "publicationStatus",
            type: "select",
            options: [{ label: "是", value: 1 }, { label: "否", value: 2 }]
          },
          {
            label: "赛事类型",
            prop: "matchType",
            type: "select",
            options: [
              { label: "普通赛", value: 1 },
              { label: "全国赛", value: 2 }
            ]
          },
          {
            label: "比赛场馆",
            prop: "venue",
            type: "select",
            ajax: {
              url: "/crossList?page=tangball_venue",
              keyLabel: "name",
              keyValue: "name"
            }
          },
          {
            label: "赛事时间",
            prop: "matchTime",
            type: "date"
          },
          {
            label: "全国性赛事",
            prop: "nationalMatch",
            type: "select",
            slot: "slot_modify_item_nationalMatch"
          },
          {
            label: "赛事阶段",
            prop: "matchProcess",
            type: "select",
            slot: "slot_modify_item_selectMatch"
          },
          {
            label: "数据的id",
            prop: "P1"
          },
          {
            label: "赛事名称",
            prop: "matchName"
          },

          {
            label: "报名人数",
            prop: "registeredPersons"
          },
          {
            label: "报名费用",
            prop: "registrationFee"
          },

          {
            label: "赛事介绍",
            prop: "matchIntroduce"
          },
          {
            label: "赛事手册",
            prop: "matchManual",
            type: "textarea"
          },
          {
            label: "路线地图",
            prop: "routeMap"
          }
        ]
      }
    };
  },

  methods: {
    //赛事阶段下拉框
    selectChange(value) {
      this.newsmallmatchProcess = this.matchProcess[value - 1].childrens;
      this.smallmatchProcess = this.newsmallmatchProcess[0].name;
    },
    //删除
    nationalMatchDelete(key) {
      this.nationalMatch.splice(key, 1);
    },
    //增加
    nationalMatchAdd() {
      this.nationalMatch.unshift({
        city: " 001",
        cityName: "深圳",
        venueName: "深圳唐球馆"
      });
    }
  }
};
</script>


<style scoped>
.nationalMatch span {
  display: block;
  background-color: #fff;
  padding: 3px 0;
  margin: 10px 15px;
  margin-right: 100px;
  position: relative;
}

.nationalMatch {
  text-align: center;
  border: 1px solid black;
  background-color: #e8e8e8;
  padding: 20px;
  width: 80%;
}
i.el-icon-remove-outline {
  position: absolute;
  top: 10px;
  right: -50px;
  font-size: 20px;
  color: #969696;
  font-weight: bold;
  border-color: red;
}
i.el-icon-plus {
  position: absolute;
  top: 5px;
  right: 20%;
  display: block;
  background-color: #a3a3a3;
  padding: 5px;
  color: #fff;
  font-size: 10px;
  font-weight: bold;
  border-radius: 5px;
}
</style>