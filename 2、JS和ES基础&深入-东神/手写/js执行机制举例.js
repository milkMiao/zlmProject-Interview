console.log('1');

setTimeout(function() { //宏setTimeout1
    console.log('2');
    process.nextTick(function() {//微process2
        console.log('3');
    })
    new Promise(function(resolve) {
        console.log('4');
        resolve();
    }).then(function() {//微promise2
        console.log('5')
    })
})

process.nextTick(function() {//微process1
    console.log('6');
})

new Promise(function(resolve) {
    console.log('7');
    resolve();
}).then(function() {//微promise1
    console.log('8')
})

setTimeout(function() {//宏setTimeout2
    console.log('9');
    process.nextTick(function() {//微process3
        console.log('10');
    })
    new Promise(function(resolve) {
        console.log('11');
        resolve();
    }).then(function() { //微promise3
        console.log('12')
    })
})
//打印结果：1，7
// 6，8，  2，4，   3，5 （先执行完所有微任务，在开始一个新宏任务）
//9，11   10，12


// 整段代码，共进行了三次事件循环，完整的输出为1，7，6，8，2，4，3，5， 9，11，10，12。
//  (请注意，node环境下的事件监听依赖libuv与前端环境不完全相同，输出顺序可能会有误差)