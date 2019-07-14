<template>
 
    
    <table class="n-table n-table-debug " v-if="debug" >
      <tr>
        <td class="WP20 FWB">调试数据</td>
        <td class="WP20 FWB">说明</td>
        <td class="FWB">字段值</td>
      </tr>
      <!--插槽-->
      <slot class="" >
       
      </slot>
      
    </table>
 
</template>

<script>

export default {
  components: {
    //注册组件

  },

 computed: {
    debug() {
      return this.$store.state.debug;
    }
  },
 
  
  methods: {
    
  },
  created() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.valueShow {
  overflow-y: auto;
  max-height: 50px;
}

table.n-table.n-table-debug td,
table.n-table.n-table-debug th {
  padding: 5px;
}
</style>
