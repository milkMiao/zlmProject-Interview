// 好像很简单，遍历对象，然后把属性和属性值都放在一个新的对象不就好了~

var shallowCopy = function(obj) {
    // 只拷贝对象
    if (typeof obj !== 'object') return;

    // 根据obj的类型判断是新建一个数组还是对象
    var newObj = obj instanceof Array ? [] : {};

    // 遍历obj，并且判断是obj的属性才拷贝
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            newObj[key] = obj[key];
        }
    }
    return newObj;
}

var a={name:"小红", age:18}
var b = shallowCopy(a)
console.log("b",b)