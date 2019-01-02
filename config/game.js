// 菜单栏的加载 ，一个页面对应一个组建
const menu = [
    {
      alias:'营运数据',
      name:'gameData',
      icon:'ios-apps-outline',
      subMeun:[
        {alias:'数据图表',name:'',addr:'/data/form'},
        {alias:'统计数据',name:'',addr:'/data/countUp'},
        {alias:'注册付费',name:'',addr:'/data/game'},
        {alias:'平台数据',name:'',addr:'/data/plat'},
        {alias:'渠道数据',name:'',addr:'/data/channel'},
        {alias:'登录ARPU',name:'',addr:'/data/login'},
        {alias:'营收数据',name:'',addr:'/data/takein'},
        {alias:'在线人数',name:'',addr:'/data/online'},
        {alias:'留存分析',name:'',addr:'/data/level'},
        {alias:'激活分析',name:'',addr:'/data/activite'},
      ]
    },
    
    {
      alias:'玩家分析',
      name:'palyerParse',
      icon:'md-contact',
      subMeun:[
        {alias:'登录等级',name:'',addr:'/player/form'},
        {alias:'注册等级',name:'',addr:'/player/countUp'},
        {alias:'在线分析',name:'',addr:'/player/registerPay'},
        {alias:'在线时长',name:'',addr:'/player/registerPay'},
        {alias:'流失分析',name:'',addr:'/player/registerPay'},
        {alias:'任务退出',name:'',addr:'/player/registerPay'},
      ]
    
    },
  {
    alias:'充值分析',
    name:'payParse',
    icon:'logo-yen',
    subMeun:[
      {alias:'充值总览',name:'',addr:'/recharge/form'},
      {alias:'付费率',name:'',addr:'/recharge/countUp'},
      {alias:'充值分布',name:'',addr:'/recharge/registerPay'},
      {alias:'登录ARPU',name:'',addr:'/recharge/registerPay'},
      {alias:'首充分析',name:'',addr:'/recharge/registerPay'},
      {alias:'单笔充值',name:'',addr:'/recharge/registerPay'},
      {alias:'充值区间',name:'',addr:'/recharge/registerPay'},
      {alias:'玩家流失',name:'',addr:'/recharge/registerPay'},
    ]
  },
  {
    alias:'物品货币',
    name:'itemParse',
    icon:'ios-basketball',
    subMeun:[
      {alias:'商城分析',name:'',addr:'/item/form'},
      {alias:'物品统计',name:'',addr:'/item/countUp'},
      {alias:'货币消耗',name:'',addr:'/item/registerPay'},
    ]
  },
  {
    alias:'详细日志',
    name:'logDetail',
    icon:'ios-list-box-outline',
    subMeun:[
      {alias:'充值日志',name:'',addr:'/detail/form'},
      {alias:'物品日志',name:'',addr:'/detail/countUp'},
      {alias:'货币日志',name:'',addr:'/detail/registerPay'},
    ]
  },
  {
    alias:'系统设置',
    name:'systemSet',
    icon:'ios-cog-outline',
    subMeun:[
      {alias:'选择项目',name:'',addr:'/sys/form'},
      {alias:'日志翻译',name:'',addr:'/sys/countUp'},
      {alias:'退出登录',name:'',addr:'/sys/logout'},
    ]
  },
  {
    alias:'测试数据1',
    name:'testdata',
    icon:'ios-cog-outline',
    subMeun:[
      {alias:'测试1',name:'',addr:'/test/one'},
      {alias:'测试2',name:'',addr:'/test/two'},
    ]
  },
  
] ;
// 域名的加载
const main = {
  url:(function () {
    if( process.env.NODE_ENV === 'development') {
      return 'http://data.apidev.fengbaogame.cn/api/v1/';
    }
    return 'http://data.api.fengbaogame.cn'
  })(),
};

export {
  menu,main
};
