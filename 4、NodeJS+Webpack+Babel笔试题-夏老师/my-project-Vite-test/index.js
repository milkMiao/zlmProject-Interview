//node服务器，处理浏览器加载各种资源多请求:如下三件事
//index.html
//js
//vue

const koa = require('koa')
const app = new koa() //创建实例
const fs = require('fs')
const path = require('path')
const compilerSFC = require('@vue/compiler-sfc')

//中间件配置
//处理路由
//node inex.js启动
app.use(async (ctx)=>{
    const {url} = ctx.request;
    console.log("url----",url)//打印：/ ， /src/min.js
    //路由处理
    //首页请求
    if(url === '/'){
      //加载index.html,返回宿主页
        ctx.type = 'text/html';
        ctx.body = fs.readFileSync('./index.html', 'utf-8'); //当前目录下的index.html文件
    } else if(url.endsWith('.js')){
      //js文件加载处理----获取js文件绝对路径，读取并返回
      const p = path.join(__dirname, url);
      console.log('p--------',p)
      // /Users/zhaolimiao/Desktop/ZLM/开课吧-面试涨薪计划2022-01-17
      // /5NodeJS+Webpack+Babel笔试题精讲-夏然老师/my-project-Vite-test/src/main.js
      ctx.type = 'application/javascript';
      ctx.body = rewriteImport(fs.readFileSync(p,'utf-8'));
    } else if(url.startsWith('/@modules/')){
      // 裸模块加载处理 import xxx from ‘/@modules/vue’ 
      //裸模块名称
      const moduleName = url.replace("/@modules/", "") //替换为空--即 vue
      //去node_modules目录中去找--找到node_modules/目录下的moduleName--vue文件夹,路径打印
      const prefix = path.join(__dirname, './node_modules/', moduleName)
      //从packages.json中获取module字段 // "module": "dist/vue.runtime.esm-bundler.js",
      const module = require(prefix + '/package.json').module;
      const filePath = path.join(prefix,module) //  前缀+后缀
      const ret = fs.readFileSync(filePath,'utf-8')
      ctx.type = 'application/javascript';
      ctx.body = rewriteImport(ret);
    } else if(url.indexOf('.vue') > -1){
      const p = path.join(__dirname,url)
      const ret = compilerSFC.parse(fs.readFileSync(p, 'utf-8'))
      console.log("ret-------", ret)
      //获取脚本部分内容
      const scriptContent = 
    }
})

//裸模块地址重写
// import xxx from ‘vue’ 替换成 import xxx from ‘/@modules/vue’
function rewriteImport(content){
  return content.replace(/ from ['|"](.*)['|"]/g, function(s1,s2){
    //s1---匹配的部分，是相对地址-则替换,s2---分组的内容
    console.log("s1------s2----", s1,s2) //打印：from 'vue' , vue
    if(s2.startsWith("/") || s2.startsWith("./") || s2.startsWith("../")){
      return s1;
    } else{
      //裸模块，需要替换
      return ` from '/@modules/${s2}'`
    }
  })
}
// s1------s2----  from '@vue/runtime-dom' @vue/runtime-dom
// s1------s2----  from '@vue/runtime-dom' @vue/runtime-dom
// url---- /@modules/@vue/runtime-dom

// s1------s2----  from '@vue/runtime-core' @vue/runtime-core
// s1------s2----  from '@vue/runtime-core' @vue/runtime-core
// s1------s2----  from '@vue/shared' @vue/shared
// url---- /@modules/@vue/runtime-core

// s1------s2----  from '@vue/reactivity' @vue/reactivity
// s1------s2----  from '@vue/reactivity' @vue/reactivity
// s1------s2----  from '@vue/shared' @vue/shared
// s1------s2----  from '@vue/shared' @vue/shared
// url---- /@modules/@vue/shared
// url---- /@modules/@vue/reactivity
// s1------s2----  from '@vue/shared' @vue/shared

app.listen(3000, ()=>{
  console.log('kvite start Up！！！');
})