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

```` vue
<template>
  <open-button>我是 Button</open-button>
</template>
````


#### 单个导入

Open Design 提供了基于 ES Module 的开箱即用的 Tree Shaking 功能。

```` vue
<template>
  <Button>我是 Button</Button>
</template>
<script>
  import { open-button } from '@jeff-jayden/open-design'
  // ...
</script>
````
