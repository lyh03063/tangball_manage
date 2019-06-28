<template>
  <div class>
    <listData :formData="formData" :cf="cfList">
      <template v-slot:slot_area="{formData}">
        <el-form>
          <el-form-item prop="area">
            <el-cascader :options="options" v-model="formData.area"></el-cascader>
          </el-form-item>
        </el-form>
      </template>
    </listData>
  </div>
</template>
<script>
import listData from "../components/list-data/list-data.vue";

export default {
  components: { listData },
  data() {
    return {
      formData: {},
      options: option,
      cfList: {
        listIndex: "list_venue", //vuex对应的字段
        twoTitle: "赛事",
        threeTitle: "场馆",
        flag: true,
        url: {
          list: "http://120.76.160.41:3000/crossList?page=tangball_venue", //列表接口
          add: "http://120.76.160.41:3000/crossAdd?page=tangball_venue", //新增接口
          modify: "http://120.76.160.41:3000/crossModify?page=tangball_venue", //修改接口
          delete: "http://120.76.160.41:3000/crossDelete?page=tangball_venue" //删除接口
        },
        //-------列配置数组-------
        columns: [
          {
            label: "编号",
            prop: "P1",
            width: 70
          },
          {
            label: "场馆名称",
            prop: "name",
            width: 200
          },
          {
            label: "所属地区",
            prop: "area",
            width: 100
          },
          {
            label: "赛事数量",
            prop: "countMatch",
            width: 100
          },
          {
            label: "加盟时间",
            prop: "time",
            width: 150
          },
          {
            label: "联系方式",
            prop: "phoneNumber",
            width: 140
          },
          {
            label: "相册",
            prop: "album",
            width: 100
          }
        ],
        //-------筛选表单字段数组-------
        searchFormItems: [
          {
            label: "分类编号",
            prop: "P1",
            type: "input"
          }
        ],
        //-------详情字段数组-------
        detailItems: [
          {
            label: "分类编号",
            prop: "P1"
          },
          {
            label: "场馆名称",
            prop: "name"
          },
          {
            label: "所属地区",
            prop: "area"
          },
          {
            label: "赛事数量",
            prop: "countMatch"
          },
          {
            label: "加盟时间",
            prop: "time"
          },
          {
            label: "联系方式",
            prop: "phoneNumber"
          },
          {
            label: "相册",
            prop: "album"
          }
        ],
        //-------新增、修改表单字段数组-------
        formItems: [
          {
            label: "分类编号",
            prop: "P1"
          },
          {
            label: "场馆名称",
            prop: "name"
          },
          {
            label: "所属地区",
            prop: "area",
            slot: "slot_area"
          },
          {
            label: "赛事数量",
            prop: "countMatch"
          },
          {
            type: "date",
            label: "加盟时间",
            prop: "time"
          },
          {
            label: "联系方式",
            prop: "phoneNumber"
          },
          {
            label: "相册",
            prop: "album"
          }
        ]
      }
    };
  },
  beforeCreate() {
    this.$store.commit("changeActiveMenu", "listCategory"); //菜单聚焦
  }
};
</script>


<style>
</style>
