<template>
  <div class>{{formData}}</div>
</template>
<script>
import select_match_progress from "../components/form_item/select_match_progress.vue";

export default {
  components: { select_match_progress },
  data() {
    return {
      formData: {
        a: 2,
        //  obj:null
      }
    };
  },
  watch: {
    formData: {
      handler(newName, oldName) {
        console.log("formData变动");
      },
      // immediate: true,
      deep: true
    }
  },
  created() {
    this.formData.obj = { c: 1 };
     this.formData=this.formData
  },

  methods: {}
};
</script>

