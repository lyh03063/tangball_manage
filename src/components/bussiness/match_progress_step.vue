<template>
  <div class>
    <el-steps :active="active" align-center finish-status="success">
      <el-step
        :title="item.title"
        :description="item.description"
        v-for="(item,index) in stepsArr"
        :key="index"
        :status="item.status"
      ></el-step>
    </el-steps>
  </div>
</template>
<script>
export default {
  props: {
    cf: {
      // default: { smallProgress: 1, bigProgress: 1 }
    }
  },
  data() {
    return {
      active: 0, //聚焦的默认状态为0
      stepsArr: [
        { title: "选拔赛(城市赛)", description: "", value: 11 },
        { title: "晋级赛(城市赛)", description: "", value: 12 },
        { title: "决赛(城市赛)", description: "", value: 13 },
        { title: "淘汰赛/循环赛(城际赛)", description: "", value: 21 },
        { title: "1/4决赛(城际赛)", description: "", value: 22 },
        { title: "决赛(城际赛)", description: "", value: 23 }
      ]
    };
  },
  created() {
    this.stepsArr.forEach((item, index) => {
      if (this.cf.smallProgress == item.value) {
        this.active = index; //当前选中状态
      }

      if (index <= this.active) {
        item.status = "success"; //当前选中状态的样式
      }
    });
  }
};
</script>


<style scoped>
</style>
