<h1 align="center">一个vue3组件库</h1>

<h5 align="center">助力开发者「更灵活」地搭建出「更美」的产品</h5>

<div align="center">

![last](https://img.shields.io/github/last-commit/jeff-jayden/open-design)
![language](https://img.shields.io/github/languages/top/jeff-jayden/open-design)
![download](https://img.shields.io/npm/dw/%40jeff-jayden%2Fopen-design)
</div>

[//]: # (# 笔记)

<div align="center">开发此组件库是为了让自己变得更强，认识知识更全面，还有诸多问题，不过我会一一完善，还是那句话 -- 只有真实经历过才知道有多难，共勉！😊</div>


[//]: # (1. 通过css更改样式 用类名选择器指定 css基础要扎实)

[//]: # (2. 动态绑定类名 使用js控制类名的true或false)

[//]: # (3. 用js编写功能，比如事件，属性 各种钩子函数)

[//]: # (4. 用到的技术栈 ts、vite、vue3)

[//]: #
[//]: # (步骤)

##### 组件库开发记录

1. 项目的搭建
   1. monorepo+pnpm
   2. 项目结构
2. 组件的实现
   1. 样式的使用
      1. sass语法
   2. 各种属性，事件串联在一起，供父子组件通信使用状态
      1. provide,inject,expose,ref
   3. 编码规范
      1. prettier,eslint,husky,commitlint,lint-staged
      2. 编写代码时，props,emit,data,生命周期钩子函数的顺序
3. 打包的流程
   1. 使用gulp创建任务执行
   2. tsconfig.json的配置
   3. vite.config.ts的配置
   4. rollup的配置使用
   5. package.json文件的配置
4. 文档站的建设
   1. 语法，md的使用

后续优化重点：
1. tooltip组件以及所有以 tooltip 为基础的组件( dropDown, select  )

后续添加组件
1. modal
2. 分页加表格
3. form 使用 schema 实现
4. @qinloong/snow-sky


碰到的问题啊！！！
提交用户信息为错误的邮箱，导致github没有提交记录
