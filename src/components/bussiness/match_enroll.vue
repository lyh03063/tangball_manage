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

      <dm_list_data :cf="cfList" ref="listForEnroll">
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
          <dm_ajax_populate :id="row.memberId" populateKey="name" page="tangball_member">
            <template v-slot:default="{doc}">
              <div class v-if="doc && doc.P1">
                {{doc.P1}}
                (
                {{doc.name}})
              </div>
            </template>
          </dm_ajax_populate>
        </template>
        <!--队伍名称列配置-->
        <template v-slot:slot_detail_item_teamName="{row}">
          <div class v-if="row.teamDoc">
            <el-popover placement="right" width="300" v-model="tipVisibles[row.P1]">
              <div>
                <div class="" v-for="(item,i) in row.teamDoc.member" :key="i" >{{item.name }} ({{item.sex}}|{{item.phone}})
                  <span v-if="member.length>0">{{member[i].status}}&nbsp;&nbsp;</span>
                  <el-link type="primary" v-if="member.length>0&&!member[i].flag" @click="addMerber(item,i)">录入</el-link>
                  <el-link type="primary" v-else @click="modifyMerber(item,i)">修改</el-link>

                  </div>
              </div>
              <el-link
                type="primary"
                slot="reference"
              @click="showProgress(row.teamDoc.member)">{{row.teamDoc.name}} ({{$lodash.get(row, `teamDoc.member.length`)}}人)</el-link>
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
      width="70%"
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
      width="70%"
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
export default {
  components: {},
  props: {
    matchId: [String, Number]
  },
  mixins: [PUB.listCF.tangball_enroll],

  data() {
    return {
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
      cfList: {
        isShowSearchForm: false, //隐藏查询表单
        listIndex: "list_enroll_for_match", //vuex对应的字段
        focusMenu: false,
        isShowBreadcrumb: false, //隐藏面包屑导航
        isShowOperateColumn: false, //隐藏操作列
        isShowToolBar: false, //隐藏工具栏
        flag: true, //显示新增按钮
        findJsonDefault: {
          matchId: this.matchId
        },
        //新增表单初始赋值
        formDataAddInit: {
          matchId: this.matchId
        },

        //-------列配置数组-------
        columns: [
          {
            label: "报名会员",
            prop: "memberId",
            slot: "slot_detail_item_memberId",
            width: 130
          },

          {
            label: "手机号",
            prop: "phone",
            width: 100
          },
          {
            label: "性别",
            prop: "sex",
            width: 65,
            formatter: function(rowData) {
              if (rowData.sex == 1) {
                return "男";
              } else {
                return "女";
              }
            }
          },
          {
            label: "年龄",
            prop: "age",
            width: 65
          },

          {
            label: "报名时间",
            prop: "time",
            width: 75
          },
          {
            label: "支付状态",
            prop: "payStatus",
            width: 70,
            formatter: function(rowData) {
              if (rowData.payStatus == 2) {
                return "已支付";
              } else {
                return "未支付";
              }
            }
          },
          {
            label: "审核状态",
            prop: "auditStatus",
            "min-width": "100",
            formatter: function(rowData) {
              if (rowData.auditStatus == 1) {
                return "未审核";
              } else if (rowData.auditStatus == 2) {
                return "审核不通过";
              } else {
                return "审核通过";
              }
            }
          }
        ],

        //-------新增、修改表单字段数组-------
        formItems: [
          {
            label: "报名会员id",
            prop: "memberId",

            type: "select",
            ajax: {
              url: "/crossList?page=tangball_member",
              keyLabel: "name",
              keyValue: "P1"
            },
            rules: [{ required: true, message: "报名会员id" }]
          },
          {
            label: "赛事id",
            prop: "matchId",

            type: "select",
            ajax: {
              url: "/crossList?page=tangball_match",
              keyLabel: "matchName",
              keyValue: "P1"
            },
            rules: [{ required: true, message: "赛事id" }],
            hide: true
          },

          {
            label: "手机号",
            prop: "phone",
            type: "input"
          },
          {
            label: "性别",
            prop: "sex",
            type: "select",
            options: [{ label: "男", value: 1 }, { label: "女", value: 2 }]
          },
          {
            label: "年龄",
            prop: "age",
            type: "input"
          },
          {
            label: "职业",
            prop: "career",
            type: "input"
          },
          {
            label: "球龄",
            prop: "ballAge",
            type: "select",
            options: [
              { label: "一年以下", value: 1 },
              { label: "一到三年", value: 2 },
              { label: "三到五年", value: 3 },
              { label: "五到十年", value: 4 },
              { label: "十年以上", value: 5 }
            ]
          },
          {
            label: "身份证号",
            prop: "idCard"
          },
          {
            label: "报名时间",
            prop: "time",

            type: "date"
          },

          {
            label: "支付状态",
            prop: "payStatus",
            type: "select",
            options: [
              { label: "已支付", value: 2 },
              { label: "未支付", value: 1 }
            ]
          },
          {
            label: "审核状态",
            prop: "auditStatus",
            type: "select",
            options: [
              { label: "未审核", value: 1 },
              { label: "审核不通过", value: 2 },
              { label: "审核通过", value: 3 }
            ]
          }
        ]
      }
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
    // 录入球员的方法
    async addMember(){
      let { data } = await axios({
          method: "post",
          url: PUB.domain + "/crossAdd?page=tangball_member",
          data: {
            data:this.memberAdd
          }
        }).catch(() => {});
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
        this.showModifyDialog = false
    },
    // 打开新增弹窗的方法
    addMerber(item,i){
      this.memberAdd= item 
      this.showAddDialog = true
      this.checkedIndex = i
      
    },
    // 打开修改弹窗的方法
    modifyMerber(item,i){
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
      console.log(this.member);
      

    },
    /**
     * @name 处理报名表函数（团体赛和个人赛的区别）
     */
    handleCFlist: async function() {
      if (this.matchInfo.matchForm == 2) {
        this.title="报名球队信息"
        //动态数据字典，获取队伍信息
        this.cfList.dynamicDict = [
          {
            page: "tangball_team",
            populateColumn: "teamDoc",
            idColumn: "orderId",
            idColumn2: "orderId"
          }
        ];

        //如果是团体赛
        this.cfList.columns = [
          {
            label: "球队名称",
            prop: "team",
            slot: "slot_detail_item_teamName",
            width: 150
          },
          {
            label: "队长",
            prop: "memberId",
            slot: "slot_detail_item_memberId",
            width: 130
          },

          {
            label: "订单号",
            prop: "orderId",
            width: 145
          },
          {
            label: "报名时间",
            prop: "time",
            width: 100
          },
          {
            label: "支付状态",
            prop: "payStatus",
            width: 100,
            formatter: function(rowData) {
              if (rowData.payStatus == 2) {
                return "已支付";
              } else {
                return "未支付";
              }
            }
          },
          {
            label: "审核状态",
            prop: "auditStatus",
            "min-width": "100",
            formatter: function(rowData) {
              if (rowData.auditStatus == 1) {
                return "未审核";
              } else if (rowData.auditStatus == 2) {
                return "审核不通过";
              } else {
                return "审核通过";
              }
            }
          }
        ];
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
</style>
