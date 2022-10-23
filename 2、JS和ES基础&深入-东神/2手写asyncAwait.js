//使用async 及 Promise 完成 每隔一秒依次输出 0， 1， 2， 3， 4，5

const sleep = new Promise((resolve,reject)=>{
    setTimeout(()=> {
        console.log("异步执行，成功");
        resolve();
    },3000)
})
console.log(sleep);


let arr = [1, 2, 3]; 
arr.reduce((pre, cur) => { 
    return pre.then(() => { 
        return new Promise(r => { 
            setTimeout(() => { 
                r(console.log(cur)) 
            }, 1000); 
        })
    }) 
}, Promise.resolve())
