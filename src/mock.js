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
//文章分类接口
Mock.mock('/listArticleCategory', function(){

  let textCategoryList ={
      code:0,
      message:"操作成功",
      page:{
      pageIndex: 1,
      pageSize: 3,
      allCount: 1,
      pageCount: 1
      },
    list:[
    {P1:1,name:"唐球规则",explin:"关于唐球的各项规则说明",articleNumber:"3",
    article:[{title:"文章分类唐球规则下的文章一",text:"这是一篇文章"},
    {title:"文章分类唐球规则下的文章二",text:"这是一篇文章"},
    {title:"文章分类唐球规则下的文章三",text:"这是一篇文章"},]},
    {P1:2,name:"比赛说明",explin:"关于唐球比赛的各项规则说明",articleNumber:"3",
    article:[{title:"文章分类比赛说明下的文章一",text:"这是一篇文章"},
    {title:"文章分类比赛说明下的文章二",text:"这是一篇文章"},
    {title:"文章分类比赛说明下的文章三",text:"这是一篇文章"},]},
    {P1:3,name:"推广赞助",explin:"关于唐球的推广赞助的说明",articleNumber:"3",
    article:[{title:"文章分类推广赞助下的文章一",text:"这是一篇文章"},
    {title:"文章分类推广赞助下的文章二",text:"这是一篇文章"},
    {title:"文章分类推广赞助下的文章三",text:"这是一篇文章"},]},
  ]
  }
  
  return textCategoryList

})
Mock.mock('/list_sponsor',function(){
  let sponsor=[
    {P1:1,name:"蔡徐坤",money:"一亿粉丝",intro:"大家好，我是练习时长两年半的偶像练习生，蔡徐坤，擅长唱跳rap和篮球，来音乐起！鸡你太美！！！"},
    {P1:2,name:"面筋哥",money:"一顿烤面筋",intro:"烤面筋，烤面筋~~我的烤面筋！让你吃得每天都开心~烤面筋，烤面筋~~"},
    {P1:3,name:"局座",money:"一艘舰艇",intro:"判断一个舰艇好坏，很重要的一点是，你一眼看过去，好看不好看，要是你看的不顺眼，那丑，八成没多大战斗力。"},
    {P1:4,name:"王境泽",money:"一碗炒饭",intro:"我王境泽就是饿死，死外边，从这跳下去，也不会吃你们一点儿东西。真香"},
    {P1:5,name:"金坷垃三人组",money:"一袋金坷垃",intro:"肥料掺了金坷垃，一袋能顶两袋撒！肥料掺了金坷垃，小麦亩产一千八！美国·圣地亚戈 American Santiago（阿妹你看，上帝压狗）"},
  ]
  return sponsor
})
