<template>
  <div class>
    <dm_list_data :cf="cfList"></dm_list_data>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      cfList:PUB.listCF.tangball_sponsor
    };
  },created(){
  }
};
</script>


<style>
</style>
