import tangball_member_for_select from "./tangball_member_for_select.js"
console.log("tangball_member_for_select:##############", tangball_member_for_select);

let obj = {
  columns: [
    "macth_enrool_memberId","macth_enrool_phone","macth_enrool_sex","macth_enrool_age","macth_enrool_time",
    "macth_enrool_payStatus","macth_enrool_auditStatus"
  ],
  detailItems: [
    "macth_enrool_memberId","macth_enrool_matchId","macth_enrool_phone","macth_enrool_sex","macth_enrool_age","macth_enrool_career",
    "macth_enrool_ballAge","macth_enrool_idCard","macth_enrool_time","macth_enrool_cityVenueId",
    "macth_enrool_payStatus","macth_enrool_auditStatus",
  ],
  searchFormItems: [],
  formItems:["memberId","time","matchInfo","payStatus","auditStatus"],
}

util.reformCFListItem(obj)

export default obj