<template>
  <div class>
    <dm_list_data :cf="cfList">
      <template v-slot:slot_detail_item_franchiseeId="{row}">
          <dm_ajax_populate
            :id="row.franchiseeId"
            populateKey="name"
            page="tangball_franchisee"
            idKey="P1"
          ></dm_ajax_populate>
        </template>
      <template v-slot:slot_detail_item_venueId="{row}">
          <dm_ajax_populate
            :id="row.venueId"
            populateKey="name"
            page="tangball_venue"
            idKey="P1"
          ></dm_ajax_populate>
        </template>
    </dm_list_data>
  </div>
</template>
<script>

export default {
  
  components: {  },
  data() {
    return {
      cfList:PUB.listCF.tangball_member
       
    };
  },

  methods: {
    
  },created(){
    console.log('this.cfList,',PUB.listCF.tangball_member)
    
  }
};
</script>


<style>
</style>
