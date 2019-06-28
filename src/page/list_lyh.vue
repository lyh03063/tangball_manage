<template>
  <div class>
    <upload_img v-model="arr1"></upload_img>
  </div>
</template>
<script>
//导入自定义复选框组件，注意路径改为自己的
import upload_img from "../components/form_item/upload_img.vue";


export default {
  components: { upload_img },
  data() {
    return {
      arr1: [{url:"1.jpg"}],
      options: [{ label: "选项1111", value: 1 }, { label: "选项2222", value: 2 }]
    };
  }
};
</script>


