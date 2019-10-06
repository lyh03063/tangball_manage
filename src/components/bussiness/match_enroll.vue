<template>
  <div class v-if="ready">
    <dm_debug_list>
      <dm_debug_item v-model="matchInfo" text="赛事信息-" />
      <dm_debug_item v-model="matchInfo.matchForm" text="赛事类型" />
      <dm_debug_item v-model="matchInfo.progress" text="赛事阶段" />
      <dm_debug_item v-model="tipVisibles" text="队员列表弹窗的可见性" />
      <dm_debug_item v-model="cfList.findJsonDefault" text="列表的默认查询参数" />
      <dm_debug_item v-model="cfList.formDataAddInit" text="新增报名数据的初始值" />
      <dm_debug_item v-model="cfList.isShowSearchForm" text="是否显示搜索表单" />
    </dm_debug_list>

    <div class="panel">
      <div class="OFH MB10">
        <div class="FL FWB FS16 LH30">{{title}}</div>
        <div class="FR">
          <el-button plain @click="isEdit=false" size="mini" v-if="isEdit">取消编辑</el-button>
          <el-button type="primary" size="mini" @click="isEdit=true" v-if="!isEdit">编辑</el-button>
        </div>
        
      </div>
      <div v-if="matchInfo.matchForm == 2" class="annotation-box">(ps:球员未入库无法库入成绩)</div>
      <dm_list_data :cf="cfList" ref="listForEnroll" @after-modify="modifyEnroll"  @after-add='addEnroll'
      @after-search='queryPlayer'>
        <!--  -->
        <template v-slot:slot_detail_item_album="{row}">
          <div class v-if="row.album && row.album.length">
            <img
              @click="showBigImg(item.url)"
              :src="item.url"
              alt
              v-for="item in row.album"
              :key="item.url"
              class="W100 H100"
            />
          </div>
        </template>
        <!--详情弹窗的 memberId 字段组件，注意插槽命名-->
        <template v-slot:slot_detail_item_memberId="{row}">
          <dm_ajax_populate :id="row.memberId" populateKey="name" page="tangball_member" idKey="P1">
            
          </dm_ajax_populate>
        </template>
        <template v-slot:slot_detail_item_matchId="{row}">
          <dm_ajax_populate :id="row.memberId" populateKey="matchName" page="tangball_match" idKey="P1">
            
          </dm_ajax_populate>
        </template>
        <!-- 报名订单插槽 -->
        <!-- <template v-slot:slot_form_item_orderId="{formData}">
        <enroll_orderId v-model="formData.orderId"></enroll_orderId>
      </template> -->
      <!-- 选择赛事和场馆 -->
      <template v-slot:slot_form_item_matchInfo="{formData}">
     
        <match_venue v-model="formData.cityVenueId" :matchId="formData.matchId"></match_venue>
      </template>
      <!-- 赛事场馆详情 -->
      <template v-slot:slot_detail_item_matchInfo="{row}">
     
        <match_venue v-model="row.cityVenueId" :matchId="row.matchId" :readOnly='true'></match_venue>
      </template>
        <!-- 新增修改队伍信息插槽 -->
      <template v-slot:slot_form_item_groups="{formData}">
        <from_groups v-model="formData.groups" :orderId='formData.orderId' :matchId='formData.matchId'></from_groups>
      </template>
        <!-- 队伍信息详情插槽 -->
      <template v-slot:slot_detail_item_groups="{row}">
        <groups_detail v-model="row.orderId" ></groups_detail>
      </template>
        <!--队伍名称列配置-->
        <template v-slot:slot_detail_item_teamName="{row}">
          <div class v-if="row.teamDoc">
            <el-popover placement="right" width="300" v-model="tipVisibles[row.P1]">
              <div>
                <div class="" v-for="(item,i) in row.teamDoc.member" :key="i" >{{item.name?item.name:'无' }}
                   ({{item.sex==1?'男':'女'}}|{{item.phone?item.phone:'无'}})
                   <span v-if="member[i]">
                  <span v-if="member.length>0">{{member[i].status?member[i].status:'球员未录入'}}&nbsp;&nbsp;</span>
                  <el-link type="primary" v-if="member.length>0&&!member[i].flag" @click="addMerber(item,i)">录入</el-link>
                  <el-link type="primary" v-else @click="modifyMerber(item,i,row.teamDoc)">修改</el-link>
                   </span>
                  </div>
              </div>
              <el-link
                type="primary"
                slot="reference"
              @click="showProgress(row.teamDoc.member)">{{row.teamDoc.name}} ({{$lodash.get(row, `teamDoc.member.length`)}}人)
              <font color="red" v-if="isEntering(row.teamDoc.member)!=0&&playerPhoneList.length>0">
                有{{isEntering(row.teamDoc.member)}}球员未入库
                </font>
                </el-link>
            </el-popover>
          </div>
        </template>
      </dm_list_data>
    </div>
    <!-- 修改会员信息的弹窗 -->
    <el-dialog
      title="修改会员"
      :visible.sync="showModifyDialog"
      v-if="showModifyDialog"
      width="95%"
      append-to-body
    >
      <dm_dynamic_form
        v-model="memberModiy"
        :cf="cfMemberModiy"
        @submit="modifyMember"
        @cancel="showModifyDialog=false"
      ></dm_dynamic_form>
    </el-dialog>
    <!-- 录入会员的弹窗 -->
    <el-dialog
      title="新增会员"
      :visible.sync="showAddDialog"
      v-if="showAddDialog"
      width="95%"
      append-to-body
    >
      <dm_dynamic_form
        v-model="memberAdd"
        :cf="cfMemberAdd"
        @submit="addMember"
        @cancel="showAddDialog=false"
      ></dm_dynamic_form>
    </el-dialog>
  </div>
</template>

<script>
// import enroll_orderId from "@/components/enroll_orderId";
import from_groups from "@/components/from_groups";
import groups_detail from '@/components/groups_detail'
import match_venue from "@/components/form_item/match_venue.vue";
export default {
  components: {from_groups,groups_detail,match_venue},
  props: {
    matchId: [String, Number]
  },
  mixins: [PUB.listCF.tangball_enroll],
  data() {
    return {
      modifydata:{},
      playerPhoneList:[],
      showModifyDialog:false,//显示修改弹窗的key
      memberModiy:{},//保存修改数据
      cfMemberModiy: {//修改列表的配置
        //给动态表单组件传过去的新增进展配置
        formItems: PUB.listCF.tangball_member.formItems,
        btns: [
          { text: "修改", event: "submit", type: "primary", validate: true },
          { text: "取消", event: "cancel" }
        ]
      },
      showAddDialog:false,//显示新增弹窗的key
      cfMemberAdd:{//新增列表的配置
        formItems: PUB.listCF.tangball_member.formItems,
        btns: [
          { text: "新增", event: "submit", type: "primary", validate: true },
          { text: "取消", event: "cancel" }
        ]
      },
      memberAdd:{},//保存新增数据
      title:"报名球员信息",
      tipVisibles: {},//队员列表弹窗的可见性,注意是一个对象
      member:[],
      isEdit: false, //是否为可编辑状态
      matchInfo: null, //赛事信息
      ready: false, //赛事信息是否加载完毕
      cfList: PUB.listCF.tangball_match_enroll
    };
  },
  watch: {
    isEdit: {
      handler(newVal, oldVal) {
        if (this.isEdit) {
          //如果{000}000
          this.cfList.isShowToolBar = true;
          this.cfList.isShowOperateColumn = true;
        } else {
          this.cfList.isShowToolBar = false;
          this.cfList.isShowOperateColumn = false;
        }
      }
    },
    valueNeed: {
      handler(newVal, oldVal) {
        this.$emit("input", this.valueNeed); //同步valueNeed值到value
      },
      // immediate: true,//组件初始化时立即执行一次变动
      deep: true //深度监听
    },
    matchId: {
      handler(newVal, oldVal) {
        if (!this.matchId) return;
        this.getMatchData();
      },
      immediate: true //组件初始化时立即执行一次变动
    }
  },
  methods: {
    // 获取列表中所有会员的手机号
    async queryPlayer(tableData){
      let phones = []
      tableData.forEach(item=>{
        if (item.teamDoc) {
          if (item.teamDoc.member) {
            item.teamDoc.member.forEach(player=>{
          if (player.phone) {
            phones.push(player.phone)
          }
          })
          }
        }
        
      })
      let { data } = await axios({
          method: "post",
          url: PUB.domain + '/crossList?page=tangball_member',
          data: {
            findJson: {
              phone:phones
            }
          }
        }).catch(() => {});
        this.playerPhoneList = []
        data.list.forEach(item=>{
          if (item.phone) {
            this.playerPhoneList.push(item.phone)
          }
        })
        this.playerPhoneList =  Array.from(new Set(this.playerPhoneList)) 
        console.log('aaaa',this.playerPhoneList);
    },
    // 判断球员是否已经录入的方法
    isEntering(member){
      if (member) {
        let num = 0
      this.playerPhoneList.forEach(phone=>{
        member.forEach(item=>{
          if (item.phone == phone) {
            num++
          }
        })
      })
      // console.log('num',num);
      // console.log(member);
      
      return member.length-num
      }
      

    },
    async addEnroll(newData,oldData){
      let { data } = await axios({
          method: "post",
          url: PUB.domain + "/crossAdd?page=tangball_team",
          data: {
            data:oldData.groups
          }
        }).catch(() => {});
    },
    async modifyEnroll(newData,oldData){
      let { data } = await axios({
          method: "post",
          url: PUB.domain + "/crossModify?page=tangball_team",
          data: {
            findJson:{
              P1:newData.groups.P1
            },
            modifyJson:newData.groups
          }
        }).catch(() => {});
    },
    // 录入球员的方法
    async addMember(){
      let { data } = await axios({
          method: "post",
          url: PUB.domain + "/crossAdd?page=tangball_member",
          data: {
            data:this.memberAdd
          }
        }).catch(() => {});
        // console.log('data',data.addData.phone);
        this.playerPhoneList.push(data.addData.phone)
        this.playerPhoneList =  Array.from(new Set(this.playerPhoneList)) 
      this.member[this.checkedIndex].status = '球员已录入'
      this.member[this.checkedIndex].flag = true
      this.showAddDialog = false
    },
    // 修改球员的方法
    async modifyMember(){
      let { data } = await axios({
          method: "post",
          url: PUB.domain + "/crossModify?page=tangball_member",
          data: {
            findJson: {
              P1:this.memberModiy.P1
            },
            modifyJson:this.memberModiy
          }
        }).catch(() => {});
        this.modifydata.member[this.checkedIndex] = this.memberModiy
      let groups = await axios({
          method: "post",
          url: PUB.domain + "/crossList?page=tangball_team",
          data: {
            findJson: {
              P1:this.modifydata.P1
            },
            modifyJson:this.modifydata
          }
        }).catch(() => {});
        // this.playerPhoneList = JSON.parse(JSON.stringify(this.playerPhoneList))
        this.playerPhoneList.push(this.memberModiy.phone)
        this.playerPhoneList =  Array.from(new Set(this.playerPhoneList)) 
        this.showModifyDialog = false
    },
    // 打开新增弹窗的方法
    addMerber(item,i){
      
      if (item.phone) {
        this.memberAdd= item 
      this.showAddDialog = true
      this.checkedIndex = i
      }else{
        alert("该球员还没有手机号不能录入")
      }
      
      
    },
    // 打开修改弹窗的方法
    modifyMerber(item,i,groups){
      this.modifydata = groups
      console.log('this.modifydata',this.modifydata);
      this.memberModiy = this.member[i].member
      console.log(this.memberModiy);
      
      this.showModifyDialog = true
      this.checkedIndex = i
    },
   async showProgress(members){
      let phones = members.map(item=>{
        return item.phone
      })
    
	    let { data } = await axios({
          method: "post",
          url: PUB.domain + '/crossList?page=tangball_member',
          data: {
            findJson: {
              phone:phones
            }
          }
        }).catch(() => {});
        console.log(members);
      this.member = []
      this.member= members.map(item=>{
        let flag = false 
        let status = '球员未录入'
        let member = {}
        data.list.forEach(doc => {
          if (doc.phone == item.phone) {
            flag = true
            status = '球员已录入'
            member = doc
          }
        });
        let obj = {status,flag,member}
        return obj
      })
      console.log('this.member',this.member);
      

    },
    /**
     * @name 处理报名表函数（团体赛和个人赛的区别）
     */
    handleCFlist: async function() {
      if (this.matchInfo.matchForm == 1) {
        this.cfList.dynamicDict = [
          {
            page: "tangball_member",
            populateColumn: "memberName",
            idColumn: "memberId",
            idColumn2: "P1"
          }
        ];
        this.cfList.formItems=PUB.listCF.tangball_match_enroll_single.formItems
      }
      if (this.matchInfo.matchForm == 2) {
        this.title="报名球队信息"
        //动态数据字典，获取队伍信息
        this.cfList.detailItems =PUB.listCF.tangball_match_enroll_team.detailItems

        this.cfList.dynamicDict = [
          {
            page: "tangball_team",
            populateColumn: "teamDoc",
            idColumn: "orderId",
            idColumn2: "orderId"
          }
        ];

        //如果是团体赛
        this.cfList.columns = PUB.listCF.tangball_match_enroll_team.columns
        this.cfList.cfForm = {
            watch:{
              groups:{
                handler(){
                  if (this.value.groups) {
                    this.value.orderId = this.value.groups.orderId
                  }
                  
                },
                immediate:true,
                deep: true
              }
            },
          },
        this.cfList.formItems=PUB.listCF.tangball_match_enroll_team.formItems
      }
    },
    async getMatchData() {
      if (!this.matchId) return;
      //函数：{根据赛事id，ajax获取赛事信息函数}
      let { data } = await axios({
        //请求接口
        method: "post",
        url: PUB.domain + "/crossDetail?page=tangball_match",
        data: {
          id: this.matchId
        } //传递参数
      });
      this.matchInfo = data.Doc;

      this.handleCFlist(); //调用：{处理报名表函数（团体赛和个人赛的区别）}
      this.ready = true;
    }
  },
  mounted(){
        this.cfList.findJsonDefault = {
          matchId: this.matchId
        }
        //新增表单初始赋值
        this.cfList.formDataAddInit= {
          matchId: this.matchId
        }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.panel {
  border: 1px #ddd solid;
  border-radius: 5px;
  padding: 15px;
}
.annotation-box{
  color: gray;
  height: 20px;
  line-height: 20px;
  margin-bottom: 5px;
  margin-left: 10px;
}
</style>
