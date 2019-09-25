<template>
    <div>
        <div v-for="(item,index) in progress" :key="index">
            <div  class="progress-box">
            赛程：<el-input v-model="item.name" placeholder="请输入赛程名字" ></el-input>
            参与人数：<el-input v-model="item.joinPerson" placeholder="请输入赛程参与人数" @change="changeJoinPerson(index)"></el-input>
            决出人数：<el-input v-model="item.remainPersom" placeholder="请输入赛程决出人数" @change="changeRemainPersom(index)" ></el-input>
            </div>
            <div class="addButton el-icon-circle-plus-outline" @click="addprogress(index)"></div>
            <div class="addButton el-icon-circle-close" @click="deleteprogress(index)"></div>
            <div style="clear:both"></div>
        </div>
        <div>最终赛程：&nbsp;&nbsp;&nbsp;<span v-for="(item,index) in progress" :key="index">{{item.name}}{{index==progress.length-1?'':'→'}}</span></div>
    </div>
</template>

<script>

export default {
 props:['value'],
 watch:{
    progress:{
      handler(){
        this.$emit('input',this.progress)
      },
      immediate:true
    }
  },
 data(){
     return {
         progress:this.value
     }
 },
 methods:{
     addprogress(index){
         let joinPerson = this.progress[index].remainPersom
         let remainPersom = this.progress[index+1].joinPerson
         let obj = {name:'',joinPerson,remainPersom}
         this.progress.splice(index+1,0,obj)
         console.log(this.progress);
     },
     changeJoinPerson(index){
         if (index>0) {
            if(/^\d+$/.test(this.progress[index].joinPerson)){
               this.progress[index-1].remainPersom =  this.progress[index].joinPerson 
            }else{
                alert('参与人数必须是数字')
                this.progress[index].joinPerson = this.progress[index-1].remainPersom
            }  
         }
     },
     changeRemainPersom(index){
         if (index<this.progress.length-1) {
            if(/^\d+$/.test(this.progress[index].remainPersom)){
               this.progress[index+1].joinPerson =  this.progress[index].remainPersom
            }else{
                alert('决出人数必须是数字')
                this.progress[index].remainPersom = this.progress[index+1].joinPerson
            }  
         }
     },
     deleteprogress(index){
         this.progress.splice(index,1)
     }
 },
 mounted(){
    if (!this.progress) {
        this.progress = [
            {name:'海选',joinPerson:'500-1000',remainPersom:100},
            {name:'淘汰赛',joinPerson:'100',remainPersom:4},
            {name:'半决赛',joinPerson:'4',remainPersom:2},
            {name:'决赛',joinPerson:'2',remainPersom:1}]
    }
     console.log('this.progress',this.progress);
     
 }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.progress-box div{
    width: 22%;
    margin-right: 20px;
    margin-top: 5px;
}
.progress-box{
    height: 43px;
    border: 1px solid rgb(230,230,230);
    margin-bottom: 10px;
    padding-left:20px;
    border-radius: 10px;
    float: left;
    width: 90%;
}
.addButton{
    margin-left: 5px;
    margin-top:8px;
    float: left;
    font-size: 30px;
    color:rgb(200,200,200);
    cursor: pointer;
}
</style>
