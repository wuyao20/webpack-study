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
