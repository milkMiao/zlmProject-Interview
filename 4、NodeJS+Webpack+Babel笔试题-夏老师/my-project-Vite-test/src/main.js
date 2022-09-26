import {str} from './moduleA.js'
console.log('vite ...' + str)

// 支持第三方库
// 倒入第三方依赖vue---发现发现浏览器只支持相对路径文件加载，导致报错提示
//注意：这里的关键是替换”裸模块路径“为“相对路径”，比如我们将from 'vue'替换为from '/@modules/vue'
import {createApp, h} from 'vue' //浏览器不认识vue具体在哪，我们将 vue ===》 /@modules/vue相对地址
import App from './App.vue'
// import './index.css'
const App2 = {
    render() {
        // <div><div>Hello  Vite</div></div>
        return h('div',null, [h('div',null, String('Hello Vite'))])
    }
}
createApp(App).mount('#app')
