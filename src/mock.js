import Mock from 'mockjs'

const Random = Mock.Random



// 用户数据
const userData = () => {
  
  return {a:1}
}
Mock.mock('/api/users', userData)


Mock.mock('/articleList', function(){
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

Mock.mock('/textCategory', function(){
  let textCategoryList =[
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
  return textCategoryList

})