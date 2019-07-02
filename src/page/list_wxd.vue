<template>
  <div class>
    <listData :cf="cfList">
      <template v-slot:slot_detail_item_nationalMatch="{row}">
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
    </listData>
  </div>
</template>
<script>
import listData from "../components/list-data/list-data.vue";

export default {
  components: { listData },
  methods: {
    nationalMatchDelete(key) {
      this.nationalMatch.splice(key, 1);
    },
    nationalMatchAdd() {
      this.nationalMatch.unshift({
        city: " 001",
        cityName: "深圳",
        venueName: "北堂"
      });
    }
  },
  data() {
    return {
      nationalMatch: [
        { city: "001", cityName: "深圳1", venueName: "北堂1" },
        { city: "001", cityName: "深圳2", venueName: "北堂2" },
        { city: "001", cityName: "深圳3", venueName: "北堂3" }
      ],
      cfList: {
        listIndex: "list_match", //vuex对应的字段
        twoTitle: "赛事",
        threeTitle: "赛事数据",
        flag: true,
        url: {
          list: "http://120.76.160.41:3000/crossList?page=tangball_match", //列表接口
          add: "http://120.76.160.41:3000/crossAdd?page=tangball_match", //新增接口
          modify: "http://120.76.160.41:3000/crossModify?page=tangball_match", //修改接口
          delete: "http://120.76.160.41:3000/crossDelete?page=tangball_match" //删除接口
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
          }
        ],
        //-------筛选表单字段数组-------
        searchFormItems: [
          {
            label: "赛事类型",
            prop: "matchType",
            type: "select",
            options: [
              { label: "比杆赛", value: 1 },
              { label: "比洞赛", value: 2 }
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
              return rowData.matchType == 1 ? "比杆赛" : "比洞赛"; //三元表达式
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
              { label: "比杆赛", value: 1 },
              { label: "比洞赛", value: 2 }
            ]
          },
          {
            label: "全国性赛事设置",
            prop: "nationalMatch",
            type: "select",
            slot: "slot_detail_item_nationalMatch"
          }
        ]
      }
    };
  },
  beforeCreate() {
    this.$store.commit("changeActiveMenu", "list_match"); //菜单聚焦
  }
};
</script>


<style>
.nationalMatch span {
  display: block;
  background-color: #fff;
  padding: 3px 0;
  margin: 15px 30px;
  margin-right: 100px;
  position: relative;
}

.nationalMatch {
  text-align: center;
  border: 1px solid black;
  background-color: #e8e8e8;
  padding: 20px;
  width: 70%;
}
i.el-icon-remove-outline {
  position: absolute;
  top: 3px;
  right: -50px;
  font-size: 36px;
  color: #969696;
  font-weight: bold;
  border-color: red;
}
i.el-icon-plus {
  position: absolute;
  top: -5px;
  right: 240px;
  display: block;
  /* width: 50px; */
  background-color: #a3a3a3;
  padding: 5px;
  color: #fff;
  font-size: 20px;
  font-weight: bold;
  border-radius: 5px;
}
</style>
