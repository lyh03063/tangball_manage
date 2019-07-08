<template>
  <div class>
    <match_progress_step :cf="matchProgress"></match_progress_step>
  </div>
</template>
<script>
import match_progress_step from "../components/bussiness/match_progress_step";
export default {
  components: { match_progress_step },

  data() {
    return {
      matchProgress: { smallProgress:11, bigProgress: 1 }
    };
  },
  created() {},
  beforeCreate() {
    this.$store.commit("changeActiveMenu", "list_match"); //菜单聚焦
  }
};
</script>


<style scoped>
</style>
