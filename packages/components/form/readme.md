1. 实现架构  （受控还是非受控）受控 但是修改某一个属性不会导致整个表单重新渲染
2. 运行工作原理 
    1. 表单怎么影响子组件的（布局？） 使用provide和inject保存一个全局变量？
    2. 怎么校验的，输入一个立即校验怎么做到的？
        1. 在表单提交的时候，调用表单的校验方法，根据需要传入的校验的字段，分别调用子项的validate方法，在这个方法中获取到自身规则以及全局规则，使用async-validator 用规则作为属性创建一个校验实例，实例校验值，再将校验的结果传入表单一开始设置的回调函数做进一步处理
        2. input组件在输入的时候监听value,调用formItem的validate方法校验
    3. async-validator是怎么校验的？ （主要的功能都在rule文件夹下 https://github.com/yiminghe/async-validator/blob/master/src/rule/index.ts）
        1.类型校验 type
        2.范围校验 range
        3.必要校验 required

3. 有哪些特点？（布局,label,表单可以接受哪些属性）

4. 有哪些功能
    1. 重置
    2. 校验