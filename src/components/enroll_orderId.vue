<template>
  <div class>
    {{this.orderId}}
  </div>
</template>

<script>
export default {
    name: "enroll_orderId",
  props: ['value'],
  watch:{
    orderId:function () {
      this.$emit('input',this.orderId)
    }
  },
  data() {
    return {
      orderId: this.value,
    };
  },
  methods: {
    
  },
  created(){
      if (!this.orderId) {
          this.orderId = 'EO'+new Date().valueOf();
      }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
