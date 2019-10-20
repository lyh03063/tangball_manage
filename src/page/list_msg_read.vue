<template>
  <div class>
    <dm_list_data :cf="cfList">
 <!--列表 memberId 字段插槽，注意插槽命名-->
      <template v-slot:slot_column_memberId="{row}">
        <dm_ajax_populate :id="row.memberId" populateKey="name" page="tangball_member">
          <template v-slot:default="{doc}">
            {{doc.P1}}
            (
            {{doc.name}})
          </template>
        </dm_ajax_populate>
      </template>
 <!--列表 msgId 字段插槽，注意插槽命名-->
      <template v-slot:slot_column_msgId="{row}">
        <dm_ajax_populate :id="row.msgId" populateKey="name" page="tangball_msg">
          <template v-slot:default="{doc}">
            {{doc.P1}}
            (
            {{doc.name}})
          </template>
        </dm_ajax_populate>
      </template>
    </dm_list_data>
  </div>
</template>
<script>

export default {
  components: {  },
  data() {
    return {
      cfList: PUB.listCF.tangball_msg_read
    };
  },
  methods: {
   
  },created(){
    util.setListPower(this.cfList);//调用：{根据当前角色权限设置列表配置的函数}
  }

};
</script>


<style>
</style>
