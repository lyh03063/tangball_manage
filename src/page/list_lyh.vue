<template>
  <div class>
    <ajax_populate :value="id" populateKey="name"></ajax_populate>

    <ajax_populate :value="id" >
      <template v-slot:default="{doc}">{{doc}}</template>
    </ajax_populate>
  </div>
</template>
<script>
//导入自定义复选框组件，注意路径改为自己的
import ajax_populate from "../components/common/ajax_populate.vue";

export default {
  components: { ajax_populate },
  data() {
    return {
      id: 1
    };
  }
};
</script>


