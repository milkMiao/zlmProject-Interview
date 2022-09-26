//柯里化：第一版
var curry = function (fn) {
    //[].slice.call(arguments, 1) 其含义相当于 arguments.slice(1)，就是取出所有参数，并从下标为1开始，截取所有
    var args = [].slice.call(arguments, 1);
    return function() {
        var newArgs = args.concat([].slice.call(arguments));
        return fn.apply(this, newArgs);
    };
};
/*
    所以如果arguments要使用数组的方法，这里就通过修改this指针的方式，
    让arguments继承array。然后arguments就可以使用数组中的各种方法了。
*/


//1、[]是js语法中创建一个新数组 
//[]是一个数组，那么[].slice是它的一个方法，是一个函数。
var a = [1,2,3,4,5];
var b = a.slice(2);//b是：a从2号位开始的片段，也就是[3,4,5]


//2、在js中，函数本身也是一种对象，也是具有属性和方法的，call就是其中之一。
// 它的第一个参数，是指定函数执行时的this指针，后面的参数，就是函数执行的参数。【同样的修改this执行的还有，apply，bind。】
var a1= function(n){
    console.log(this, n)
}
var b1={}
a1(1);//打印出windows对象，和1
a1.call(b1, 2);//打印出b1对象，和2


//3、为什么要使用.call 呢？因为arguments的原因。
// arguments可以看做一个数组。每一个js函数内部都有arguments，它代表传入的参数数组。
//注意：但实际上他是一个类数组。他并不具备数组原型上所有的方法。
function a2(){
    console.log(arguments) 
    //类数组 Arguments(3) [1, 2, 3, callee: ƒ, Symbol(Symbol.iterator): ƒ]
    // ['0':1, '1':2, '2':3]
    //注意这里打印数据，数据类型是 【Arguments】，而不是【Array数组】
}
a2(1,2,3)


//4、所以如果arguments要使用数组的方法，这里就通过修改this指针的方式，
//让arguments继承array。然后arguments就可以使用数组中的各种方法了。

//5、es6中的【扩展运算符】也可以用的吧
function a3(){
    var arg = [...arguments]
    console.log(arg) //(4) [1, 2, 3, 4] Array类型，类数组直接转化成了真数组
}
a3(1,2,3,4)