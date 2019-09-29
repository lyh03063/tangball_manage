<template>
  <div >
      <div>队名：{{groups.name}}</div>
      <div v-for="(player,index) in groups.member" :key="index">
          {{index==0?'队长：':'队员'+index+'：'}}{{player.name}}     ({{player.sex=='1'?'男':'女'}}/{{player.phone}})
        </div>
  </div>
</template>

<script>
export default {
  props: ['value'],

  data() {
    return {
      groups:[]
    };
  },
  methods: {
    
  },
 async mounted(){
     console.log(this.value);
     
      if (this.value) {
      
	    let { data } = await axios({
          method: "post",
          url: PUB.domain + '/crossList?page=tangball_team',
          data: {
            findJson: {
              orderId:this.value
            }
          }
        }).catch(() => {});
        this.groups = data.list[0]
      }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
