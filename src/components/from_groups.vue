<template>
  <div class v-if="groups">
      <div >队名：<el-input v-model="groups.name" placeholder="请输入队名" class="groups-name"></el-input></div>
      <div v-for="(item,index) in groups.member" :key="index">
      <div  class="groups-box FL">
          <div class="FL " style="width:50px;">{{index==0?'队长：':'队员'+index+':'}}</div>
          <div class="FL">
          姓名：<el-input v-model="item.name" placeholder="请输入姓名" class="groups-input MR10"></el-input>
          性别：<el-radio-group v-model="item.sex" class="MR10">
                    <el-radio :label='1' >男</el-radio>
                    <el-radio :label='2' >女</el-radio>
                
                </el-radio-group>
          手机号: <el-input v-model="item.phone" placeholder="请输入手机号" class="groups-input" @change="changePhone(item.phone,index)"></el-input>
          </div>
          
          <div style="clear:both"></div>
      </div>
        <div class="addButton el-icon-circle-plus-outline" @click="addPlayer(index)"></div>
        <div class="addButton el-icon-circle-close" @click="deletePlayer(index)"></div>
        <div style="clear:both"></div>
      </div>
  </div>
</template>

<script>
export default {
  props: ['value','orderId','matchId'],
  watch:{
    groups:{
      handler(newData,oldData){
        this.$emit('input',newData)
      },
      immediate:true,
      deep: true
    }
  },
  data() {
    return {
      groups:this.value,
      player:{name: "", sex: 1, phone: ''}
    };
  },
  methods: {
    addPlayer(index){
        this.groups.member.splice(index+1, 0,this.player)
    },
    deletePlayer(index){
        this.groups.member.splice(index,1)
    },
    changePhone(phone,index){
        if (!(/^1([38][0-9]|14[579]|5[^4]|16[6]|7[1-35-8]|9[189])\d{8}$/.test(phone))) {
            alert('手机号格式错误')
            this.groups.member[index].phone=''
        }
    }
  },
 async mounted(){
      if (this.orderId) {
	    let { data } = await axios({
          method: "post",
          url: PUB.domain + "/crossList?page=tangball_team",
          data: {
            findJson: {
              orderId:this.orderId
            }
          }
        }).catch(() => {});
        this.groups = data.list[0]
        console.log(this.groups);
        
      }else{
        this.groups ={
            matchId:this.matchId,
            name:'',
            member:[{name: "", sex: 1, phone: ''}],
            orderId:'EO'+new Date().valueOf()
        }
      }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.groups-input{
 width: 20%;

}
.groups-box{
    height: 50px;
    line-height: 50px;
    border:1px solid gray;
    padding-left: 20px;
    margin-bottom: 10px;
    width: 60%;
    border-radius: 10px;
}
.addButton{
    margin-left: 5px;
    margin-top:8px;
    float: left;
    font-size: 35px;
    color:rgb(200,200,200);
    cursor: pointer;
}
.groups-name{
    width: 20%;
    margin-bottom: 10px;
}
</style>
