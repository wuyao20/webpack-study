# webpack究竟是什么

  webpack is a module bundler
  
# 什么是模块打包工具

   - concept:
   
        modules
   - api
   
        module method 
        
        module variables

# webpack的安装方式
```$xslt
    npm install webpack -g  全局安装
    npm install webpack -D  开发模式安装   
    npx webpack -v  
    npx === ./node_module/webpack/    
```
# 使用webpack的配置文件

webpack.config.js
```$xslt
const path = require('path');

module.exports = {
    entry: './index.js',
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, 'bundle')
    }
}
```
打包方式
- webpack index.js
- npx webpack index.js
- npm run bundle -> webpack

> document
>> guides
>>> getting started
    
# loader是什么
对于特定文件，该如何处理。  
file-loader 将文件移动到对应文件夹下，并返回打包后的文件名称
```
module: {
    rules: [{
        test: /\.jpg$/,
        use: {
            loader: "file-loader"
        }
    }]
}
```
# 使用loader打包静态资源
url-loader 将图片变为base64编码，适合小图片  
提高加载速度省了一次http请求，但是会加大js包的大小  
> document
>> loader
- file-loader
```
npm install --save-dev file-loader
```
    
- url-loader  
> If the file is greater than the limit (in bytes) the file-loader is used by default and all query parameters are passed to it  
> 可以通过fallback: 指定响应loader
```
module: {
        rules: [{
            test: /\.(jpg|png|jif)$/,
            use: {
                loader: "file-loader",
                options: {
                    // placeholder 占位符
                    name: "[name].[ext]",
                    outputPath: 'images/'
                }
            }
        },
        {
            test: /\.(jpg|png|jif)$/,
            use: {
                loader: "url-loader",
                options: {
                    // placeholder 占位符
                    name: "[name].[ext]",
                    outputPath: 'images/'
                }
            }
        }]
    }
```
# loader打包静态资源 样式篇-上
执行顺序从下至上，从右至左。  
```
{
    test: /\.scss$/,
    use: [
        'style-loader',
        'css-loader',
        'sass-loader',
        'postcss-loader'
    ]
},
```
postcss-loader 新建postcss.config.js文件
```
module.exports = {
    plugins: [
        require('autoprefixer')({
            "browsers": [
                "defaults",
                "last 2 versions"
            ]
        })
    ]
}
```

# loader打包静态资源 样式篇-下
- css-module 模块化  
    修改css class名称,防止重复
```
{
    loader: "css-loader",
    options: {
        importLoaders: 2,
       modules: true
    }
}
import style from './style.css';
dom.classList.add(style.avatar);
```
- 使用字体图标  
1. 导入字体文件--eot svg ttf woff
2. 新建字体css文件  
3. file-loader 处理字体文件  
```
    @font-face {
        font-family: "iconfont"
        src: url('./font/iconfont.eot?t=1591083063037'); /* IE9 */
        ...
    };
    .iconfont {
      font-family: "iconfont" !important;
      font-size: 16px;
      font-style: normal;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }
    
    .icon-xbox:before {
      content: "\e9ee";
    }

    <div class="iconfont icon-xbox"></div>
```
    
GUIDES--Asset Management  

style-loader css-loader sass-loader postcss-loader  

# plugins让打包更便捷
- [HtmlWebpackPlugin](https://github.com/jantimon/html-webpack-plugin#configuration)  
在打包结束后，自动生成一个html文件，并把生成的js文件自动引入到这个html文件中。
- clean-webpack-plugin  
By default, this plugin will remove all files inside webpack's output.path directory, as well as all unused webpack assets after every successful rebuild.

# Entry & Output
打包多个文件时:   
```
entry: {
    main: './src/index.js',
    sub: './src/index.js'
}

output: {
    publicPath: 'http://cdn.com.cn' //增加导出的js地址前缀
    filename: [name].js
}
```
configuration 
- entry and context
- output  

guides
- output management

# SourceMap的配置
mode: development
cheap-module-eval-source-map 原始源代码（仅限行）
mode: production
devtool: cheap-module-source-map
```
devtool: source-map
```
- inline  
    1. 打包至输出文件中，不单独形成文件
- cheap  
    1. 只映射业务代码
    2. 错误确定到行
- eval  
    1. sourceURL
    2. eval()
- module
    1. module 也声称sourceMap
# WebpackDevServer提升开发效率
1. webpack --watch
2. webpack-dev-server
3. node server.js  

GUIDES  DEVELOPMENT  
CONFIGURATION DevServer

# Hot Module Replacement
GUIDES HMR  
API HMR  
CONCEPTS HMR  
```
   devServer: {
           contentBase: './dist',
           open: true,
           hot: true,
           hotOnly: true
   },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
   if(module.hot) {
       module.hot.accept('./number', () => {
           document.body.removeChild(document.getElementById('number'));
           number();
       })
   }
```
# Babel处理es6语法
npm install  "@babel/core"  "babel-loader"  "@babel/preset-env" "@babel/polyfill"
```
{
    test: /\.js$/,
    exclude: /node_modules/,
    loader: "babel-loader",
    options: {
        presets: [["@babel/preset-env", {
            useBuiltIns: 'usage'  // 舍弃掉不需要的语法转换
        }]]
    }
}

import "@babel/polyfill"
```
业务代码打包
- @babel/core   babel核心代码
- babel-loader  babel与webpack通信的桥梁
- @babel/preset-env     进行语法转换
- @babel/polyfill   全局变量、方法替换，覆盖更多低版本的浏览器.useBuiltIns: 'usage'


第三方库打包方案
```
{
  "plugins": [["@babel/plugin-transform-runtime", {
    "corejs": 2, 
    "helpers": true,
    "regenerator": true,
    "useESModules": false
  }]]
}
```

# React webpack打包
```json
{
  "presets": [
    ["@babel/preset-env", {
      "targets": {
        "chrome": "67"
      },
      "useBuiltIns": "usage"
    }],
    "@babel/preset-react"
  ]
}
```

# webpackDevServer 实现请求转发
```
proxy: {
        '/react/api': {
            target: 'http://www.dell-lee.com',
            pathRewrite: {
                'header.json': 'demo.json'
            },
            changeOrigin: true
        }
    }
```

# webpackDevServer 解决单页面应用路由问题

#Eslint 在webpack中的配置
```
npm install eslint eslint-loader


module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'eslint-loader'],
      }
    ]
}

devServer: {
    overlay: true
}
```
// git 狗子 eslint src

# 提高webpack打包速度的方法
1. 跟上技术的迭代（Node,Npm,Yarn)
2. 在尽可能少的模块上应用loader
3. Plugin尽可能精简且可靠
4. resolve参数合理配置
```
resolve: {
    extensions: ['.js', '.jsx'] //按顺序遍历文件
    mainFiles: ['index', 'child'], // 默认加载的文件名
    alias: {
        delllee: path.resolve(__dirname, ../src/child) //文件路径别名
    }
}
```
