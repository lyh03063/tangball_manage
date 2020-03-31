<template>
    <div>
        <div v-for="(item,index) in progress" :key="index">
            <div  class="progress-box">
            赛程名称：<el-input v-model="item.name" placeholder="请输入赛程名字" style="width:120px" ></el-input>
            参与人/队数：<el-input v-model="item.joinPerson" placeholder="请输入赛程参与人/队数" @change="changeJoinPerson(index)" style="width:80px"></el-input>
            决出人/队数：<el-input v-model="item.remainPersom" placeholder="请输入赛程决出人/队数" @change="changeRemainPersom(index)" style="width:80px"></el-input>
            轮数：<el-input v-model="item.roundCount" placeholder="请输入比赛轮数" @change="changeRemainPersom(index)" style="width:60px" ></el-input>
            </div>
            <div class="addButton el-icon-circle-plus-outline" @click="addprogress(index)"></div>
            <div class="addButton el-icon-circle-close" @click="deleteprogress(index)"></div>
            <div style="clear:both"></div>
        </div>
        <div v-if="progress.length>0">最终赛程：&nbsp;&nbsp;&nbsp;<span v-for="(item,index) in progress" :key="index">{{item.name}}{{index==progress.length-1?'':'→'}}</span></div>
        <div v-else>
            <div  class="FL ">
            暂无赛程：</div>
            <div class="addButton el-icon-circle-plus-outline " style="margin-top:0" @click="addprogress(0)"></div>
    
            <div style="clear:both"></div>
        </div>
        <div v-if="progress.length>0">当前赛程：
            <el-select
                  v-model="nowProgress"
                  clearable
                  collapse-tags
                  @change="changenowProgress"
                >
                  <el-option
                    :label="option.label"
                    :value="option.value"
                    v-for="option in options"
                    :key="option.value"
                  ></el-option>
        </el-select>
        </div>
    </div>
</template>

<script>

export default {
      name: "custom_progress",
 props:['value'],
 
 watch:{
    //  监听赛程数组变化时,对应的下拉框数据也变化
    progress:{
      handler(){
          if (this.progress) {
              this.$emit('input',this.progress)
        this.options = this.progress.map((item,index)=>{
        if (item.checked==true) {
            this.nowProgress = item.name
            this.nowIndex = index
        }   
        let obj = {value:index,label:item.name}
        return obj
        })
          }
        
      },
      immediate:true,
      deep: true
    }
  },
 data(){
     return {
         progress:this.value,//传进来的赛程数组
         options:[],//保存下拉款数据的数组
         nowProgress:'',//当前赛程的key
         nowIndex:0//当前赛程在数组中的索引
     }
 },
 methods:{
    //  新增新赛程的方法
     addprogress(index){
         console.log(index);
         console.log(this.progress);
         if (this.progress.length>0) {
             let joinPerson = this.progress[index].remainPersom
         let remainPersom = ''
         let roundCount = this.progress[index].roundCount
         if (index+1!=this.progress.length) {
     
         remainPersom = this.progress[index+1].joinPerson}
         let obj = {name:'',joinPerson,remainPersom,checked:false,roundCount}
         this.progress.splice(index+1,0,obj)
         console.log(this.progress);
         }else{
             this.progress.push({name:'决赛',joinPerson:'100-200',remainPersom:2,checked:true,roundCount:1})
         }
         
     },
    //  修改参与人/队数的方法
     changeJoinPerson(index){
         if (index>0) {
            if(/^\d+$/.test(this.progress[index].joinPerson)){
               this.progress[index-1].remainPersom =  this.progress[index].joinPerson 
            }else{
                alert('参与人/队数必须是数字')
                this.progress[index].joinPerson = this.progress[index-1].remainPersom
            }  
         }
     },
    //  修改决出人数的方法
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
    //  删除赛程的方法
     deleteprogress(index){
         this.progress.splice(index,1)
     },
    //  修改当前赛程的方法
     changenowProgress(event){
         this.progress[this.nowIndex].checked = false
         this.nowIndex = event
         this.progress[this.nowIndex].checked = true
         console.log(this.progress);
         
     }
 },
 mounted(){
    //  如果赛程不存在，给他设定初始值
    if (!this.progress) {
        this.progress = [
            {name:'决赛',joinPerson:'100-200',remainPersom:2,checked:true,roundCount:1}]
    }
    this.options = this.progress.map((item,index)=>{
        if (item.checked==true) {
            this.nowProgress = item.name
            this.nowIndex = index
        }   
        let obj = {value:index,label:item.name}
        return obj
    })
    
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
