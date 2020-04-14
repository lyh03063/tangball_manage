
//#region D_ITEMS:详情字段管理
window.D_ITEMS = window.D_ITEMS || {}//公共数据字典对象


import tangball_member_for_select from "@/assets/js/config/tangball_member_for_select.js"




//#region 球员
{
    let objBase = {
        label: "球员",
        prop: "memberId",
    }
    D_ITEMS.memberId = {
        ...objBase,
    };
    D_ITEMS.memberId_slot = {
        ...objBase,
        label: "报名球员",
        slot: "slot_detail_item_memberId"
    };
    COLUMNS.memberId = { ...objBase, width: 70, };
    COLUMNS.enrool_memberId = {
        ...objBase,
        label: "报名球员",
        width: 80,
        formatter: function (rowData) {
            if (rowData.memberDoc) {
                return rowData.memberDoc.name
            }
        }
    };
    F_ITEMS.memberId = { ...objBase, type: "input" };

    F_ITEMS.memberId_select = {
        ...objBase,
        type: "select",
        ajax: {
            url: "/crossList?page=tangball_member",
            keyLabel: "name",
            keyValue: "P1"
        }
    }
    F_ITEMS.memberId_select_rules = {
        ...objBase,
        type: "select",
        ajax: {
            url: "/crossList?page=tangball_member",
            keyLabel: "name",
            keyValue: "P1"
        },
        rules: [{ required: true, message: "报名球员不能为空" }]
    }

    F_ITEMS.memberId = {
        ...objBase,
        type: "select_list_data",
        cfSelectList: {
            //选择列表配置
            dataName: "球员",
            valueKey: "P1",
            labelKey: "name",
            pageName: "tangball_member",
            cfList: tangball_member_for_select
        },
        rules: [{ required: true, message: "球员不能为空" }]
    };
    F_ITEMS.memberId_readonly = {
        label: "球员",
        prop: "memberId",
        type: "ajax_populate",
        cfAjaxPopulate: { populateKey: "name", page: "tangball_member" }
    };
}

//#endregion

//#region 主办方
{
    let objBase = {
        label: "主办方",
        prop: "sponsorId",
    }
    D_ITEMS.sponsorId = {
        ...objBase,
        slot: "slot_detail_item_sponsorId"
    };

    COLUMNS.sponsorId = {
        ...objBase, width: 100,
        formatter: function (rowData) {
            if (rowData.sponsorDoc) {
                return rowData.sponsorDoc.name
            }
        }
    };

    F_ITEMS.sponsorId = {
        ...objBase,
        type: "select",
        ajax: {
            url: "/crossList?page=tangball_franchisee",
            keyLabel: "name",
            keyValue: "P1"
        }
    };
}
//#region columns 球队 enroll_for_ach
{
    COLUMNS.enroll_for_ach_team = {
        label: "球队名称",
        prop: "team",
        requireProp: ["orderId"], //依赖订单号
        slot: "slot_detail_item_teamName",
        width: 150
    }
    COLUMNS.enroll_for_ach_captain = {
        label: "队长",
        prop: "orderId",
        // slot: "slot_detail_item_memberId",
        width: 130,
        formatter: function (rowData) {
            if (rowData.teamDoc) {
                return rowData.teamDoc.member[0].name || "无"
            }
        }
    }
    COLUMNS.enroll_for_ach_score = {
        label: "总分",
        prop: "score",
        slot: "slot_column_scoreTotal",
        "min-width": "100",
    }

}

//#endregion

//#region 赛事名称
{
    let objBase = {
        label: "赛事名称",
        prop: "matchName",
    }
    D_ITEMS.matchName = {
        ...objBase,
    };
    COLUMNS.matchName = { ...objBase, width: 270, };
    F_ITEMS.matchName = { ...objBase, type: "input" };
    F_ITEMS.matchName = {
        ...objBase,
        rules: [{ required: true, message: "赛事名称不能为空" }],
    };
    F_ITEMS.matchName_search = {
        ...objBase,
        type: "input_find_vague",
    };
}

//#endregion


//#region 赛事时间
{
    let objBase = {
        label: "赛事时间",
        prop: "matchTime",
    }
    D_ITEMS.matchTime = {
        ...objBase,
    };
    COLUMNS.matchTime = {
        ...objBase, width: 140,
        sortable: "custom",//开启后端排序
        formatter: function (rowData) {
            return moment(rowData.matchTime).format("YYYY-MM-DD HH:mm");
        }
    };
    F_ITEMS.matchTime = {
        ...objBase,
        label: "赛事开始时间",
        type: "dateTime",
        rules: [{ required: true, message: "不能为空" }],
    };
    F_ITEMS.matchTime_search = {
        ...objBase,
        type: "time_period"
    };
}

//#endregion

//#region 报名开始时间
{
    let objBase = {
        label: "报名开始时间",
        prop: "enrollTime",
    }
    D_ITEMS.enrollTime = {
        ...objBase,
    };
    COLUMNS.enrollTime = { ...objBase, width: 70, };
    F_ITEMS.enrollTime = {
        ...objBase, type: "dateTime",
        rules: [{ required: true, message: "不能为空" }],
    };
}

//#endregion




//#region 赛事Id
{
    let objBase = {
        label: "赛事",
        prop: "matchId",
    }
    D_ITEMS.matchId = {
        ...objBase,
    };

    D_ITEMS.matchId_slot = {
        ...objBase,
        slot: "slot_detail_item_matchId"
    };
    COLUMNS.matchId = {
        ...objBase,
        // slot: "slot_detail_item_matchId",
        width: 250,
        formatter: function (rowData) {
            return lodash.get(rowData, "matchDoc.matchName", "") + `(${rowData.matchId})`
        }
    };

    COLUMNS.enrool_matchId = {
        ...objBase,
        label: "赛事名称",
        width: 240,
        formatter: function (rowData) {
            if (rowData.matchDoc) {
                return rowData.matchDoc.matchName
            }
        }
    };
    F_ITEMS.matchId = { ...objBase, type: "input" };

    F_ITEMS.matchId_readonly = {
        ...objBase,
        type: "ajax_populate",
        cfAjaxPopulate: { populateKey: "matchName", page: "tangball_match" }
    };


    F_ITEMS.matchId_select = {
        ...objBase,
        type: "select",
        ajax: {
            url: "/crossList?page=tangball_match",
            keyLabel: "matchName",
            keyValue: "P1"
        }
    };

    F_ITEMS.matchId_select_required = {
        ...F_ITEMS.matchId_select_search,
        rules: [{ required: true, message: "赛事不能为空" }]
    };

}

//#endregion

//#region 赛事信息
{
    let objBase = {
        label: "赛事信息",
        prop: "matchInfo",
    }
    D_ITEMS.matchInfo = {
        ...objBase,
    };
    D_ITEMS.matchInfo = {
        ...objBase,
        slot: 'slot_detail_item_matchInfo'
    };
    COLUMNS.matchInfo = { ...objBase, width: 70, };
    F_ITEMS.matchInfo = {
        ...objBase,
        slot: "slot_form_item_matchInfo"
    };
}

//#endregion



//#endregion





//#region 参赛次数
{
    let objBase = {
        label: "参赛次数",
        prop: "entries",
    }
    D_ITEMS.entries = {
        ...objBase,
    };
    COLUMNS.entries = {
        ...objBase,
        width: 70,
        statistics: { listIndex: 'list_enroll', targetIdKey: 'memberId' }
    };
    F_ITEMS.entries = { ...objBase, type: "input" };
}

//#endregion


//#region 所属球场
{
    let objBase = {
        label: "所属球场",
        prop: "venueId",
    }
    D_ITEMS.venueId = {
        ...objBase,
        slot: 'slot_detail_item_venueId'
    };

    COLUMNS.venueId = {
        ...objBase,
        width: 80,
        formatter: function (data) {
            if (data.venue) {
                return data.venue.name ? data.venue.name : "无"
            }
        }
    };
    F_ITEMS.venueId = { ...objBase, type: "input" };
}

//#endregion


//#region 所属加盟商
{
    let objBase = {
        label: "所属加盟商",
        prop: "franchiseeId",
    }
    D_ITEMS.franchiseeId = {
        ...objBase,
        slot: 'slot_detail_item_franchiseeId'
    };

    COLUMNS.franchiseeId = {
        ...D_ITEMS.franchiseeId,
        prop: "franchiseeId",
        width: 90,
        // formatter: function (row) {
        //     return franchiseeDoc
        //     if (row.franchisee) {
        //         return row.franchisee.name ? row.franchisee.name : '无'
        //     }
        // }
    };

    COLUMNS.franchiseeName = {
        ...objBase,
        prop: "franchiseeName",
        requireProp: ["franchiseeId"],
        width: 120,
        formatter: function (row) {
            return lodash.get(row, `franchiseeDoc.name`, '');

        }
    };
    F_ITEMS.franchiseeId = {
        ...objBase,
        type: "select",
        ajax: {
            url: "/crossList?page=tangball_franchisee",
            keyLabel: "name",
            keyValue: "P1"
        }
    };
}

//#endregion


//#region 报名时间
{
    let objBase = {
        label: "报名时间",
        prop: "time",
    }

    D_ITEMS.time_enrool = {
        ...objBase,
        formatter: function (row) {
            return moment(row.time).format('YYYY-MM-DD HH:mm')
        }
    };
    F_ITEMS.time = {
        ...objBase,
        type: "date"
    };
    COLUMNS.enrool_time = { ...D_ITEMS.time_enrool, width: 130, };
    F_ITEMS.time_enrool = { ...objBase, type: "input" };
}

//#endregion


//#region 支付状态-需去重
{
    let objBase = {
        label: "支付状态",
        prop: "payStatus",
    }
    D_ITEMS.payStatus = {

        ...objBase,
        formatter: function (rowData) {
            if (rowData.payStatus == 2) {
                return "已支付";
            } else {
                return "未支付";
            }
        }
    };


    COLUMNS.payStatus = { ...D_ITEMS.payStatus, width: 80, };
    F_ITEMS.payStatus = {
        label: "支付状态",
        prop: "payStatus",
        type: "select",
        options: [
            { label: "已支付", value: 2 },
            { label: "未支付", value: 1 }
        ]
    };
}

//#endregion

//待处理
COLUMNS.auditStatus = Object.assign({}, D_ITEMS.auditStatus, { width: 80 })

//#region 赛事类型
{
    let objBase = {
        label: "赛事类型",
        prop: "matchForm",
    }
    D_ITEMS.matchForm = {
        ...objBase,
    };
    COLUMNS.matchForm = {
        ...objBase,
        label: "类型",
        width: 50,
        formatter: function (rowData) {
            return rowData.matchForm == 2 ? "团体赛" : "个人赛"; //三元表达式
        }
    };


    COLUMNS.enrool_matchForm = {
        ...objBase,
        prop: "matchDoc",
        width: 80,
        formatter: function (rowData) {
            if (rowData.matchDoc) {
                if (rowData.matchDoc.matchForm == 1) {
                    return '个人赛'
                } else {
                    return '团体赛'
                }
            }
        }
    };

    F_ITEMS.matchForm = {
        ...objBase,
        type: "select",
        options: [
            { label: "个人赛", value: 1 },
            { label: "团体赛", value: 2 }
        ],
    };
}

//#endregion


//#region 比赛日期
{
    let objBase = {
        label: "比赛日期",
        prop: "playingTime"
    }

    D_ITEMS.playingTime = {
        ...objBase,
        formatter: function (row) {
            if (!row.playingTime) return "";
            return moment(row.playingTime).format('YYYY-MM-DD')
        }
    };
    COLUMNS.playingTime = { ...D_ITEMS.playingTime, width: 100, };
    F_ITEMS.playingTime = {
        ...objBase,
        type: "date"
    };
}

//#endregion


//#region 赛事结果说明
{
    let objBase = {
        label: "赛事结果说明",
        prop: "matchResult",
    }

    D_ITEMS.matchResult = {
        ...objBase,
        type: 'html'
    };
    COLUMNS.matchResult = { ...objBase, width: 70, };

    F_ITEMS.matchResult = {
        ...objBase,
        type: "editorTM",
        col_span: 24 //控制显示一行多列
    };
}

//#endregion


//#region 0000
{
    let objBase = {
        label: "赛事规程",
        prop: "matchManual",
    }
    D_ITEMS.matchManual = {
        ...objBase,
    };
    D_ITEMS.matchManual = {
        ...objBase,
        type: 'html'
    };
    COLUMNS.aamatchManuala = { ...objBase, width: 70, };
    F_ITEMS.matchManual = {
        ...objBase,
        type: "editorTM",
        col_span: 24 //控制显示一行多列
    };
}

//#endregion





//#region 赛事规则
{
    let objBase = {
        label: "赛事规则",
        prop: "ruleId",
    }
    D_ITEMS.ruleId = {
        ...objBase,
    };
    COLUMNS.ruleId = { ...objBase, width: 70, };
    F_ITEMS.ruleId = {
        ...objBase,
        type: "select",
        ajax: {
            url: "/crossList?page=tangball_rule",
            keyLabel: "name",
            keyValue: "P1"
        },
    };
}

//#endregion


//#region 报名要求
{
    let objBase = {
        label: "报名要求",
        prop: "enrollRequirements"
    }
    D_ITEMS.enrollRequirements = {
        ...objBase,
    };
    D_ITEMS.enrollRequirements = {
        ...objBase,
    };
    COLUMNS.enrollRequirements = { ...objBase, width: 70, };
    F_ITEMS.enrollRequirements = {
        ...objBase,
        type: "textarea",
        col_span: 24
    };
}

//#endregion


//#region 赛事介绍
{
    let objBase = {
        label: "赛事介绍",
        prop: "matchIntroduce"
    }

    D_ITEMS.matchIntroduce = {
        ...objBase,
    };


    COLUMNS.matchIntroduce = { ...objBase, width: 70, };
    F_ITEMS.matchIntroduce = {
        ...objBase,
        type: "textarea",
        col_span: 24
    };
}

//#endregion


//#region 报名费用
{
    let objBase = {
        label: "报名费",
        prop: "registrationFee"
    }

    D_ITEMS.registrationFee = {
        ...objBase,
    };

    COLUMNS.registrationFee = {
        ...objBase,
        width: 60
    };
    F_ITEMS.registrationFee = {
        ...objBase,
        type: "number",
    };
}

//#endregion


//#region 报名数
{
    let objBase = {
        label: "报名数",
        prop: "registeredPersons"
    }

    D_ITEMS.registeredPersons = {
        ...objBase,
    };
    COLUMNS.registeredPersons = { ...objBase, width: 70, };
    F_ITEMS.registeredPersons = { ...objBase, type: "input" };
}

//#endregion


//#region 赛事图片
{
    let objBase = {
        label: "赛事图片",
        prop: "album",
    }

    D_ITEMS.match_album = {
        ...objBase,
        slot: "slot_detail_item_album"
    };

    COLUMNS.match_album = { ...objBase, width: 70, };
    F_ITEMS.match_album = { ...objBase, type: "input" };
    F_ITEMS.album = {
        label: "相册",
        prop: "album",
        type: "upload",
        col_span: 24, //控制显示一行多列
        tips: "图片尺寸比例最好保持在1:0.8，建议尺寸：宽500px，高400px"
    };
}
F_ITEMS.albumVenue = {
    ...album,
    type: "upload",
    tips: "图片尺寸比例最好保持在1 : 0.8，建议尺寸：宽500px，高400px",
    uploadConfig: {
        limit: 5,
        // preview: true
    }

};
//#endregion


//#region 比赛球场
{
    let objBase = {
        label: "比赛球场",
        prop: "venue",
    }
    D_ITEMS.aaaa = {

    };
    D_ITEMS.venue = {
        ...objBase,
        slot: "slot_detail_item_cityVenueList"
    };
    COLUMNS.venue = { ...objBase, width: 70, };
    F_ITEMS.venue = {
        ...objBase,
        type: "select",
        slot: "slot_form_item_cityVenueList",
        col_span: 24
    };
}

//#endregion


//#region 赛程设置
{
    let objBase = {
        label: "赛程设置",
        prop: "progress",
    }


    D_ITEMS.progress = {
        ...objBase,
        slot: 'slot_detail_item_progress'
    };

    COLUMNS.progress = { ...objBase, width: 70, };
    F_ITEMS.progress = {
        ...objBase,
        slot: 'slot_form_item_progress',
        col_span: 24
    };
}

//#endregion


//#region 报名结束时间
{
    let objBase = {
        label: "报名结束时间",
        prop: "enrollTimeEnd"
    }

    D_ITEMS.enrollTimeEnd = {
        ...objBase,
    };

    COLUMNS.enrollTimeEnd = { ...objBase, width: 70, };
    F_ITEMS.enrollTimeEnd = {
        ...objBase,
        type: "dateTime",
        rules: [{ required: true, message: "不能为空" }],
    };
}

//#endregion


//#region 赛事状态
{
    let objBase = {
        label: "赛事状态",
        prop: "matchStatus",
    }

    D_ITEMS.matchStatus = {
        ...objBase,
        formatter: function (rowData) {
            let obj = util.getTimeStatus({
                start: rowData.matchTime,
                end: rowData.matchTimeEnd
            });
            let htmlResult = `比赛时间：${obj.start}&nbsp;到&nbsp;${obj.end} &nbsp;&nbsp;&nbsp;当前状态：比赛${obj.msg}`;
            return htmlResult;
        }
    };

    COLUMNS.matchStatus = {
        ...objBase,
        requireProp: ["enrollTime", 'enrollTimeEnd', 'matchTime', 'matchTimeEnd'],
        width: 100,
        formatter: function (rowData) {
            let nowDate = new Date().getTime();
            let enrollTimeDate = new Date(rowData.enrollTime).getTime();
            let enrollTimeEnd = new Date(rowData.enrollTimeEnd).getTime();
            let matchTime = new Date(rowData.matchTime).getTime();
            let matchTimeEnd = new Date(rowData.matchTimeEnd).getTime();
            if (nowDate > matchTimeEnd) {
                return '赛事已结束'
            } else if (nowDate > matchTime) {
                return '赛事已开始'
            } else if (nowDate > enrollTimeEnd) {
                return '报名时间已结束'
            } else if (nowDate > enrollTimeDate) {
                return '火热报名中'
            } else {
                return '报名时间未到'
            }
        }
    };
    F_ITEMS.matchStatus = { ...objBase, type: "input" };
}

//#endregion


//#region 发布状态
{
    let objBase = {
        label: "发布状态",
        prop: "publicationStatus",
    }


    D_ITEMS.publicationStatus = {
        ...objBase,
        formatter: function (rowData) {
            return rowData.publicationStatus == 1 ? "发布" : "未发布"; //三元表达式
        }
    };
    COLUMNS.publicationStatus = { ...D_ITEMS.publicationStatus, width: 70, };
    F_ITEMS.publicationStatus = {
        ...objBase,
        type: "select",
        options: [{ label: "是", value: 1 }, { label: "否", value: 2 }]
    };
}

//#endregion


//#region 报名状态
{
    let objBase = {
        label: "报名状态",
        prop: "matchErollStatus",
    }

    D_ITEMS.matchErollStatus = {
        ...objBase,
        formatter: function (rowData) {
            let obj = util.getTimeStatus({
                start: rowData.enrollTime,
                end: rowData.enrollTimeEnd
            });
            let htmlResult = `报名时间：${obj.start}&nbsp;到&nbsp;${obj.end} &nbsp;&nbsp;&nbsp;当前状态：报名${obj.msg}`;
            return htmlResult;
        }
    };
    COLUMNS.matchErollStatus = { ...objBase, width: 70, };
    F_ITEMS.matchErollStatus = { ...objBase, type: "input" };
}

//#endregion


//#region 0000
{
    let objBase = {
        label: "赛事结束时间",
        prop: "matchTimeEnd",
    }
    D_ITEMS.matchTimeEnd = {
        ...objBase,
    };
    COLUMNS.matchTimeEnd = { ...objBase, width: 70, };
    F_ITEMS.matchTimeEnd = {
        ...objBase,
        type: "dateTime",
        rules: [{ required: true, message: "不能为空" }],
    };
}

//#endregion


//#region 女性人数范围
{
    let objBase = {
        prop: "womenCount",
        label: "女性人数范围",

    }
    D_ITEMS.womenCount = {
        ...objBase,
    };

    COLUMNS.womenCount = { ...objBase, width: 70, };

    F_ITEMS.womenCount = {
        ...objBase,
        type: "numberRange",
        term: { matchForm: 2 },

    };
}

//#endregion


//#region 男性人数范围
{
    let objBase = {
        label: "男性人数范围",
        prop: "menCount",

    }
    D_ITEMS.menCount = {
        ...objBase,
    };

    F_ITEMS.menCount = {
        ...objBase,
        type: "numberRange",
        term: { matchForm: 2 },

    };
}

//#endregion


//#region 队员人数范围
{
    let objBase = {
        label: "队员人数范围",
    }
    D_ITEMS.teamMemberRange = {
        ...objBase,
    };
    COLUMNS.teamMemberRange = { ...objBase, width: 70, };


    F_ITEMS.teamMemberRange = {
        ...objBase,
        keyMin: "teamMemberMin",
        keyMax: "teamMemberMax",
        type: "numberRange",
        term: { matchForm: 2 },
        // rules: [{ required: true, message: "不能为空" }]
    };

}

//#endregion


//#region 球队信息
{
    let objBase = {
        label: "球队信息",
        prop: "groups",
    }
    D_ITEMS.groups = {
        ...objBase,
    };
    COLUMNS.groups = { ...objBase, width: 70, };
    F_ITEMS.groups = {
        ...objBase,
        slot: "slot_form_item_groups"
    };
}

//#endregion


//#region 成绩数
{
    let objBase = {
        label: "成绩数",
        prop: "countAchievement",
    }
    D_ITEMS.countAchievement = {
        ...objBase,
    };

    COLUMNS.countAchievement = {

        width: 70,
        statistics: { listIndex: 'list_achievement', targetIdKey: 'memberId' }
    };
    F_ITEMS.countAchievement = { ...objBase, type: "input" };
}

//#endregion


//#region 微信昵称
{
    let objBase = {
        label: "微信昵称",
        prop: "wxNickName",
    }
    D_ITEMS.wxNickName = {
        ...objBase,
    };
    COLUMNS.wxNickName = {
        ...objBase,
        width: 100
    };

    F_ITEMS.wxNickName = { ...objBase, type: "input" };
}

//#endregion





//#region 对阵分组/成绩
{
    let objBase = {
        label: "对阵分组/成绩",
    }
    D_ITEMS.confrontAchievement = {
        ...objBase,
    };
    COLUMNS.confrontAchievement = {
        ...objBase,
        width: 105,
        slot: "slot_column_achievement"
    };
    F_ITEMS.confrontAchievement = { ...objBase, type: "input" };
}



//#region 报名表
{
    let objBase = {
        label: "报名表",
    }
    D_ITEMS.enroolSheet = {
        ...objBase,
    };
    COLUMNS.enroolSheet = {
        ...objBase,
        requireProp: ["registeredPersons"],
        width: 95,
        slot: "slot_column_enroll"
    };

    F_ITEMS.enroolSheet = { ...objBase, type: "input" };
}


//#region 参赛人
{
    let objBase = {
        label: "参赛人",
        prop: "participantsId",
    }
    D_ITEMS.participantsId = { ...objBase, slot: "slot_detail_item_participantsId" };
    COLUMNS.participantsId = {
        ...objBase,
        width: 120,
        formatter: function (rowData) {
            return lodash.get(rowData, "memberDoc.name", "") + `(${rowData.participantsId})`
        }
    };


    F_ITEMS.participantsId = {
        ...objBase,
        type: "select",
        ajax: {
            url: "/crossList?page=tangball_member",
            keyLabel: "name",
            keyValue: "P1"
        }
    };

    F_ITEMS.participantsId_search = {
        ...objBase,
        label: "参赛人Id",
    }
}


//#region 比赛开始时间
{
    let objBase = {
        label: "比赛开始时间",
        prop: "timeStart",
    }
    D_ITEMS.timeStart = {
        ...objBase,
    };
    COLUMNS.timeStart = {
        ...objBase,
        width: 155,
        formatter: function (row) {
            return moment(row.timeStart).format("YYYY-MM-DD HH:mm");
        }
    };
    F_ITEMS.timeStart = { ...objBase, type: "dateTime" };
}


//#region 结束时间
{
    let objBase = {
        label: "结束时间",
        prop: "timeEnd",
    }
    D_ITEMS.timeEnd = {
        ...objBase,
    };
    COLUMNS.timeEnd = {
        ...objBase,
        width: 175,
        formatter: function (row) {
            return moment(row.timeEnd).format("YYYY-MM-DD HH:mm");
        }
    };
    F_ITEMS.timeEnd = { ...objBase, type: "dateTime" };
}


//#region 轮数
{
    let objBase = {
        label: "轮数",
        prop: "roundNum",
    }
    D_ITEMS.roundNum = {
        ...objBase,
    };
    COLUMNS.roundNum = {
        ...objBase,
        width: 75
    };
    F_ITEMS.roundNum = { ...objBase, type: "input" };
}


//#region 组数
{
    let objBase = {
        label: "组数",
        prop: "groupNum",
    }
    D_ITEMS.groupNum = {
        ...objBase,
    };
    COLUMNS.groupNum = {
        ...objBase,
        width: 75
    };
    F_ITEMS.groupNum = { ...objBase, type: "number" };
}


//#region 杆数
{
    let objBase = {
        label: "杆数",
        prop: "matchScore",
    }
    D_ITEMS.matchScore = {
        ...objBase,
        slot: 'slot_detail_item_scoreList'
    };
    COLUMNS.matchScore = {
        ...objBase,
        requireProp: ["scoreList"], //依赖成绩列表
        "min-width": 90
    };
    COLUMNS.matchScore2 = {
        ...objBase,
        width: 90
    };
    COLUMNS.matchScoreTotal = {
        ...objBase,
        label: "总杆数",
        width: 100,
    };
    F_ITEMS.matchScore = { ...objBase, type: "input" };
    F_ITEMS.matchScoreTotal = { ...objBase, label: "总杆数", type: "input" };
}


//#region 所属球队
{
    let objBase = {
        label: "所属球队",
        prop: "teamId",
    }
    D_ITEMS.teamId = {
        ...objBase,
    };
    COLUMNS.teamId = {
        ...objBase,
        width: 120,
        formatter: function (rowData) {
            if (rowData.team) {
                return rowData.team.name ? rowData.team.name : '无'
            }
        }
    };
    F_ITEMS.teamId = {
        label: "所属球队",
        prop: "teamId",
        type: "select",
        ajax: {
            // param: { aaa: 123 },
            url: "/crossList?page=tangball_team",
            keyLabel: "name",
            keyValue: "P1"
        }
    };


}


//#region 打位
{
    let objBase = {
        label: "打位",
        prop: "tee",
    }
    D_ITEMS.tee = {
        ...objBase,
    };
    COLUMNS.tee = { ...objBase, width: 75, };
    F_ITEMS.tee = {
        ...objBase,
        type: "number"
    };
}


//#region 成绩记分
{
    let objBase = {
        label: "成绩记分",
        prop: "scoreList",
    }
    D_ITEMS.scoreList = {
        ...objBase,
    };
    COLUMNS.scoreList = { ...objBase, width: 70, };
    F_ITEMS.scoreList = {
        ...objBase,
        type: "input",
        slot: 'slot_form_item_scoreList',
        col_span: 24
    };
}


//#region 赛段
{
    let objBase = {
        label: "赛段",
        prop: "progressIndex",
    }
    D_ITEMS.progressIndex = {
        ...objBase,
    };
    COLUMNS.progressIndex = {
        ...objBase,
        width: 75
    };
    F_ITEMS.progressIndex = { ...objBase, type: "input" };
}


//#region 名次
{
    let objBase = {
        label: "名次",
        prop: "ranking",
    }
    D_ITEMS.ranking = {
        ...objBase,
    };
    COLUMNS.ranking = {
        label: "名次",
        prop: "ranking",
        width: 70
    };
    F_ITEMS.ranking = { ...objBase, type: "input" };
}
//#endregion


//#region 所属角色-之前版本
{
    let objBase = {
        label: "所属角色",
        prop: "role",
    }
    D_ITEMS.role_normal = {
        ...objBase,
    };
    COLUMNS.role_normal = { ...objBase, width: 70, };
    F_ITEMS.role_normal = {
        ...objBase,
        type: "select",
        ajax: {
            url: "/crossList?page=tangball_role",
            keyLabel: "name",
            keyValue: "P1"
        }
    };
}


//#region 赛事收入
{
    let objBase = {
        label: "赛事收入",
        prop: "matchIncome",
    }
    D_ITEMS.matchIncome = {
        ...objBase,
    };
    COLUMNS.matchIncome = { ...objBase, width: 75, slot: "slot_column_matchIncome" };
    F_ITEMS.matchIncome = { ...objBase, type: "input" };
}


//#region 订单金额
{
    let objBase = {
        label: "订单金额",
        prop: "orderMoney",
    }
    D_ITEMS.orderMoney = {
        ...objBase,
    };
    COLUMNS.orderMoney = { ...objBase, width: 70, };
    F_ITEMS.orderMoney = { ...objBase, type: "input" };
}
//#endregion


//#region 球场所在城市
{
    let objBase = {
        label: "城市",
        prop: "venue_city",
    }
    D_ITEMS.venue_city = {
        ...objBase,
    };

    COLUMNS.venue_city = {
        label: "城市",
        prop: "area",
        width: 70,
        formatter: function (rowData) {
            return lodash.get(rowData, `areaDoc.P2`);

        }
    };
}


//#region 可多次报名
{
    let objBase = {
        label: "可多次报名",
        prop: "mutiEnrool",
    }
    D_ITEMS.mutiEnrool = {
        ...objBase,
        formatter: function (row) { return lodash.get(DYDICT.boolean, `${row.mutiEnrool}.label`); },
    };
    COLUMNS.mutiEnrool = {
        ...objBase, width: 70,
        formatter: function (row) { return lodash.get(DYDICT.boolean, `${row.mutiEnrool}.label`); },
    };
    F_ITEMS.mutiEnrool = { ...objBase, type: "select", default: 0, options: DYDICT.arr_boolean };
}


//#region 地区名称
{
    let objBase = {
        label: "地区名称",
        prop: "P2",
        width: 200
    }
    D_ITEMS.areaName_P2 = {
        ...objBase,
    };
    COLUMNS.areaName_P2 = { ...objBase, width: 70, };
    F_ITEMS.areaName_P2 = { ...objBase, type: "input" };
}


//#region 地区编号
{
    let objBase = {
        label: "地区编号",
        prop: "P7",
        width: 200
    }
    D_ITEMS.areaId_P7 = {
        ...objBase,
    };
    COLUMNS.areaId_P7 = { ...objBase, width: 200, };
    F_ITEMS.areaId_P7 = { ...objBase, type: "input" };
}
//#region 父地区编号
{
    let objBase = {
        label: "父地区编号",
        prop: "P8",
    }
    D_ITEMS.areaFatherId_P8 = {
        ...objBase,
    };
    COLUMNS.areaFatherId_P8 = { ...objBase, width: 150 };
    F_ITEMS.areaFatherId_P8 = { ...objBase, type: "input" };
}
//#region 地区球场数
{
    let objBase = {
        label: "球场数",
        prop: "tangball",
    }
    D_ITEMS.area_tangball = {
        ...objBase,
    };
    COLUMNS.area_tangball = {
        ...objBase, width: 100,
        formatter: function (rowData) {
            if (!rowData.tangball) return "";
            return rowData.tangball.countVenue
        }
    };
    F_ITEMS.area_tangball = { ...objBase };
}
//#region 文章分类id
{
    let objBase = {
        label: "分类编号",
        prop: "P1",
    }
    D_ITEMS.acticle_category_id = {
        ...objBase,
    };
    COLUMNS.acticle_category_id = { ...objBase, width: 100 };
    F_ITEMS.acticle_category_id = { ...objBase, type: "input" };
}
//#region 文章分类名称
{
    let objBase = {
        label: "分类名称",
        prop: "name",
    }
    D_ITEMS.acticle_category_name = {
        ...objBase,
    };
    COLUMNS.acticle_category_name = { ...objBase, width: 70 };
    F_ITEMS.acticle_category_name = { ...objBase, type: "input" };
}
//#region 文章分类说明
{
    let objBase = {
        label: "分类说明",
        prop: "remark",
    }
    D_ITEMS.acticle_category_remark = {
        ...objBase,
    };
    COLUMNS.acticle_category_remark = { ...objBase, width: 250 };
    F_ITEMS.acticle_category_remark = { ...objBase, type: "textarea" };
}
//#region 文章分类下资讯数量
{
    let objBase = {
        label: "资讯数量",
        prop: "acticleNumber",
    }
    D_ITEMS.acticle_category_acticleNumber = {
        ...objBase,
    };
    COLUMNS.acticle_category_acticleNumber = {
        ...objBase, width: 90,
        statistics: { listIndex: 'list_article', targetIdKey: 'articleCategory' }
    };
    F_ITEMS.acticle_category_acticleNumber = { ...objBase, type: "textarea" };
}
//#region 资讯标题
{
    let objBase = {
        label: "资讯标题",
        prop: "articleTitle",
    }
    D_ITEMS.acticle_articleTitle = {
        ...objBase,
    };
    COLUMNS.acticle_articleTitle = { ...objBase, width: 260 };
    F_ITEMS.acticle_search_articleTitle = { ...objBase, type: "input_find_vague" };
    F_ITEMS.acticle_articleTitle = { ...objBase, type: "input" };
}
//#region 资讯所属分类名称
{
    let objBase = {
        label: "分类名称",
        prop: "articleCategory",
    }
    D_ITEMS.acticle_articleCategory = {
        ...objBase, slot: 'slot_detail_item_articleCategory'
    };
    COLUMNS.acticle_articleCategory = {
        ...objBase, width: 70,
        formatter: function (rowData) {
            let name = lodash.get(rowData, "categoryDoc.name");
            return name;
        }
    };
    F_ITEMS.acticle_articleCategory = {
        ...objBase, type: "select",
        ajax: {
            url: "/crossList?page=tangball_article_category",
            keyLabel: "name",
            keyValue: "P1"
        }
    };
}

//#region 是否置顶
{
    let prop = "topSort", objBase = { label: "置顶", prop, }
    D_ITEMS[prop] = { ...objBase, };
    COLUMNS[prop] = { ...objBase, width: 90,component: "com_column_topSort", };
    F_ITEMS[prop] = { ...objBase, type: "number" };
    // F_ITEMS[`${prop}_search`] = { ...objBase, type: "input_find_vague" };
}
//#endregion



//#region 资讯所属加盟商
{
    let objBase = {
        label: "所属加盟商",
        prop: "franchiseeId",
    }
    D_ITEMS.acticle_franchiseeId = {
        ...objBase, slot: 'slot_detail_item_franchiseeId'
    };
    COLUMNS.acticle_franchiseeId = {
        ...objBase, width: 120,
        formatter: function (rowData) {
            if (rowData.franchisee) {
                return rowData.franchisee.name
            }
        }
    };
    F_ITEMS.acticle_franchiseeId = { ...objBase, type: "input" };
}
//#region 资讯审核状态
{
    let objBase = {
        label: "审核状态",
        prop: "auditStatus",
    }
    D_ITEMS.acticle_auditStatus = {
        ...objBase, formatter: function (rowData) {
            return (rowData.auditStatus == 1 ? '已审核' : '未审核')
        }
    };
    COLUMNS.acticle_auditStatus = {
        ...objBase, width: 90,
        formatter: function (rowData) {
            return (rowData.auditStatus == 1 ? '已审核' : '未审核')
        }
    }
    F_ITEMS.acticle_auditStatus = {
        ...objBase, type: "select",
        options: [
            { value: 0, label: "未审核" },
            { value: 1, label: "已审核" },
        ]
    };
}
//#region 资讯是否显示在首页
{
    let objBase = {
        label: "首页显示",
        prop: "recommend",
    }
    D_ITEMS.acticle_recommend = {
        ...objBase, width: 110,
        formatter: function (rowData) {
            return rowData.recommend == 1 ? '是' : '否'
        }
    };
    COLUMNS.acticle_recommend = {
        ...objBase, width: 80,
        formatter: function (rowData) {
            return rowData.recommend == 1 ? '是' : '否'
        }
    }
    F_ITEMS.acticle_recommend = {
        ...objBase, type: "select",
        options: [
            { value: 0, label: "否" },
            { value: 1, label: "是" },
        ]
    };
}
//#region 资讯创建时间
{
    let objBase = {
        label: "创建时间",
        prop: "CreateTime",
    }
    D_ITEMS.acticle_CreateTime = {
        ...objBase, width: 160,
        formatter: function (rowData) {
            return moment(rowData.CreateTime).format('YYYY-MM-DD HH:mm');
        }
    };
    COLUMNS.acticle_CreateTime = {
        ...objBase, width: 160,
        formatter: function (rowData) {
            return moment(rowData.CreateTime).format('YYYY-MM-DD HH:mm');
        }
    }
    F_ITEMS.acticle_CreateTime = {
        ...objBase, type: "select",
        options: [
            { value: 0, label: "否" },
            { value: 1, label: "是" },
        ]
    };
}
//#region 资讯其他内容
{
    let objBase = {
        label: "其他",
        prop: "extend",
    }
    D_ITEMS.acticle_extend = {
        ...objBase, width: 255,
        formatter: function (extend) {
            return JSON.stringify(extend.extend);
        }
    };
    COLUMNS.acticle_extend = {
        ...objBase, width: 255,
        formatter: function (extend) {
            return JSON.stringify(extend.extend);
        }
    }
    F_ITEMS.acticle_extend = { ...objBase, path: "wxArticleUrl", };
}
//#region 资讯详情
{
    let objBase = {
        label: "资讯详情",
        prop: "articleContent",
    }
    D_ITEMS.acticle_articleContent = { ...objBase, width: 255, type: "html" };
    COLUMNS.acticle_articleContent = { ...objBase, width: 255, }
    F_ITEMS.acticle_articleContent = { ...objBase, type: "editor", };
}
//#region 报名表报名球员
{
    let objBase = {
        label: "报名球员",
        prop: "memberId",
    }
    COLUMNS.enroll_default_memberId = { ...objBase, slot: "slot_detail_item_memberId", width: 100 }
    D_ITEMS.enroll_default_memberId = { ...objBase, slot: "slot_detail_item_memberId" };
    F_ITEMS.enroll_default_memberId = {
        ...objBase, type: "select",
        ajax: {
            url: "/crossList?page=tangball_member",
            keyLabel: "name",
            keyValue: "P1"
        },
        rules: [{ required: true, message: "报名球员不能为空" }]
    };
}
//#region 报名表赛事
{
    let objBase = {
        label: "赛事",
        prop: "matchId",
    }
    COLUMNS.enroll_default_matchId = { ...objBase, slot: "slot_detail_item_matchId", width: 120 }
    D_ITEMS.enroll_default_matchId = { ...objBase, slot: "slot_detail_item_matchId" };
    F_ITEMS.enroll_default_matchId = {
        ...objBase, type: "select",
        ajax: {
            url: "/crossList?page=tangball_match",
            keyLabel: "matchName",
            keyValue: "P1"
        },
        rules: [{ required: true, message: "赛事不能为空" }]
    };
}
//#region 报名表赛事信息
{
    let objBase = {
        label: "赛事信息",
        prop: "cityVenueId",
    }
    COLUMNS.enroll_default_cityVenueId = { ...objBase, width: 80 }
    D_ITEMS.enroll_default_cityVenueId = { ...objBase, width: 255 };
    F_ITEMS.enroll_default_cityVenueId = { ...objBase, slot: "slot_form_item_matchInfo" };
}
//#region 报名表手机号
{
    let objBase = {
        label: "手机号",
        prop: "phone",
    }
    COLUMNS.enroll_default_phone = { ...objBase, width: 80 }
    D_ITEMS.enroll_default_phone = { ...objBase, width: 255 };
    F_ITEMS.enroll_default_phone = { ...objBase, type: "input" };
}
//#region 报名表性别
{
    let objBase = {
        label: "性别",
        prop: "sex",
    }
    COLUMNS.enroll_default_sex = {
        ...objBase, width: 40, formatter: function (rowData) {
            if (rowData.sex == 1) {
                return "男";
            } else {
                return "女";
            }
        }
    }
    D_ITEMS.enroll_default_sex = {
        ...objBase, formatter: function (rowData) {
            if (rowData.sex == 1) {
                return "男";
            } else {
                return "女";
            }
        }
    };
    F_ITEMS.enroll_default_sex = {
        ...objBase, type: "select",
        options: [{ label: "男", value: 1 }, { label: "女", value: 2 }]
    };
}
//#region 报名表年龄
{
    let objBase = {
        label: "年龄",
        prop: "age",
    }
    COLUMNS.enroll_default_age = { ...objBase, width: 40 }
    D_ITEMS.enroll_default_age = { ...objBase };
    F_ITEMS.enroll_default_age = { ...objBase, type: "input" };
}
//#region 报名表职业
{
    let objBase = {
        label: "职业",
        prop: "career",
    }
    COLUMNS.enroll_default_career = { ...objBase, width: 40 }
    D_ITEMS.enroll_default_career = { ...objBase };
    F_ITEMS.enroll_default_career = { ...objBase, type: "input" };
}
//#region 报名表球龄
{
    let objBase = {
        label: "球龄",
        prop: "ballAge",
    }
    COLUMNS.enroll_default_ballAge = {
        ...objBase, width: 80,
        formatter: function (rowData) {
            if (rowData.ballAge == 1) {
                return "一年以下";
            } else if (rowData.ballAge == 2) {
                return "一到三年";
            } else if (rowData.ballAge == 3) {
                return "三到五年";
            } else if (rowData.ballAge == 4) {
                return "五到十年";
            } else {
                return "十年以上";
            }
        }
    }
    D_ITEMS.enroll_default_ballAge = {
        ...objBase, formatter: function (rowData) {
            if (rowData.ballAge == 1) {
                return "一年以下";
            } else if (rowData.ballAge == 2) {
                return "一到三年";
            } else if (rowData.ballAge == 3) {
                return "三到五年";
            } else if (rowData.ballAge == 4) {
                return "五到十年";
            } else {
                return "十年以上";
            }
        }
    }
    F_ITEMS.enroll_default_ballAge = {
        ...objBase, type: "select",
        options: [
            { label: "一年以下", value: 1 },
            { label: "一到三年", value: 2 },
            { label: "三到五年", value: 3 },
            { label: "五到十年", value: 4 },
            { label: "十年以上", value: 5 }
        ]
    }
};
//#region 报名表身份证号
{
    let objBase = {
        label: "身份证号",
        prop: "idCard",
    }
    COLUMNS.enroll_default_idCard = { ...objBase, width: 90 }
    D_ITEMS.enroll_default_idCard = { ...objBase };
    F_ITEMS.enroll_default_idCard = { ...objBase, type: "input", };
}
//#region 报名表报名时间
{
    let objBase = {
        label: "报名时间",
        prop: "time",
    }
    COLUMNS.enroll_default_time = { ...objBase, width: 75 }
    D_ITEMS.enroll_default_time = {
        ...objBase, formatter: function (row) {
            return moment(row.time).format("YYYY-MM-DD HH:mm");
        }
    };
    F_ITEMS.enroll_default_time = { ...objBase, type: "date" };
}
//#region 报名表支付状态
{
    let objBase = {
        label: "支付状态",
        prop: "payStatus",
    }
    COLUMNS.enroll_default_payStatus = {
        ...objBase, width: 70,
        formatter: function (rowData) {
            if (rowData.payStatus == 2) {
                return "已支付";
            } else {
                return "未支付";
            }
        }
    }
    D_ITEMS.enroll_default_payStatus = {
        ...objBase, formatter: function (rowData) {
            if (rowData.payStatus == 2) {
                return "已支付";
            } else {
                return "未支付";
            }
        }
    };
    F_ITEMS.enroll_default_payStatus = {
        ...objBase, type: "select",
        options: [
            { label: "已支付", value: 2 },
            { label: "未支付", value: 1 }
        ]
    };
}
//#region 报名表职业
{
    let objBase = {
        label: "审核状态",
        prop: "auditStatus",
    }
    COLUMNS.enroll_default_auditStatus = {
        ...objBase, width: 70,
        formatter: function (rowData) {
            if (rowData.auditStatus == 1) {
                return "未审核";
            } else if (rowData.auditStatus == 2) {
                return "审核不通过";
            } else {
                return "审核通过";
            }
        }
    }
    D_ITEMS.enroll_default_auditStatus = {
        ...objBase, formatter: function (rowData) {
            if (rowData.auditStatus == 1) {
                return "未审核";
            } else if (rowData.auditStatus == 2) {
                return "审核不通过";
            } else {
                return "审核通过";
            }
        }
    };
    F_ITEMS.enroll_default_auditStatus = {
        ...objBase, type: "select",
        options: [
            { label: "未审核", value: 1 },
            { label: "审核不通过", value: 2 },
            { label: "审核通过", value: 3 }
        ]
    };
}

//#region 加盟商ID
{
    let objBase = {
        label: "Id",
        prop: "P1"
    }
    COLUMNS.franchisee_P1 = { ...objBase, width: 60 }
    D_ITEMS.franchisee_P1 = { ...objBase };
    F_ITEMS.franchisee_P1 = { ...objBase, type: "input", };
}
//#region 加盟商企业名称
{
    let objBase = {
        label: "企业名称",
        prop: "name",
    }
    COLUMNS.franchisee_name = { ...objBase, width: 200 }
    D_ITEMS.franchisee_name = { ...objBase };
    F_ITEMS.franchisee_name = {
        ...objBase, type: "select",
        ajax: {
            url: "/crossList?page=tangball_franchisee",
            keyLabel: "name",
            keyValue: "P1"
        }
    };
}
//#region 加盟商球场数
{
    let objBase = {
        label: "球场数",
        prop: "countVenue",
    }
    COLUMNS.franchisee_countVenue = {
        ...objBase, width: 75,
        statistics: { listIndex: 'list_venue', targetIdKey: 'franchiseeId' }
    };
    D_ITEMS.franchisee_countVenue = {
        ...objBase, statistics: { listIndex: 'list_venue', targetIdKey: 'franchiseeId' }
    };
    F_ITEMS.franchisee_countVenue = { ...objBase, type: "input" };
}
//#region 加盟商加盟时间
{
    let objBase = {
        label: "加盟时间",
        prop: "joinTime",
    }
    COLUMNS.franchisee_joinTime = {
        ...objBase, width: 160,
        formatter: function (row) {
            return moment(row.joinTime).format("YYYY-MM-DD HH:DD")
        }
    }
    D_ITEMS.franchisee_joinTime = {
        ...objBase, formatter: function (row) {

            return moment(row.joinTime).format("YYYY-MM-DD HH:DD")

        }
    };
    F_ITEMS.franchisee_search_joinTime = { ...objBase, type: "time_period" };
    F_ITEMS.franchisee_joinTime = { ...objBase, type: "date" };
}
//#region 加盟商备注
{
    let objBase = {
        label: "备注",
        prop: "remark",
    }
    COLUMNS.franchisee_remark = { ...objBase, width: 300 }
    D_ITEMS.franchisee_remark = { ...objBase };
    F_ITEMS.franchisee_remark = { ...objBase, type: "input", };
}
//#region 加盟商密码
{
    let objBase = {
        label: "密码",
        prop: "password",
    }
    COLUMNS.franchisee_password = { ...objBase, width: 150 }
    D_ITEMS.franchisee_password = { ...objBase };
    F_ITEMS.franchisee_password = { ...objBase, type: "input", };
}
//#region 球员id
{
    let objBase = {
        label: "id",
        prop: "P1",
    }
    COLUMNS.group_P1 = { ...objBase, width: 80 }
    D_ITEMS.group_P1 = { ...objBase };
    F_ITEMS.group_P1 = { ...objBase, type: "input", };
}
//#region 球员组号
{
    let objBase = {
        label: "组号",
        prop: "groupNum",
    }
    COLUMNS.group_groupNum = { ...objBase, width: 100 }
    D_ITEMS.group_groupNum = { ...objBase };
    F_ITEMS.group_groupNum = { ...objBase, type: "number" };
}
//#region 球员所属赛事
{
    let objBase = {
        label: "所属赛事",
        prop: "matchId",
    }
    COLUMNS.group_matchId = { ...objBase, width: 100 }
    D_ITEMS.group_matchId = { ...objBase };
    F_ITEMS.group_matchId = {
        ...objBase, type: "select",
        ajax: {
            url: "/crossList?page=tangball_match",
            keyLabel: "matchName",
            keyValue: "P1"
        }
    };
}
//#region 球员所属赛段"
{
    let objBase = {
        label: "所属赛段",
        prop: "progressIndex",
    }
    COLUMNS.group_progressIndex = { ...objBase, width: 100 }
    D_ITEMS.group_progressIndex = { ...objBase };
    F_ITEMS.group_progressIndex = { ...objBase, type: "number" };
}
//#region 球员所属轮数
{
    let objBase = {
        label: "所属轮数",
        prop: "roundNum",
    }
    COLUMNS.group_roundNum = { ...objBase, width: 100 }
    D_ITEMS.group_roundNum = { ...objBase };
    F_ITEMS.group_roundNum = { ...objBase, type: "number" };
}
//#region 球员小组成员
{
    let objBase = {
        label: "小组成员",
        prop: "groupMember",
    }
    COLUMNS.group_groupMember = { ...objBase, width: 100 }
    D_ITEMS.group_groupMember = { ...objBase };
    F_ITEMS.group_groupMember = {
        ...objBase, type: "collection",
        collectionlistType: "form",
        collectionCfForm: {
            col_span: 12,
            formItems: [

                {
                    label: "球队",
                    prop: "id",
                    type: "select",
                    ajax: {
                        url: "/crossList?page=tangball_team",
                        keyLabel: "name",
                        keyValue: "P1"
                    }
                },

            ]
        }
    };
}
//#region 球队id
{
    let objBase = {
        label: "编号",
        prop: "P1",
    }
    COLUMNS.team_P1 = { ...objBase, width: 70 }
    D_ITEMS.team_P1 = { ...objBase };
    F_ITEMS.team_P1 = { ...objBase, type: "input" };
}
//#region 球队队名
{
    let objBase = {
        label: "队名",
        prop: "name",
    }
    COLUMNS.team_name = { ...objBase, width: 100 }
    D_ITEMS.team_name = { ...objBase };
    F_ITEMS.team_name = { ...objBase, type: "input" };
}
//#region 球队创建人
{
    let objBase = {
        label: "创建人",
        prop: "createMemberId",
    }
    COLUMNS.team_createMemberId = {
        ...objBase, width: 120,
        formatter: (data) => {
            if (data.memberName) {
                return data.memberName.name
            }
        }
    }
    D_ITEMS.team_createMemberId = { ...objBase, slot: 'slot_detail_item_memberName' };
    F_ITEMS.team_createMemberId = {
        ...objBase, type: 'select',
        ajax: {
            url: "/crossList?page=tangball_member",
            keyLabel: "name",
            keyValue: "P1"
        },
    };
}
//#region 球队赛事
{
    let objBase = {
        label: "赛事",
        prop: "matchId",
    }
    COLUMNS.team_matchId = {
        ...objBase, width: 300,
        formatter: (data) => {
            if (data.matchName) {
                return data.matchName.matchName
            }
        }
    }
    D_ITEMS.team_matchId = { ...objBase, slot: 'slot_detail_item_matchName' };
    F_ITEMS.team_matchId = {
        ...objBase, type: 'select',
        ajax: {
            url: "/crossList?page=tangball_match",
            keyLabel: "matchName",
            keyValue: "P1"
        },
    };
}
//#region 球队订单id
{
    let objBase = {
        label: "订单id",
        prop: "orderId",
    }
    COLUMNS.team_orderId = { ...objBase, width: 200 }
    D_ITEMS.team_orderId = { ...objBase };
    F_ITEMS.team_orderId = { ...objBase, type: "input" };
}
//#region 球队成员列表
{
    let objBase = {
        label: "成员列表",
        prop: "member",
    }
    COLUMNS.team_member = { ...objBase, width: 200 }
    D_ITEMS.team_member = { ...objBase, slot: 'slot_detail_item_memberList' };
    F_ITEMS.team_member = {
        ...objBase, type: "collection",
        collectionlistType: "form",
        collectionCfForm: {
            col_span: 12,
            formItems: [
                {
                    label: "姓名",
                    prop: "name",

                },
                {
                    label: "性别",
                    prop: "sex",
                    type: 'radio',
                    options: [{ value: 1, label: '男' },
                    { value: 2, label: '女' }]
                },
                {
                    label: "手机号码",
                    prop: "phone"
                }
            ]
        }
    };
}
//#region 赛事赞助id
{
    let objBase = {
        label: "id",
        prop: "P1",
    }
    COLUMNS.sponsorship_P1 = { ...objBase, width: 60 }
    D_ITEMS.sponsorship_P1 = { ...objBase };
    F_ITEMS.sponsorship_P1 = { ...objBase, type: "input" };
}
//#region 赛事赞助赞助商
{
    let objBase = {
        label: "赞助商",
        prop: "sponsorId",
    }
    COLUMNS.sponsorship_sponsorId = {
        ...objBase, width: 130,
        formatter: function (row) {
            if (row.sponsor) {
                return row.sponsor.name ? row.sponsor.name : '无'
            }
        }
    }
    D_ITEMS.sponsorship_sponsorId = { ...objBase, slot: "slot_detail_item_sponsorId" };
    F_ITEMS.sponsorship_sponsorId = {
        ...objBase, type: "select",
        ajax: {
            url: "/crossList?page=tangball_sponsor",
            keyLabel: "name",
            keyValue: "P1"
        }
    };
}
//#region 赛事赞助赛事
{
    let objBase = {
        label: "赛事",
        prop: "matchId",
    }
    COLUMNS.sponsorship_matchId = {
        ...objBase, width: 300,
        formatter: function (row) {
            if (row.match) {
                return row.match.matchName ? row.match.matchName : '无'
            }
        }
    }
    D_ITEMS.sponsorship_matchId = { ...objBase, slot: "slot_detail_item_matchId" };
    F_ITEMS.sponsorship_matchId = {
        ...objBase, type: "select",
        ajax: {
            url: "/crossList?page=tangball_match",
            keyLabel: "matchName",
            keyValue: "P1"
        }
    };
}
//#region 赛事赞助赞助金额
{
    let objBase = {
        label: "赞助金额",
        prop: "amount",
    }
    COLUMNS.sponsorship_amount = { ...objBase, width: 100 }
    D_ITEMS.sponsorship_amount = { ...objBase };
    F_ITEMS.sponsorship_amount = { ...objBase, type: "input" };
}
//#region 赛事赞助赞助时间
{
    let objBase = {
        label: "赞助时间",
        prop: "time",
    }
    COLUMNS.sponsorship_time = {
        ...objBase, width: 160,
        formatter: function (row) {
            return moment(row.time).format("YYYY-MM-DD HH:DD");
        }
    }
    D_ITEMS.sponsorship_time = {
        ...objBase, formatter: function (row) {
            return moment(row.time).format("YYYY-MM-DD HH:DD");
        }
    };
    F_ITEMS.sponsorship_time = { ...objBase, type: "date" };
}
//#region 赛事赞助赞助时间
{
    let objBase = {
        label: "地点",
        prop: "place",
    }
    COLUMNS.sponsorship_place = { ...objBase, width: 110 }
    D_ITEMS.sponsorship_place = { ...objBase };
    F_ITEMS.sponsorship_place = { ...objBase, slot: "slot_place" };
}
//#region 赞助商编号
{
    let objBase = {
        label: "赞助商编号",
        prop: "P1",
    }
    COLUMNS.sponsor_P1 = { ...objBase, width: 120 }
    D_ITEMS.sponsor_P1 = { ...objBase };
    F_ITEMS.sponsor_P1 = { ...objBase, type: "input" };
}
//#region 赞助商名称
{
    let objBase = {
        label: "赞助商名称",
        prop: "name",
    }
    COLUMNS.sponsor_name = { ...objBase, width: 120 }
    D_ITEMS.sponsor_name = { ...objBase };
    F_ITEMS.sponsor_name = { ...objBase, type: "input" };
    F_ITEMS.sponsor_search_name = { ...objBase, type: "input_find_vague" };
}
//#region 赞助商赞助次数
{
    let objBase = {
        label: "赞助次数",
        prop: "count",
    }
    COLUMNS.sponsor_count = { ...objBase, width: 120 }
    D_ITEMS.sponsor_count = { ...objBase };
    F_ITEMS.sponsor_count = { ...objBase, type: "input" };
}
//#region 赞助商赞助金额
{
    let objBase = {
        label: "赞助金额（单位：万元）",
        prop: "money",
    }
    COLUMNS.sponsor_money = { ...objBase, width: 200 }
    D_ITEMS.sponsor_money = { ...objBase };
    F_ITEMS.sponsor_money = { ...objBase, type: "input" };
}
//#region 赞助商简介
{
    let objBase = {
        label: "赞助商简介",
        prop: "intro",
    }
    COLUMNS.sponsor_intro = { ...objBase, width: 400 }
    D_ITEMS.sponsor_intro = { ...objBase };
    F_ITEMS.sponsor_intro = { ...objBase, type: "textarea" };
}
//#region 规则库id
{
    let objBase = {
        label: "编号",
        prop: "P1",
    }
    COLUMNS.rule_P1 = { ...objBase, width: 70 }
    D_ITEMS.rule_P1 = { ...objBase };
    F_ITEMS.rule_P1 = { ...objBase, type: "input" };
}
//#region 规则库规则名
{
    let objBase = {
        label: "规则名",
        prop: "name",
    }
    COLUMNS.rule_name = { ...objBase, width: 250 }
    D_ITEMS.rule_name = { ...objBase };
    F_ITEMS.rule_name = { ...objBase, type: "input" };
}
//#region 规则库简介
{
    let objBase = {
        label: "简介",
        prop: "remark",
    }
    COLUMNS.rule_remark = { ...objBase, width: 400 }
    D_ITEMS.rule_remark = { ...objBase };
    F_ITEMS.rule_remark = { ...objBase, type: "textarea" };
}
//#region 消息已读记录id
{
    let objBase = {
        label: "Id",
        prop: "P1",
    }
    COLUMNS.msg_read_P1 = { ...objBase, width: 60 }
    D_ITEMS.msg_read_P1 = { ...objBase };
    F_ITEMS.msg_read_P1 = { ...objBase, type: "input" };
}
//#region 消息已读记录id
{
    let objBase = {
        label: "会员id ",
        prop: "memberId",
    }
    COLUMNS.msg_read_memberId = {
        ...objBase, width: 150,
        slot: "slot_column_memberId"
    }
    D_ITEMS.msg_read_memberId = { ...objBase, slot: "slot_column_memberId" };
    F_ITEMS.msg_read_memberId = { ...objBase, type: "input" };
}
//#region 消息已读记录对应消息id
{
    let objBase = {
        label: "消息id",
        prop: "msgId",
    }
    COLUMNS.msg_read_msgId = {
        ...objBase, wiwidth: 200,
        slot: "slot_column_msgId"
    }
    D_ITEMS.msg_read_msgId = { ...objBase, slot: "slot_column_msgId" };
    F_ITEMS.msg_read_msgId = {
        ...objBase, type: "select",
        ajax: {
            url: "/crossList?page=tangball_msg",
            keyLabel: "name",
            keyValue: "P1"
        }
    };
}
//#region 消息已阅读时间
{
    let objBase = {
        label: "阅读时间",
        prop: "readTime",
    }
    COLUMNS.msg_read_readTime = { ...objBase, width: 100 }
    D_ITEMS.msg_read_readTime = { ...objBase };
    F_ITEMS.msg_read_readTime = { ...objBase, type: "input" };
}
//#region 轮播图标题
{
    let objBase = {
        label: "标题",
        prop: "name",
    }
    COLUMNS.recommend_name = { ...objBase, width: 260 }
    D_ITEMS.recommend_name = { ...objBase };
    F_ITEMS.recommend_name = { ...objBase, type: "input" };
    F_ITEMS.recommend_search_name = { ...objBase, type: "input_find_vague" };
}
//#region 轮播图链接页面
{
    let objBase = {
        label: "链接页面",
        prop: "link",
    }
    COLUMNS.recommend_link = { ...objBase, width: 250 }
    D_ITEMS.recommend_link = { ...objBase };
    F_ITEMS.recommend_link = { ...objBase, type: "input" };
}
//#region 轮播图创建时间
{
    let objBase = {
        label: "创建时间",
        prop: "CreateTime",
    }
    COLUMNS.recommend_CreateTime = {
        ...objBase, width: 160,
        formatter: function (extend) {
            return moment(extend.CreateTime).format('YYYY-MM-DD HH:mm');
        }
    }
    D_ITEMS.recommend_CreateTime = { ...objBase };
    F_ITEMS.recommend_CreateTime = { ...objBase, type: "input" };
}
//#region 轮播图相册
{
    let objBase = {
        label: "相册",
        prop: "album",
    }
    COLUMNS.recommend_album = { ...objBase, width: 160 }
    D_ITEMS.recommend_album = { ...objBase, slot: "slot_detail_item_album" };
    F_ITEMS.recommend_album = { ...objBase, type: "upload" };
}

//#region 轮播图其他数据
{
    let objBase = {
        label: "其他",
        prop: "extend",
    }
    COLUMNS.recommend_extend = {
        ...objBase, width: 200,
        formatter: function (extend) {
            return JSON.stringify(extend.extend);
        }
    }
    D_ITEMS.recommend_extend = { ...objBase };
    F_ITEMS.recommend_extend = { ...objBase, type: "input" };
}
//#region 消息id
{
    let objBase = {
        label: "Id",
        prop: "P1",
    }
    COLUMNS.msg_P1 = { ...objBase, width: 60 }
    D_ITEMS.msg_P1 = { ...objBase };
    F_ITEMS.msg_P1 = { ...objBase, type: "input" };
}
//#region 消息标题
{
    let objBase = {
        label: "消息标题",
        prop: "name",
    }
    COLUMNS.msg_name = { ...objBase, width: 200 }
    D_ITEMS.msg_name = { ...objBase };
    F_ITEMS.msg_name = { ...objBase, type: "input" };
    F_ITEMS.msg_search_name = { ...objBase, type: "input_find_vague" };
}
//#region 消息内容
{
    let objBase = {
        label: "消息内容",
        prop: "detail"
    }
    COLUMNS.msg_detail = { ...objBase, width: 60 }
    D_ITEMS.msg_detail = { ...objBase };
    F_ITEMS.msg_detail = { ...objBase, type: "textarea" };
}
//#region 消息范围
{
    let objBase = {
        label: "消息范围",
        prop: "range",
    }
    COLUMNS.msg_range = {
        ...objBase, width: 90,
        formatter: function (rowData) {
            if (rowData.range == 1) {
                return "全部会员";
            } else if (rowData.range == 2) {
                return "指定会员";
            }
        }
    }
    D_ITEMS.msg_range = {
        ...objBase, formatter: function (rowData) {
            if (rowData.range == 1) {
                return "全部会员";
            } else if (rowData.range == 2) {
                return "指定会员";
            }
        }
    };
    F_ITEMS.msg_range = {
        ...objBase, type: "select",
        default: 1,
        options: [
            { value: 1, label: "全部会员" },
            { value: 2, label: "指定会员" }
        ]
    };
}
//#region 消息指定会员
{
    let objBase = {
        label: "指定会员",
        prop: "memberIdList",
    }
    COLUMNS.msg_memberIdList = {
        ...objBase, width: 200,
        formatter: function (data) {
            if (data.member) {
                let nameList = []
                data.member.forEach(item => {
                    if (item) {
                        if (item.name) {
                            nameList.push(item.name)
                        }
                    }

                })
                return nameList.join(" ")
                // return data.member.length
            }
        }
    }
    D_ITEMS.msg_memberIdList = { ...objBase };
    F_ITEMS.msg_memberIdList = {
        ...objBase, type: "jsonEditor",
        slot: "slot_form_item_memberIdList", term: { range: 2 },
    };
}
//#region 消息发布状态
{
    let objBase = {
        label: "发布状态",
        prop: "publish",
    }
    COLUMNS.msg_publish = {
        ...objBase, width: 90,
        formatter: function (rowData) {
            if (rowData.range == 0) {
                return "不发布";
            } else if (rowData.range == 1) {
                return "发布";
            }
        }
    }
    D_ITEMS.msg_publish = {
        ...objBase, formatter: function (rowData) {
            if (rowData.range == 0) {
                return "不发布";
            } else if (rowData.range == 1) {
                return "发布";
            }
        }
    };
    F_ITEMS.msg_publish = {
        ...objBase, type: "select",
        default: 1,
        options: [
            { value: 1, label: "发布" },
            { value: 0, label: "不发布" }
        ]
    };
}
//#region 消息发布时间
{
    let objBase = {
        label: "发布时间",
        prop: "publishTime",
    }
    COLUMNS.msg_publishTime = {
        ...objBase, width: 160,
        formatter: function (row) {
            return moment(row.publishTime).format("YYYY-MM-DD HH:DD");
        }
    }
    D_ITEMS.msg_publishTime = { ...objBase };
    F_ITEMS.msg_publishTime = { ...objBase, type: "dateTime" };
}
//#region 消息其他内容
{
    let objBase = {
        label: "其他内容",
        prop: "extend",
    }
    COLUMNS.msg_extend = { ...objBase, width: 60 }
    D_ITEMS.msg_extend = { ...objBase };
    F_ITEMS.msg_extend = { ...objBase, type: "input" };
}
//#region 消息其他内容
{
    let objBase = {
        label: "其他内容",
        prop: "extend",
    }
    COLUMNS.msg_extend = { ...objBase, width: 60 }
    D_ITEMS.msg_extend = { ...objBase };
    F_ITEMS.msg_extend = { ...objBase, type: "input" };
}
//#region 消息备注2
{
    let objBase = {
        label: "备注2",
        prop: "remark",
    }
    D_ITEMS.msg_remark = {
        ...objBase,
    };
    COLUMNS.msg_remark = { ...objBase, width: 70, };
    F_ITEMS.msg_remark = { ...objBase, type: "input" };
}
//#权限数据方法
function getFormMenuGPower({ menuName = "XXX" }) {


    return {
        col_span: 4,
        labelWidth: "10px",
        formItems: [
            {
                label: "",
                prop: "menuName",
                default: menuName,
                col_span: 4,
                type: "text"
            },
            {
                label: "",
                prop: "add",
                col_span: 3,
                type: "checkbox",
                default: false,
                options: [{ value: "1", label: "添加" }]
            },
            {
                label: "",
                prop: "modify",
                col_span: 3,
                type: "checkbox",
                default: false,
                options: [{ value: "1", label: "修改" }]
            },
            {
                label: "",
                prop: "search",
                col_span: 3,
                type: "checkbox",
                default: false,
                options: [{ value: "1", label: "查询" }]
            },
            {
                label: "",
                prop: "delete",
                col_span: 3,
                type: "checkbox",
                default: false,
                options: [{ value: "1", label: "删除" }]
            }
        ]
    };
}

let styleMenuPowerItem = `margin-bottom:10px;padding:0 5px`;
let styleMenuGPowerItem = `margin-bottom:0;border:none;padding:0`;
//   权限角色名
F_ITEMS.role_name = {
    label: "角色名",
    prop: "name",
    type: "input"
}
//   权限
F_ITEMS.role_power = {
    label: "权限",

    prop: "power",
    default: {},
    cfForm: {
        labelWidth: "150px",
        formItems: [
            {
                label: "赛事中心",
                prop: "matchCenter",
                style: styleMenuGPowerItem,
                default: {},
                cfForm: {
                    col_span: 12,
                    formItems: [
                        {
                            // label: "赛事列表",
                            prop: "list_match",
                            style: styleMenuPowerItem,
                            cfForm: getFormMenuGPower({ menuName: "赛事列表" })
                        },
                        {
                            // label: "成绩列表",
                            prop: "list_achievement",
                            style: styleMenuPowerItem,
                            cfForm: getFormMenuGPower({ menuName: "成绩列表" })
                        },
                        {
                            prop: "list_enroll",
                            style: styleMenuPowerItem,
                            cfForm: getFormMenuGPower({ menuName: "报名列表" })
                        },
                        {
                            prop: "list_rule",
                            style: styleMenuPowerItem,
                            cfForm: getFormMenuGPower({ menuName: "规则库" })
                        },
                        {
                            prop: "list_team",
                            style: styleMenuPowerItem,
                            cfForm: getFormMenuGPower({ menuName: "球队" })
                        },
                        {
                            prop: "list_group",
                            style: styleMenuPowerItem,
                            cfForm: getFormMenuGPower({ menuName: "对阵分组" })
                        }
                    ]
                }
            },
            {
                label: "球员信息库",
                prop: "memberCenter",
                style: styleMenuGPowerItem,
                default: {},
                cfForm: {
                    col_span: 12,
                    formItems: [
                        {
                            // label: "资讯列表",
                            prop: "list_member",
                            style: styleMenuPowerItem,
                            cfForm: getFormMenuGPower({ menuName: "球员" })
                        }
                    ]
                }
            },
            {
                label: "唐球场",
                prop: "venue",
                style: styleMenuGPowerItem,
                default: {},
                cfForm: {
                    col_span: 12,
                    formItems: [
                        {

                            prop: "list_venue",
                            style: styleMenuPowerItem,
                            cfForm: getFormMenuGPower({ menuName: "唐球场" })
                        },
                        {

                            prop: "list_franchisee",
                            style: styleMenuPowerItem,
                            cfForm: getFormMenuGPower({ menuName: "加盟商" })
                        },
                        {

                            prop: "list_area",
                            style: styleMenuPowerItem,
                            cfForm: getFormMenuGPower({ menuName: "地区管理" })
                        }
                    ]
                }
            },
            {
                label: "资讯中心",
                prop: "newsCenter",
                style: styleMenuGPowerItem,
                default: {},
                cfForm: {
                    col_span: 12,
                    formItems: [
                        {
                            // label: "资讯列表",
                            prop: "list_article",
                            style: styleMenuPowerItem,
                            cfForm: getFormMenuGPower({ menuName: "资讯列表" })
                        },
                        {
                            // label: "资讯分类",
                            prop: "list_article_category",
                            style: styleMenuPowerItem,
                            cfForm: getFormMenuGPower({ menuName: "资讯分类" })
                        },
                        {

                            prop: "list_recommend",
                            style: styleMenuPowerItem,
                            cfForm: getFormMenuGPower({ menuName: "首页轮播图" })
                        },
                        {

                            prop: "home_page_title",
                            style: styleMenuPowerItem,
                            cfForm: {
                                col_span: 4,
                                labelWidth: "10px",
                                formItems: [
                                    {
                                        label: "",
                                        prop: "menuName",
                                        default: "首页推荐内容",
                                        col_span: 4,
                                        type: "text"
                                    },

                                    {
                                        label: "",
                                        prop: "search",
                                        col_span: 3,
                                        type: "checkbox",
                                        default: false,
                                        options: [{ value: "1", label: "操作" }]
                                    }
                                ]
                            }
                        }
                    ]
                }
            },
            {
                label: "招商管理",
                prop: "sponsorCenter",
                style: styleMenuGPowerItem,
                default: {},
                cfForm: {
                    col_span: 12,
                    formItems: [
                        {
                            prop: "list_sponsor",
                            style: styleMenuPowerItem,
                            cfForm: getFormMenuGPower({ menuName: "赞助商" })
                        },
                        {
                            prop: "list_sponsorship",
                            style: styleMenuPowerItem,
                            cfForm: getFormMenuGPower({ menuName: "赛事赞助" })
                        }
                    ]
                }
            },
            {
                label: "系统消息",
                prop: "msgCenter",
                style: styleMenuGPowerItem,
                default: {},
                cfForm: {
                    col_span: 12,
                    formItems: [
                        {
                            prop: "list_msg",
                            style: styleMenuPowerItem,
                            cfForm: getFormMenuGPower({ menuName: "消息列表" })
                        },
                        {
                            prop: "list_msg_read",
                            style: styleMenuPowerItem,
                            cfForm: getFormMenuGPower({ menuName: "消息已读记录" })
                        }
                    ]
                }
            },
            {
                label: "系统管理",
                prop: "systemManage",
                style: styleMenuGPowerItem,
                default: {},
                cfForm: {
                    col_span: 12,
                    formItems: [
                        {
                            prop: "list_admin",
                            style: styleMenuPowerItem,
                            cfForm: getFormMenuGPower({ menuName: "管理员" })
                        },
                        {
                            prop: "list_role",
                            style: styleMenuPowerItem,
                            cfForm: getFormMenuGPower({ menuName: "角色" })
                        }
                    ]
                }
            }
        ]
    }
}
D_ITEMS.roleName = {
    label: "角色名",
    prop: "name"
}
D_ITEMS.rolePower = {
    label: "权限",
    prop: "power"
}
//#region 赛事报名表配置
{
    let objBase = {
        label: "报名球员",
        prop: "memberId",
    }
    COLUMNS.macth_enrool_memberId = {
        ...objBase,
        width: 80,
        formatter: function (rowData) {
            if (rowData.memberName) {
                return rowData.memberName.name;
            }
        }
    };
    D_ITEMS.macth_enrool_memberId = { ...objBase, width: 70, slot: "slot_detail_item_memberId" };
    F_ITEMS.macth_enrool_memberId = { ...objBase, type: "input" };
}
//#region 赛事报名表赛事id
{
    let objBase = {
        label: "赛事id",
        prop: "matchId",
    }
    COLUMNS.macth_enrool_matchId = {
        ...objBase,
        width: 80,
    };
    D_ITEMS.macth_enrool_matchId = { ...objBase, slot: "slot_detail_item_matchId" };
    F_ITEMS.macth_enrool_matchId = { ...objBase, type: "input" };
}
//#region 赛事报名表队伍信息
{
    let objBase = {
        label: "球队名称",
        prop: "team",
    }
    COLUMNS.macth_enrool_team = {
        label: "队长",
        prop: "orderId",
        slot: "slot_detail_item_teamName",
        width: 250
    };
    D_ITEMS.macth_enrool_team = { ...objBase, slot: 'slot_detail_item_groups' };
    F_ITEMS.macth_enrool_team = { ...objBase, type: "input" };
}
//#region 赛事报名表队伍信息
{
    let objBase = {
        label: "队伍信息",
        prop: "orderId",
    }
    COLUMNS.macth_enrool_groups_orderId = {
        label: "队长",
        prop: "orderId",
        width: 130,
        formatter: function (rowData) {
            if (rowData.teamDoc) {
                return rowData.teamDoc.member[0].name || "无"
            }
        }
    };
    D_ITEMS.macth_enrool_groups_orderId = { ...objBase, slot: 'slot_detail_item_groups' };
    F_ITEMS.macth_enrool_groups_orderId = { ...objBase, type: "input" };
}
//#region 赛事报名表手机号
{
    let objBase = {
        label: "手机号",
        prop: "phone",
    }
    COLUMNS.macth_enrool_phone = {
        ...objBase,
        width: 130,
        formatter: function (rowData) {
            if (rowData.memberName) {
                return rowData.memberName.phone
            }
        }
    };
    D_ITEMS.macth_enrool_phone = { ...objBase, width: 70, };
    F_ITEMS.macth_enrool_phone = { ...objBase, type: "input" };
}
//#region 赛事报名表性别
{
    let objBase = {
        label: "性别",
        prop: "sex",
    }
    COLUMNS.macth_enrool_sex = {
        ...objBase,
        width: 65,
        formatter: function (rowData) {
            if (rowData.memberName) {
                if (rowData.memberName.sex == 1) {
                    return "男";
                } else {
                    return "女";
                }
            }
        }
    };
    D_ITEMS.macth_enrool_sex = {
        ...objBase, width: 70, formatter: function (rowData) {
            if (rowData.sex == 1) {
                return "男";
            } else {
                return "女";
            }
        }
    };
    F_ITEMS.macth_enrool_sex = { ...objBase, type: "input" };
}
//#region 赛事报名表年龄
{
    let objBase = {
        label: "年龄",
        prop: "age",
    }
    COLUMNS.macth_enrool_age = {
        ...objBase,
        width: 65,
        formatter: function (rowData) {
            if (rowData.memberName) {
                return rowData.memberName.age
            }
        }
    };
    D_ITEMS.macth_enrool_age = { ...objBase, width: 70, };
    F_ITEMS.macth_enrool_age = { ...objBase, type: "input" };
}
//#region 赛事报名表职业
{
    let objBase = {
        label: "职业",
        prop: "career",
    }
    COLUMNS.macth_enrool_career = {
        ...objBase,
        width: 65
    };
    D_ITEMS.macth_enrool_career = { ...objBase };
    F_ITEMS.macth_enrool_career = { ...objBase, type: "input" };
}
//#region 赛事报名表球龄
{
    let objBase = {
        label: "球龄",
        prop: "ballAge",
    }
    COLUMNS.macth_enrool_ballAge = {
        ...objBase,
        width: 65
    };
    D_ITEMS.macth_enrool_ballAge = {
        ...objBase, formatter: function (rowData) {
            if (rowData.ballAge == 1) {
                return "一年以下";
            } else if (rowData.ballAge == 2) {
                return "一到三年";
            } else if (rowData.ballAge == 3) {
                return "三到五年";
            } else if (rowData.ballAge == 4) {
                return "五到十年";
            } else {
                return "十年以上";
            }
        }
    };
    F_ITEMS.macth_enrool_ballAge = { ...objBase, type: "input" };
}
//#region 赛事报名表身份证号
{
    let objBase = {
        label: "身份证号",
        prop: "idCard"
    }
    COLUMNS.macth_enrool_idCard = {
        ...objBase,
        width: 65
    };
    D_ITEMS.macth_enrool_idCard = { ...objBase };
    F_ITEMS.macth_enrool_idCard = { ...objBase, type: "input" };
}
//#region 赛事报名表报名时间
{
    let objBase = {
        label: "报名时间",
        prop: "time",
    }
    COLUMNS.macth_enrool_time = {
        ...objBase,
        width: 180,
        formatter: function (rowData) {
            return moment(rowData.time).format("YYYY-MM-DD HH:mm");
        }
    };
    D_ITEMS.macth_enrool_time = { ...objBase, width: 70, };
    F_ITEMS.macth_enrool_time = { ...objBase, type: "input" };
}
//#region 赛事报名表报名赛事信息
{
    let objBase = {
        label: "赛事信息",
        prop: "cityVenueId",
    }
    COLUMNS.macth_enrool_cityVenueId = {
        ...objBase,
    };
    D_ITEMS.macth_enrool_cityVenueId = { ...objBase, slot: 'slot_detail_item_matchInfo' };
    F_ITEMS.macth_enrool_cityVenueId = { ...objBase, type: "input" };
}
//#region 赛事报名表支付状态
{
    let objBase = {
        label: "支付状态",
        prop: "payStatus",
    }
    COLUMNS.macth_enrool_payStatus = {
        ...objBase,
        width: 120,
        formatter: function (rowData) {
            if (rowData.payStatus == 2) {
                return "已支付";
            } else {
                return "未支付";
            }
        }
    };
    D_ITEMS.macth_enrool_payStatus = {
        ...objBase, formatter: function (rowData) {
            if (rowData.payStatus == 2) {
                return "已支付";
            } else {
                return "未支付";
            }
        }
    };
    F_ITEMS.macth_enrool_payStatus = { ...objBase, type: "input" };
}
//#region 赛事报名表审核状态
{
    let objBase = {
        label: "审核状态",
        prop: "auditStatus",
    }
    COLUMNS.macth_enrool_auditStatus = {
        ...objBase,
        "min-width": "100",
        formatter: function (rowData) {
            if (rowData.auditStatus == 1) {
                return "未审核";
            } else if (rowData.auditStatus == 2) {
                return "审核不通过";
            } else {
                return "审核通过";
            }
        }
    };
    D_ITEMS.macth_enrool_auditStatus = {
        ...objBase, formatter: function (rowData) {
            if (rowData.auditStatus == 1) {
                return "未审核";
            } else if (rowData.auditStatus == 2) {
                return "审核不通过";
            } else {
                return "审核通过";
            }
        }
    };
    F_ITEMS.macth_enrool_auditStatus = { ...objBase, type: "input" };
}


//#region 0000
{
    let objBase = {
        label: "0000",
        prop: "aaaa",
    }
    D_ITEMS.aaaa = {
        ...objBase,
    };
    COLUMNS.aaaa = { ...objBase, width: 70, };
    F_ITEMS.aaaa = { ...objBase, type: "input" };
}


//#region 0000
{
    let objBase = {
        label: "0000",
        prop: "aaaa",
    }
    D_ITEMS.aaaa = {
        ...objBase,
    };
    COLUMNS.aaaa = { ...objBase, width: 70, };
    F_ITEMS.aaaa = { ...objBase, type: "input" };
}
//#endregion


//#region 0000
{
    let objBase = {
        label: "0000",
        prop: "aaaa",
    }
    D_ITEMS.aaaa = {
        ...objBase,
    };
    COLUMNS.aaaa = { ...objBase, width: 70, };
    F_ITEMS.aaaa = { ...objBase, type: "input" };
}


//#region 0000
{
    let objBase = {
        label: "0000",
        prop: "aaaa",
    }
    D_ITEMS.aaaa = {
        ...objBase,
    };
    COLUMNS.aaaa = { ...objBase, width: 70, };
    F_ITEMS.aaaa = { ...objBase, type: "input" };
}


//#region 0000
{
    let objBase = {
        label: "0000",
        prop: "aaaa",
    }
    D_ITEMS.aaaa = {
        ...objBase,
    };
    COLUMNS.aaaa = { ...objBase, width: 70, };
    F_ITEMS.aaaa = { ...objBase, type: "input" };
}
//#endregion


//#region 0000
{
    let objBase = {
        label: "0000",
        prop: "aaaa",
    }
    D_ITEMS.aaaa = {
        ...objBase,
    };
    COLUMNS.aaaa = { ...objBase, width: 70, };
    F_ITEMS.aaaa = { ...objBase, type: "input" };
}


//#region 0000
{
    let objBase = {
        label: "0000",
        prop: "aaaa",
    }
    D_ITEMS.aaaa = {
        ...objBase,
    };
    COLUMNS.aaaa = { ...objBase, width: 70, };
    F_ITEMS.aaaa = { ...objBase, type: "input" };
}


//#region 0000
{
    let objBase = {
        label: "0000",
        prop: "aaaa",
    }
    D_ITEMS.aaaa = {
        ...objBase,
    };
    COLUMNS.aaaa = { ...objBase, width: 70, };
    F_ITEMS.aaaa = { ...objBase, type: "input" };
}
//#endregion


//#region 0000
{
    let objBase = {
        label: "0000",
        prop: "aaaa",
    }
    D_ITEMS.aaaa = {
        ...objBase,
    };
    COLUMNS.aaaa = { ...objBase, width: 70, };
    F_ITEMS.aaaa = { ...objBase, type: "input" };
}


//#region 0000
{
    let objBase = {
        label: "0000",
        prop: "aaaa",
    }
    D_ITEMS.aaaa = {
        ...objBase,
    };
    COLUMNS.aaaa = { ...objBase, width: 70, };
    F_ITEMS.aaaa = { ...objBase, type: "input" };
}


//#region 0000
{
    let objBase = {
        label: "0000",
        prop: "aaaa",
    }
    D_ITEMS.aaaa = {
        ...objBase,
    };
    COLUMNS.aaaa = { ...objBase, width: 70, };
    F_ITEMS.aaaa = { ...objBase, type: "input" };
}
//#endregion


//#region 0000
{
    let objBase = {
        label: "0000",
        prop: "aaaa",
    }
    D_ITEMS.aaaa = {
        ...objBase,
    };
    COLUMNS.aaaa = { ...objBase, width: 70, };
    F_ITEMS.aaaa = { ...objBase, type: "input" };
}


//#region 0000
{
    let objBase = {
        label: "0000",
        prop: "aaaa",
    }
    D_ITEMS.aaaa = {
        ...objBase,
    };
    COLUMNS.aaaa = { ...objBase, width: 70, };
    F_ITEMS.aaaa = { ...objBase, type: "input" };
}


//#region 0000
{
    let objBase = {
        label: "0000",
        prop: "aaaa",
    }
    D_ITEMS.aaaa = {
        ...objBase,
    };
    COLUMNS.aaaa = { ...objBase, width: 70, };
    F_ITEMS.aaaa = { ...objBase, type: "input" };
}
//#endregion
//#endregion

