<template>
  <div class>
    <dm_list_data :cf="cfList"></dm_list_data>
  </div>
</template>
<script>
// import Mock from 'mockjs'
// Mock.mock('/login', function () {
// let loginList=[
//   {P1:1,userName:"admin",passWord:"aa"},
//   {P1:2,userName:"admin",passWord:"aa"},
// ]
// return loginList
// })

export default {
  components: {  },
  data() {
    return {
      cfList: PUB.listCF.tangball_admin
    };
  },created(){
  }

};
</script>


<style>
</style>
