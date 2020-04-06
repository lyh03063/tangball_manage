let obj = {
  detailItems: [
    "macth_enrool_memberId","macth_enrool_groups_orderId","macth_enrool_time",
    "macth_enrool_cityVenueId","macth_enrool_payStatus","macth_enrool_auditStatus",
  ],
  columns: [
    "macth_enrool_team","macth_enrool_groups_orderId","macth_enrool_time","macth_enrool_payStatus","macth_enrool_auditStatus",
  ],
  searchFormItems: [],
  formItems: [
    "groups","time","matchInfo","payStatus","auditStatus"
  ]
}

util.reformCFListItem(obj)

export default obj