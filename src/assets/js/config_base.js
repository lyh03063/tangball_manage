
window.PUB = {}
//  PUB.domain = "http://localhost:3000"
PUB.domain = 'http://test.dmagic.cn'
//PUB.domain="http://e6234kn.hn3.mofasuidao.cn"//魔法隧道地址
// PUB.domain = "https://www.dmagic.cn"
PUB.urlUpload = `https://up-z2.qiniup.com`//七牛云上传地址（域名）
PUB.urlGetQiniuToken = `${PUB.domain}/api_third_part/get_qiniu_token?scope=tangball`


PUB.systemName = "唐球体育全国运营管理中心";
PUB.KeySys = "tangball";
// let _systemId = `sys_${PUB.KeySys}`;
// PUB._systemId = _systemId;
PUB.keyLoginUser = `${PUB.KeySys}_loginUserName`;
PUB.keyIsLogin = `${PUB.KeySys}_isLogin`;
PUB.keyRoleId = `${PUB.KeySys}_roleId`;
PUB.keyPower = `${PUB.KeySys}_power`;
PUB.userId = localStorage[PUB.keyLoginUser];

PUB.logoUrl = "";



import  "@/assets/js/config_column.js"
import  "@/assets/js/config_form.js"

// window.F_ITEMS = {};

// //调用：{处理字段数组的某个字段配置的函数}
// util.handelItem({ action: "replace", items: items, prop: prop, itemNew: {} })











//#region DYDICT:公共数据字典对象管理
window.DYDICT = {}//公共数据字典对象

DYDICT.aaa=1111;
DYDICT.aaa=1111;
DYDICT.aaa=1111;
DYDICT.aaa=1111;

//#endregion










