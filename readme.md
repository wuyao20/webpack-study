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
