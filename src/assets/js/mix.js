let MIX = {};
MIX.list = {}
MIX.list.list_achievement = {
    data() {
        return {
            cfList: {
                listIndex: "list_achievement", //vuex对应的字段
                twoTitle: "赛事",
                threeTitle: "比赛成绩",
                focusMenu: true,//进行菜单聚焦
                flag: true,
                url: {
                    list: "http://120.76.160.41:3000/crossList?page=tangball_achievement", //列表接口
                    add: "http://120.76.160.41:3000/crossAdd?page=tangball_achievement", //新增接口
                    modify:
                        "http://120.76.160.41:3000/crossModify?page=tangball_achievement", //修改接口
                    detail:
                        "http://120.76.160.41:3000/crossDetail?page=tangball_achievement", //查看单条数据详情接口，在修改表单或详情弹窗用到

                    delete:
                        "http://120.76.160.41:3000/crossDelete?page=tangball_achievement" //删除接口
                },
                //-------列配置数组-------
                columns: [
                    {
                        label: "参赛人Id",
                        prop: "participantsId",
                        slot: "slot_detail_item_participantsId",
                        width: 120
                    },

                    {
                        label: "赛事ID",
                        prop: "matchId",
                        slot: "slot_detail_item_matchId",
                        width: 160
                    },
                    {
                        label: "城市赛场馆",
                        prop: "cityVenueId",
                        slot: "slot_detail_item_cityVenueId",
                        width: 150
                    },
                    {
                        label: "赛事阶段",
                        prop: "matchProgress",
                        width: 180,
                        slot: "slot_detmember_enrollail_item_matchProgress"
                    },
                    {
                        label: "比赛得分",
                        prop: "matchScore",
                        width: 90
                    },
                    {
                        label: "名次",
                        prop: "ranking",
                        width: 70
                    }
                ],
                //-------筛选表单字段数组-------
                searchFormItems: [
                    {
                        label: "参赛人Id",
                        prop: "participantsId"
                    },

                    {
                        label: "赛事ID",
                        prop: "matchId"
                    }
                ],
                //-------详情字段数组-------
                detailItems: [
                    {
                        label: "参赛人Id",
                        prop: "participantsId",
                        slot: "slot_detail_item_participantsId"
                    },
                    {
                        label: "赛事ID",
                        prop: "matchId",
                        slot: "slot_detail_item_matchId"
                    },
                    {
                        label: "赛事阶段",
                        prop: "matchProgress",
                        slot: "slot_detail_item_matchProgress"
                    },
                    {
                        label: "比赛得分",
                        prop: "matchScore"
                    },
                    {
                        label: "名次",
                        prop: "ranking"
                    }
                ],
                //-------新增、修改表单字段数组-------
                formItems: [
                    {
                        label: "参赛人Id",
                        prop: "participantsId",
                        type: "select",
                        ajax: {
                            url: "http://120.76.160.41:3000/crossList?page=tangball_member",
                            keyLabel: "name",
                            keyValue: "P1"
                        }
                    },

                    {
                        label: "赛事ID",
                        prop: "matchId",
                        type: "select",
                        ajax: {
                            url: "http://120.76.160.41:3000/crossList?page=tangball_match",
                            keyLabel: "matchName",
                            keyValue: "P1"
                        }
                    },
                    {
                        label: "赛事报名信息",
                        prop: "memberId",
                        slot: "slot_form_item_matchInfo"
                    },
                    {
                        label: "赛事阶段",
                        prop: "matchProgress",
                        type: "select",
                        slot: "slot_modify_item_matchProgress"
                    },
                    {
                        label: "比赛得分",
                        prop: "matchScore",
                        type: "input"
                    }

                ]
            }
        };
    }
}



MIX.list.list_achievement_simple = {
    data() {
        return {
            cfList: {
                //-------列配置数组-------
                columns: [
                    {
                        label: "参赛人---",
                        prop: "participantsId",
                        slot: "slot_detail_item_participantsId",
                        width: 150
                    },


                    {
                        label: "比赛得分",
                        prop: "matchScore",
                        width: 90
                    },
                    {
                        label: "名次",
                        prop: "ranking",
                        // type:"index",
                        "min-width": "150"
                    }
                ],
            

            }
        };
    }
}





window.MIX = MIX;
export default MIX