## 完整yml示例
```
services:
  function-starter:
    component: function
    props:
      functionPath: 'src'
      app: 
        name: exampleApp
        runtime: nodejs12
        memory: 1152
        timeout: 30
        concurrency: 1
      http:
        - /
        - like
```

##  初始化流程
1. 寻找目标文件
使用 functionPath,比如是`src`
2. 生成函数文件
根据路由配置
```
http:
  - /
  - user
```
生成如下文件夹
```
src
  - index
    - config.yml
    - index.js
  - user
    - config.yml
    - index.js
```
