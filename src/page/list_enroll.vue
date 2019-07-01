<template>
  <div class>
    <el-dialog
      custom-class="n-el-dialog"
      width="70%"
      title="显示大图"
      :close-on-press-escape="false"
      v-bind:visible.sync="showDialogBigImg"
      v-if="showDialogBigImg"
    >
      <div class="TAC">
        <img :src="urlBigImg" alt />
      </div>
    </el-dialog>
    <listData :cf="cfList">
      <template v-slot:slot_detail_item_album="{row}">
        <div class v-if="row.album && row.album.length">
          <img
            @click="showBigImg(item.url)"
            :src="item.url"
            alt
            v-for="item in row.album"
            :key="item.url"
            class="W100 H100"
          />
        </div>
      </template>
      <!--详情弹窗的 memberId 字段组件，注意插槽命名-->
      <template v-slot:slot_detail_item_memberId="{row}">
        <ajax_populate
          :id="row.memberId"
          populateKey="name"
          page="tangball_member"
        >
          <template v-slot:default="{doc}">
            <div class v-if="doc && doc.P1">
              <b>{{doc.P1}}</b>
              (报名会员名称:
              <b>{{doc.name}}</b>)
            </div>
          </template>
        </ajax_populate>
      </template>

      <!--详情弹窗的 matchId 字段组件，注意插槽命名-->
      <template v-slot:slot_detail_item_matchId="{row}">
        <ajax_populate :id="row.matchId" populateKey="matchName" page="tangball_match">
          <template v-slot:default="{doc}">
            <div class v-if="doc && doc.P1">
              <b>{{doc.P1}}</b>
              (赛事名称:
              <b>{{doc.matchName}}</b>)
            </div>
          </template>
        </ajax_populate>
      </template>
    </listData>
  </div>
</template>
<script>
import listData from "../components/list-data/list-data.vue";
import ajax_populate from "../components/common/ajax_populate.vue";
export default {
  components: { listData,ajax_populate },
  methods: {
    showBigImg(url) {
      this.showDialogBigImg = true;
      this.urlBigImg = url;
    }
  },
  data() {
    return {
      showDialogBigImg: false,
      cfList: {
        listIndex: "list_enroll", //vuex对应的字段
        twoTitle: "赛事",
        threeTitle: "报名(订单)",
        flag: true,
        url: {
          list: "http://120.76.160.41:3000/crossList?page=tangball_enroll", //列表接口
          add: "http://120.76.160.41:3000/crossAdd?page=tangball_enroll", //新增接口
          modify: "http://120.76.160.41:3000/crossModify?page=tangball_enroll", //修改接口
          delete: "http://120.76.160.41:3000/crossDelete?page=tangball_enroll" //删除接口
        },
        //-------列配置数组-------
        columns: [
          {
            label: "报名会员id",
            prop: "memberId",
            width: 110
          },
          {
            label: "赛事id",
            prop: "matchId",
            width: 100
          },
          {
            label: "身份证号",
            prop: "idCard",
            width: 200
          },
          {
            label: "报名时间",
            prop: "time",
            width: 100
          },
          {
            label: "支付状态",
            prop: "payStatus",
            width: 100
          },
          {
            label: "审核状态",
            prop: "auditStatus",
            width: 100
          }
        ],
        //-------筛选表单字段数组-------
        searchFormItems: [
          {
            label: "身份证号",
            prop: "idCard",
            type: "input"
          },
          {
            label: "报名会员id",
            prop: "memberId"
          },
          {
            label: "赛事id",
            prop: "matchId"
          },
          {
            label: "支付状态",
            prop: "payStatus"
          },
          {
            label: "审核状态",
            prop: "auditStatus"
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
            prop: "payStatus"
          },
          {
            label: "审核状态",
            prop: "auditStatus"
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
            }
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
            prop: "payStatus"
          },
          {
            label: "审核状态",
            prop: "auditStatus"
          }
          // {
          //   label: "相册",
          //   prop: "album",
          //   slot: "slot_detail_item_album"
          // }
        ]
      }
    };
  },
  beforeCreate() {
    this.$store.commit("changeActiveMenu", "list_enroll"); //菜单聚焦
  }
};
</script>


<style>
</style>
