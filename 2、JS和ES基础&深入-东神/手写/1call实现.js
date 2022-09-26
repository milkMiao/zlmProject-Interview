Function.prototype.call2 = function (context){
  //第一版实现：
    // 1、将函数设为对象的属性（bar函数直接放入，foo对象里了）
    // 2、执行该函数 （foo.bar()执行函数）
    // 3、删除该函数 
    context.fn = this;
    console.log("context打印", context) //{ value: 1, fn: [Function: bar] }
    console.log("this打印：", this) //[Function: bar]
    context.fn();
    delete context.fn();
}

//案例
// var foo = {
//   value: 1
// };
// function bar() {
//   console.log(this.value);
// }
// bar.call(foo); // 1


//第一版改造
//当调用 call 的时候，把 foo 对象改造成如下：
// var foo = {
//   value: 1,
//   bar: function() { //bar放入foo对象内部的区别
//       console.log(this.value)
//   }
// };
// foo.bar(); // 1

//第一版检测：
var foo = {
  value: 1
};
function bar() {
  console.log("bar函数",this.value);
}
bar.call2(foo); // 1