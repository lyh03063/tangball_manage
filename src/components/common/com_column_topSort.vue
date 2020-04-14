



<template>
  <div class>
    <div class v-if="isTop">
      <span class="C_f30">已置顶</span> &nbsp;
      <i class="el-icon-close Cur1" @click="cancelTop"></i>
    </div>

    <el-link type="info" @click="setTop" v-else>设为置顶</el-link>
  </div>
</template>

<script>
export default {
  name: "com_column_topSort",
  //用于列表模糊查询的组件
  props: ["doc"],
  data() {
    return {};
  },
  computed: {
    isTop() {
      let topSort = lodash.get(this.doc, `topSort`, "");
      return !!topSort
    }
  },
  methods: {
    async setTop() {
      let clickStatus = await this.$confirm("确定置顶该数据？").catch(() => { });
      if (clickStatus != "confirm") return

      let { data } = await axios({ //置顶接口
        method: "post", url: `${PUB.domain}/crossSetTop`,
        data: {
          "dataId": this.doc.P1,
          "page": "tangball_article"
        }
      });

      this.$emit("list-event-in", {
        callbackInList: (T) => {
          T.getDataList()//刷新列表
        }
      });

    },
    async cancelTop() {
      let clickStatus = await this.$confirm("确定取消置顶该数据？").catch(() => { });
      if (clickStatus != "confirm") return
      let { data } = await axios({ //取消置顶接口
        method: "post", url: `${PUB.domain}/crossCancelTop`,
        data: {
          "dataId": this.doc.P1,
          "page": "tangball_article"
        }
      });

      this.$emit("list-event-in", {
        callbackInList: (T) => {
          T.getDataList()//刷新列表
        }
      });

    }
  }
};
</script>
