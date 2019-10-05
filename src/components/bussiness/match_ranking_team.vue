
<template>
  <div class>
    <dm_debug_list>
      <dm_debug_item v-model="matchInfo" text="matchInfo" />
    </dm_debug_list>

    <dm_list_data
      :cf="cfListEnrollTeam"
      ref="listForEnroll"
      @after-search="(data,olddata)=>{$emit('after-search',data)}"
    >
      <template v-slot:slot_column_scoreTotal="{row}">{{getScoreTotal(row)}}</template>
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
        <dm_ajax_populate :id="row.memberId" populateKey="name" page="tangball_member">
          <template v-slot:default="{doc}">
            <div class v-if="doc && doc.P1">
              {{doc.P1}}
              (
              {{doc.name}})
            </div>
          </template>
        </dm_ajax_populate>
      </template>
      <!--队伍名称列配置-->
      <template v-slot:slot_detail_item_teamName="{row}">
        <div class v-if="row.teamDoc">
          <el-popover placement="right" width="300" v-model="tipVisibles[row.P1]">
            <div>
              <div
                class
                v-for="(item,i) in row.teamDoc.member"
                :key="i"
              >{{item.name }} ({{item.sex==1?"男":'女'}}|{{item.phone}})</div>
            </div>
            <el-link
              type="primary"
              slot="reference"
            >{{row.teamDoc.name}} ({{$lodash.get(row, `teamDoc.member.length`)}}人)</el-link>
          </el-popover>
        </div>
      </template>
    </dm_list_data>
  </div>
</template>
<script>
let T;
export default {
  name: "match_ranking_team",
  components: {},
  props: ["matchId", "matchInfo", "progressIndex", "roundNum"], //（需要确定赛事，赛段，第几轮）

  data() {
    return {
      tipVisibles: {}, //队员列表弹窗的可见性,注意是一个对象
      cfListEnrollTeam: PUB.listCF.tangball_enroll_for_ach //报名球队列表
    };
  },
  methods: {
    getScoreTotal(row) {
      let path = `score.teamHoleScoreTotal`;
      //如果有选中赛段
      if (T.progressIndex) {
        path += `_p${T.progressIndex}`;
        //如果有选中轮数
        if (T.roundNum) {
          path += `_r${T.roundNum}`;
        }
      }

      return lodash.get(row, path, "---");
    },
    afterSearch(param) {
      console.log("param:####", param);
      alert("afterSearch");
    }
  },

  created() {
    T = this;
    //修改报名队伍列表的默认查询参数
    this.cfListEnrollTeam.findJsonDefault = { matchId: this.matchId };
  }
};
</script>


<style scoped>
.match_step {
  margin: 10px;
}
</style>
