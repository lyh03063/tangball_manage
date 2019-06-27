import Mock from 'mockjs'

const Random = Mock.Random



// 用户数据
const userData = () => {

  return { a: 1 }
}
Mock.mock('/api/users', userData)


Mock.mock('/articleList', function () {
  let articleList = [
    {
      P1: 1, articleTitle: "关于唐球的各项规则说明", articleContent: "这是一篇文章", articleCategory: 3,
    },
    {
      P1: 2, articleTitle: "关于唐球比赛的各项规则说明", articleContent: "这是一篇文章", articleCategory: 2,
    },
    {
      P1: 3, articleTitle: "关于唐球的推广赞助的说明", articleContent: "这是一篇文章", articleCategory: 1,
    },
  ]
  return articleList
})

Mock.mock('/textCategory', function () {
  let textCategoryList = [
    {
      P1: 1, name: "唐球规则", explin: "关于唐球的各项规则说明", articleNumber: "3",
      article: [{ title: "文章分类唐球规则下的文章一", text: "这是一篇文章" },
      { title: "文章分类唐球规则下的文章二", text: "这是一篇文章" },
      { title: "文章分类唐球规则下的文章三", text: "这是一篇文章" },]
    },
    {
      P1: 2, name: "比赛说明", explin: "关于唐球比赛的各项规则说明", articleNumber: "3",
      article: [{ title: "文章分类比赛说明下的文章一", text: "这是一篇文章" },
      { title: "文章分类比赛说明下的文章二", text: "这是一篇文章" },
      { title: "文章分类比赛说明下的文章三", text: "这是一篇文章" },]
    },
    {
      P1: 3, name: "推广赞助", explin: "关于唐球的推广赞助的说明", articleNumber: "3",
      article: [{ title: "文章分类推广赞助下的文章一", text: "这是一篇文章" },
      { title: "文章分类推广赞助下的文章二", text: "这是一篇文章" },
      { title: "文章分类推广赞助下的文章三", text: "这是一篇文章" },]
    },
  ]
  return textCategoryList

})

// 报名（订单）接口
Mock.mock('/list_enroll', function () {
  let list_enroll =
  {
    "code": 0,
    "message": "操作成功",
    "page": {
      "pageIndex": 1,
      "pageSize": 5,
      "allCount": 1,
      "pageCount": 1
    },
    "list": [
      {
        "P1": "1",
        "memberId ": "12",
        "matchId": "22",
        "idCard": "441521200003331151",
        "time": "2019-06-26",
        "payStatus": 1,
        "auditStatus ": 3
      },
      {
        "P1": "2",
        "memberId ": "13",
        "matchId": "21",
        "idCard": "441521200003331152 ",
        "time": "2019-06-26",
        "payStatus": 1,
        "auditStatus ": 2
      },
      {
        "P1": "3",
        "memberId ": "14",
        "matchId": "22",
        "idCard": "441521200003331153",
        "time": "2019-06-26",
        "payStatus": 2,
        "auditStatus ": 1
      }
    ]
  }

  return list_enroll

})