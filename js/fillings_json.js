alert('1');
var fillingsJson = [
    ['黑猪梅花肉', '咸蛋黄', '黑猪后腿肉', 'NO:1'], 
    ['黑猪梅花肉', '咸蛋黄', '板栗', 'NO:2'], 
    ['黑猪梅花肉', '咸蛋黄', '咸蛋黄', 'NO:3'], 
    ['黑猪梅花肉', '板栗', '板栗', 'NO:5'], 
    ['黑猪梅花肉', '干贝', '鲍鱼', 'NO:6'], 
    ['黑猪梅花肉', '干贝', '干贝', 'NO:7'], 
    ['黑猪梅花肉', '鲍鱼', '鲍鱼', 'NO:8'], 
    ['黑猪梅花肉', '黑猪梅花肉', '咸蛋黄', 'NO:9'], 
    ['黑猪梅花肉', '黑猪梅花肉', '黑猪后腿肉', 'NO:10'], 
    ['黑猪梅花肉', '黑猪梅花肉', '板栗', 'NO:11'], 
    ['黑猪梅花肉', '黑猪梅花肉', '干贝', 'NO:12'], 
    ['黑猪梅花肉', '黑猪梅花肉', '鲍鱼', 'NO:15'], 
    ['黑猪梅花肉', '黑猪梅花肉', '黑猪梅花肉', 'NO:16'], 
    ['黑猪后腿肉', '咸蛋黄', '板栗', 'NO:17'], 
    ['黑猪后腿肉', '咸蛋黄', '咸蛋黄', 'NO:18'], 
    ['黑猪后腿肉', '板栗', '板栗', 'NO:19'], 
    ['黑猪后腿肉', '干贝', '鲍鱼', 'NO:20'], 
    ['黑猪后腿肉', '干贝', '干贝', 'NO:21'], 
    ['黑猪后腿肉', '鲍鱼', '鲍鱼', 'NO:22'], 
    ['黑猪后腿肉', '黑猪后腿肉', '咸蛋黄', 'NO:23'], 
    ['黑猪后腿肉', '黑猪后腿肉', '板栗', 'NO:25'], 
    ['黑猪后腿肉', '黑猪后腿肉', '黑猪梅花肉', 'NO:26'], 
    ['黑猪后腿肉', '黑猪后腿肉', '干贝', 'NO:27'], 
    ['黑猪后腿肉', '黑猪后腿肉', '鲍鱼', 'NO:28'], 
    ['黑猪后腿肉', '黑猪后腿肉', '黑猪后腿肉', 'NO:29'], 
    ['牛腩', '牛筋', '牛筋', 'NO:30'], 
    ['牛腩', '牛腩', '牛筋', 'NO:31'], 
    ['牛腩', '牛腩', '牛腩', 'NO:32'], 
    ['牛筋', '牛筋', '牛筋', 'NO:33'], 
    ['虾滑', '鱼滑', '鱼滑', 'NO:35'], 
    ['虾滑', '虾滑', '鱼滑', 'NO:36'], 
    ['虾滑', '虾滑', '虾滑', 'NO:37'], 
    ['鱼滑', '鱼滑', '鱼滑', 'NO:38']
];

/*
* 获取可用的馅料数组
* return {enableFillings: [], no: ''}
*/
function getEnableFillings(fillings, callback) {
var enableFillings = [];
var enableFillings1 = {};
var leftFillings, filling, i, j, k, l, m, len, unique;
for(i = 0; i < fillingsJson.length; i++) {
    leftFillings = fillingsJson[i];//当前组合剩余可用馅料,最后元素为编号
    len = 0;//当前组合符合馅料条件数
    for(j = 0; j < fillings.length; j++) {
        filling = fillings[j];//当前馅料
        for(k = 0; k < leftFillings.length; k++) {
            if(filling == leftFillings[k]) {
                len++;
                leftFillings = leftFillings.slice(0, k).concat(leftFillings.slice(k + 1));//去除当前元素并返回新数组
                break;
            }
        }
    }
    if(len == fillings.length) {//当前组合符合条件,将剩余馅料放进enableFillings且去重
        if(len == 3) {//选好了
        //	return {enableFillings: [], no: leftFillings[0]};
            return callback(leftFillings[0]);
        }
        for(l = 0; l < leftFillings.length - 1; l++) {//去除编号
            unique = true;
            for(m = 0; m < enableFillings.length; m++) {
                if(leftFillings[l] == enableFillings[m]) {
                    unique = false;
                    break;
                }
            }
            if(unique) enableFillings.push(leftFillings[l]);
            enableFillings1[leftFillings[l]] = true;
        }
    }
}
//	return {enableFillings: enableFillings, no: ''};
return callback(enableFillings1);
}

function getEnableFillingsOpt(fillings, func) {
func(getEnableFillings(fillings));
}

/**
* 根据编号获取馅料组合
* @param no 编号
* @returns 数组
*/
function getGroup(no, callback) {
var arr = false;
$.each(fillingsJson, function(i, item) {
    if(item[3] == no) {
        return arr = item;
    }
});
return callback(arr);
}

/**
* 根据包装编号获取图片链接
* @param pacNo
* @returns
*/
function pacUrl(pacNo) {
var pics = {
        "FT01大": "https://img.alicdn.com/imgextra/i1/3392/TB2Z5Gjqv5TBuNjSspcXXbnGFXa_!!3392-2-open_trade.png",
        "FT02小": "https://img.alicdn.com/imgextra/i3/2718/TB2DzGxquySBuNjy1zdXXXPxFXa_!!2718-2-open_trade.png",
        "FT03生": "https://img.alicdn.com/imgextra/i4/6896/TB2Q0B2qpGWBuNjy0FbXXb4sXXa_!!6896-2-open_trade.png",
        "FT05粑": "https://img.alicdn.com/imgextra/i4/5777/TB2pll5qrGYBuNjy0FoXXciBFXa_!!5777-2-open_trade.png",
        "FT06撸": "https://img.alicdn.com/imgextra/i4/6523/TB2nJaxquOSBuNjy0FdXXbDnVXa_!!6523-2-open_trade.png",
        "FT07睡": "https://img.alicdn.com/imgextra/i4/7225/TB2jyaZqv1TBuNjy0FjXXajyXXa_!!7225-2-open_trade.png"
};
return pics[pacNo];
}