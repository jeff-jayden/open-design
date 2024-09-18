# Input组件

<preview path="../packages/input/input.vue" title="基础用法" description="Input 组件的基础用法"></preview>




##
# API
## Input Attributes

|Name|Description|Type|Default|
|:----|:----|:----|:----|
|type|input 原生类型|`'string'`|text|
|model-value / v-model|绑定值|`'string'`| |
|disabled|是否禁用|`boolean`|false|
|placeholder|输入框占位文本|`string`| |
|size|输入框尺寸，只在 type 不为 'textarea' 时有效|`'large' \|'small'`| |
|placeholder|输入框占位文本|`string`| |
|show-password|是否显示切换密码图标|`boolean`|false|
|clearable|是否显示清除按钮|`boolean`|false|
|readonly|原生 readonly 属性，是否只读|`boolean`|false|
|autofocus|原生属性，自动获取焦点|`boolean`|false|
|autocomplete|原生 autocomplete 属性|`string`|off|

## Input Events

|Name|Description|Type|
|:----|:----|:----|
|blur|当选择器的输入框失去焦点时触发|`(e: FocusEvent) => void`|
|focus|当选择器的输入框获得焦点时触发|`(e: FocusEvent) => void`|
|change|当选择器的输入框失去焦点时触发|`(e: string) => void`|
|input|当选择器的输入框获得焦点时触发|`(e: string) => void`|
|clear|在点击由 clearable 属性生成的清空按钮时触发|`()=>void`|

## Slots 

|Name|Description|
|:----|:----|
|prefix|输入框头部内容|
|suffix|输入框尾部内容|
|prepend|输入框前置内容|
|append|输入框后置内容|

## Exposes

|Name|Description|Type|
|:----|:----|:----|
|ref|HTML元素 input 或 textarea|`Ref<HTMLInputElement \|HTMLTextAreaElement>`|