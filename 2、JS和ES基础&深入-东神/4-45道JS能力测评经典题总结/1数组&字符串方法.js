// 「牛客网」45道JS能力测评经典题总结（基础检测题）：https://juejin.cn/post/6846687602242748423

// 1、数组方法
let arrObj =[
    {name:'1小明',age:18,sex:'男'},
    {name:'2小红',age:13,sex:'女'},
    {name:'3小方',age:15,sex:'男'}
];
let obj={name:'4小丁',age:17,sex:'女'};
let arrObjNew = {1:'1', 2:'2', 3:'3', 4:'4'};
let arrNum =[1,2,6,4,3,2,5]
let arrString ='123456'
let arrStringNew = ["Banana", "Orange", "Apple", "Mango"]


// arrObj.push(obj)
// arrObj.pop();
// arrObj.unshift(obj);
// arrObj.shift();

// arrObj.splice(0,0,obj);//第一位，删除0项，添加obj数据；
// let sliceNew = arrNum.slice(0,2); //0,1两项，此时打印arrNum原数组未改变；
// let splitNew = arrString.split('',3)


// let arrConcat= arrObj.concat(obj)
// let arrJoin = arrStringNew.join('||');
// let arrToString = arrNum.toString();


// let arrReserve = arrNum.reverse();
// let arrSort = arrNum.sort();


// let arrIndexOf = arrNum.indexOf(3)
// let arrLastIndexOf = arrNum.lastIndexOf(2)


// let arrForEach = arrObj.forEach((item,index) => {console.log(index,item)})
// let arrMap = arrObj.map((item,index) => {console.log(index,item)})


// let sumReduce = arrNum.reduce((prev, cur, index, array)=>{
//     return prev + cur;
// });
//第一次执行回调函数时，prev 是1，cur 是2。
//第二次执行时，prev 是3（1 加 2 的结果），cur 是6（数组 arrNum 中的第三项）
// 以此类推，累加直至数组最后一项，最后返回结果。
// console.log('arr1---', sumReduce)


// let sumReduceRight = arrNum.reduceRight((prev, cur, index, array)=>{
//     return prev + cur;
// });
// 第一次执行回调函数时，prev 是5，cur 是2。
// 第二次执行时，prev 是7（5 加 2 的结果），cur 是3（数组 arrNum 中的第三项）。
// 以此类推，累加直至数组最后一项，最后返回结果。
// console.log('arr1---', sumReduceRight)


// console.log(arrNum.some( function( item, index, array ){ 
//     console.log( 'item=' + item + ',index='+index+',array='+array ); 
//     return item > 3;
// })); 

// console.log(arrNum.every( function( item, index, array ){ 
//     console.log( 'item=' + item + ',index='+index+',array='+array ); 
//     return item > 3; 
// }));


//2、字符串方法




