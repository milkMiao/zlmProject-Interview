// 创建一个webpack 的配置文件
//webpack 的配置其实是一个 Node 的脚本，这个脚本对外暴露一个配置对象，webpack 通过这个对象来读取相关的一些配置。
//webpack 的模式通常用来区分开发环境和生产环境的构建；

const path = require('path')
const fs = require('fs')
const CopyPlugin = require('copy-webpack-plugin'); //复制文件使用的;需要npm install安装才能使用
const HtmlWebpackPlugin = require('html-webpack-plugin'); //关联HTML

//给 webpack 配置动态的入口,如下1，2两大步：
//1、src/pages 目录为页面入口的根目录
const pagesRoot = path.resolve(__dirname, './src/pages'); //foo文件夹内foo.js文件
//2、fs 读取 pages 下的所有文件夹来作为入口，使用 entries 对象记录下来
//reduce() 方法接收一个函数作为累加器，数组中的每个值（从左到右）开始缩减，最终计算为一个值。对空数组是不会执行回调函数的。
const entries = fs.readFileSync(pagesRoot).reduce((entries, page)=>{
    // 文件夹名称作为入口名称，值为对应的路径，可以省略 `index.js`，webpack 默认会寻找目录下的 index.js 文件
    entries[page] = path.resolve(pagesRoot, page)
    return entries;
},{}) //initialValue：初始值--默认传空对象
//上述做法可以支持你在「src/pages」下添加多个页面入口，而无需每次都修改 webpack 的配置文件，方便多页面或者大型项目使用。

module.exports ={
          //构建模式是 webpack v4 引入的新概念
    mode: 'development', //指定开发环境: development，production，none--不需要任何默认优化配置时使用; 
            //production 模式会启用 TerserPlugin 来压缩 JS 代码，让生成的代码文件更小。
            // development 模式会启用 devtools: 'eval' 配置，提升构建和再构建的速度。

    // entry: './src/index.js', //1、指定构建入口文件,如下等价
    // entry: {
    //     main: './src/index.js' // 1、你可以使用其他名称来替代 main，例如 index、app 等
    // },
    // entry: { //2、使用数组来对多个文件进行打包
    //     main: [
    //       './src/foo.js',
    //       './src/bar.js'
    //     ]
    // },
    entry: entries,//3、给 webpack 配置动态的入口

    output: {
        path: path.resolve(__dirname, 'dist'),//指定构建生成文件所在路径
        filename: 'bundle.js' //指定构建生成的文件名
    },

    devServer: {//contentBase 已废弃,改为static
        static: path.resolve(__dirname, 'dist') // 开发服务器启动路径
        // path.resolve：把一个路径或路径片段的序列解析为一个绝对路径
    },

    rules: [//配置相关的规则
        {                   //支持 js 和 jsx 文件，使用 react 时需要
            test: /\.jsx?/, //匹配文件路径的正则表达式，通常我们都是匹配文件类型后缀
            include: [
                path.resolve(__dirname, 'src')//指定哪些路径下的文件需要经过 loader 处理
            ],
            use: {
                //Babel 是一个让我们能够使用 ES 新特性的 JS 编译工具，我们可以在 webpack 中配置 Babel，以便使用 ES6、ES7 标准来编写 JS 代码。
                loader: 'babel-loader',//指定的babel-loader ，可以使用 babel 来将 ES6 代码转译为浏览器可以执行的的 ES5 代码
                options: {//options:选项意思，presets：预设
                    presets: ['@babel/preset-env']
                }
            }
        },
        {//构建css
            test: /\.css?/,
            include: [
                path.resolve(__dirname, 'src')
            ],
            use: [//style-loader 和 css-loader 都是单独的 node package，需要安装。
                'style-loader',
                'css-laoder'
            ]
            // css-loader 负责解析 CSS 代码，主要是为了处理 CSS 中的依赖，例如 @import 和 url() 等引用外部文件的声明；
            // style-loader 会将 css-loader 解析的结果转变成 JS 代码，运行时动态插入 style 标签来让 CSS 代码生效。
        },
        {//css预处理器
            test: /\.less$/,
            use: [
              // 因为这个插件需要干涉模块转换的内容，所以需要使用它对应的 loader
              MiniCssExtractPlugin.loader,
              'css-loader',
              'less-loader',
            ],
        },
        {//处理图片文件
            test: /\.(png|jpg|gif)$/,
            use:[{
                loader: 'file-loader',
                options: {}
            }]
        }
    ],

    //plugin 插件的使用
    plugins: [
        new CopyPlugin([
            { form: 'src/public', to: 'public' }
        ]),
        new HtmlWebpackPlugin({
            template : 'src/index.html' //配置文件模版
        })
    ]
}
