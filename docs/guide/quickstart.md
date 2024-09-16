# 快速开始

本节将介绍如何在项目中使用 open-design

## 用法

#### 全局使用

```` javascript
// 引入所有组件
import openDesign from @jeff-jayden/open-design
// 引入样式
import '@jeff-jayden/open-design/dist/index.css'

import App from './App.vue'
// 全局使用
createApp(App).use(openDesign).mount('#app')
````


#### 单个导入

Open Design 按需加载的功能。

```` vue
<template>
  <Button>我是 Button</Button>
</template>
<script>
  import { OpenButton } from '@jeff-jayden/open-design'
  // ...
</script>
````
