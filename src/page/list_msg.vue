<template>
  <div class>
    
    <dm_list_data :cf="cfList">
      <template v-slot:slot_form_item_memberIdList="{formData}">
        <msgTransfer v-model="formData.memberIdList" url='/crossList?page=tangball_member' keyValue="name"></msgTransfer>
      </template>
    </dm_list_data>
    
  </div>
</template>
<script>
import msgTransfer from '../components/form_item/msg_transfer'

export default {
  components: { msgTransfer  },
  data() {
    return {
      cfList: PUB.listCF.tangball_msg
    };
  },
  methods: {}
};
</script>


<style>
</style>
