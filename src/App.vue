<template>
  <div class="container">
    <div>
      <Icon icon="xmark"/>
    </div>
    <Icon icon="arrow-up" size="2xl" type="danger" color="blue"/>
    <OpenButton type="danger" :loading="false" icon="arrow-down">Primary</OpenButton>
    <Button plain>Plain Button</Button>
    
    <Collapse :model-value="value" @change="fn" accordion>
      <collapse-item name="1" title="Consistency" disabled>
        Consistent with real life: in line with the process and logic of real life, and comply with languages and habits
        that the users are used to;
        Consistent within interface: all elements should be consistent, such as: design style, icons and texts, position
        of elements, etc.
      </collapse-item>
      <collapse-item name="2" title="Feedback">
        dsfasdfds
      </collapse-item>
      <collapse-item name="3" title="Efficiency">
        sass
      </collapse-item>
    </Collapse>
    
    <tooltip
        content="你好，我叫坤坤的数据库恢复较快速度和反抗撒旦回复楼上加快速度很费解啊撒旦解放国际大厦股份 看见翻盖手机贷款购房价款"
        placement="top-end"
        trigger="hover"
        effect="light"
    >
      <OpenButton>点击我</OpenButton>
    </tooltip>
    
    <open-drop-down
        :menu-options="menuOptions"
        trigger="hover"
        effect="light"
        hide-after-click
    >
      <open-button icon="arrow-down">无分割线</open-button>
    </open-drop-down>
    
    <open-drop-down
        type="primary"
        :menu-options="menuOptions"
        trigger="click"
        hide-after-click
        @select="handleSelect"
        split-button
        effect="light"
    >
      有分割线
    </open-drop-down>
    
    <el-tooltip
        content="dksjdkjasdkl"
        effect="dark"
    >
      el-tooltip
    </el-tooltip>
    
    
    <el-dropdown split-button type="primary" trigger="click">
      Dropdown List
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>Action 1</el-dropdown-item>
          <el-dropdown-item>Action 2</el-dropdown-item>
          <el-dropdown-item>Action 3</el-dropdown-item>
          <el-dropdown-item>Action 4</el-dropdown-item>
          <el-dropdown-item>Action 5</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
    
    <open-button @click="showMessage" type="primary">弹出message</open-button>
    
    <!--    <message message="这是openMessage" show-close type="success"></message>-->
    <!--    <message message="这是openMessage" show-close type="success"></message>-->
    <!--    <open-message message="这是openMessage" show-close type="success"></open-message>-->
    <!--    <open-message message="这是openMessage" show-close type="success"></open-message>-->
  </div>

</template>

<script setup lang="ts">
import {ElTooltip} from "element-plus";
import OpenButton from '@/components/button/button.vue'
import Icon from '@/components/icon/icon.vue'
// import {Button} from "@jeff-jayden/open-design";
import {onMounted, ref} from "vue";
import Collapse from "@/components/collapse/collapse.vue";
import CollapseItem from "@/components/collapse/collapse-item.vue";
import tooltip from '@/components/tooltip/tooltip.vue'
// import {Dropdown} from "@qinloong/snow-sky";
import OpenDropDown from "@/components/dropdown/dropdown.vue";
import {createMessage} from "@/components/message/methods";
import sonwMessage from '@qinloong/snow-sky'
// import {Tooltip} from "@qinloong/snow-sky";
// import {Collapse, CollapseItem} from '@qinloong/snow-sky'
// import OpenMessage from '@/components/message/message.vue'


const value = ref(['1', '2'])


onMounted(() => {
  createMessage({message: 'hello world', showClose: true, type: "success"})
  createMessage({message: 'hello world', showClose: true, type: "error"})
  createMessage({message: 'hello world', showClose: true, type: "info"})
  createMessage({message: 'hello world', showClose: true, type: "warning"})
  
  
  console.log('aaaa' + import.meta.url)
  setTimeout(() => {
    value.value = ['2', '3']
    console.log(value.value)
    console.log(111)
  }, 1000)
})


const fn = (val: any) => {
  console.log(val)
}

const showMessage = () => {
  createMessage({message: 'hello world', showClose: true, type: "success"})
  // sonwMessage({message: 'hello world', showClose: true, type: "success"})
}

const menuOptions = [
  {
    label: '大撒大撒',
    key: 1,
    disabled: true
  },
  {
    label: '大撒大撒',
    key: 2,
    divided: true
  },
  {
    label: '大撒大撒',
    key: 3,
  },
  {
    label: '大撒大撒',
    key: 4,
  }
]

const handleSelect = (val: any) => {
  console.log('选择的值是：' + val.label)
}

</script>

<style scoped>

</style>
