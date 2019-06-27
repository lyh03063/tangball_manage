<template>
  <div class>
    <checkbox_diy v-model="arr1" :options="options"></checkbox_diy>
  </div>
</template>
<script>
//导入自定义复选框组件，注意路径改为自己的
import checkbox_diy from "../components/form_item/checkbox_diy.vue";

export default {
  components: { checkbox_diy },
  data() {
    return {
      arr1: [1, 2],
      options: [{ label: "选项1111", value: 1 }, { label: "选项2222", value: 2 }]
    };
  }
};
</script>


