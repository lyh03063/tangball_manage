

let deepCopy = function (obj) {//深拷贝一个Json对象的函数
    let str = JSON.stringify(obj);//json对象转字符串
    let objNew = JSON.parse(str); //字符串转json对象
    return objNew
}

let class2type = {},
    //用于记录[object class]样式  
    arrObjs = "Boolean Number String Function Array Date RegExp Null Undefined".split(" ");
for (var i = 0, l = arrObjs.length; i < l; i++) {
    class2type["[object " + arrObjs[i] + "]"] = arrObjs[i].toLowerCase();
}

let type = function (obj) {
    //函数：{返回对象类型函数}
    return class2type[Object.prototype.toString.call(obj)] || "object";
};

function timeout(ms) {//使用promise封装一个延迟方法
    return new Promise((resolve) => {//resolve延迟解决后的回调函数, reject延迟异常的处理函数
        setTimeout(resolve, ms, 'done');
    });
}
/**
 * 
 * @param {开始时间} _json.startTime
 * @param {结束时间} _json.endTime
 *  @param {当前时间} _json.currTime
 */
function getTimeStatus(param) {//
    console.log("getTimeStatus###");
    let flag = 2;
    let msg = "进行中";
    let { start, end, now } = param;
  
    
    if ((start > end)||!(start&&end)) {
        start=start||"——";
        end=end||"——";
        flag = 4;
        msg = "时间段设置有误";
        return { flag, msg,start,end }
    }
    let fomatStr = "YYYY-MM-DD HH:mm";

    now = now || moment();
    now = moment(now).format(fomatStr);
    start = moment(start).format(fomatStr);
    end = moment(end).format(fomatStr);


    if (now < start) {//如果{000}000
        msg = "未开始";
        flag = 1;
    } else if (now > end) {//如果{000}000
        flag = 3;
        msg = "已结束";
    }
    return { flag, msg,start,end,now }
}


export default {
    deepCopy, type, timeout, getTimeStatus
}