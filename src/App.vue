<template>
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
    content="你好，我叫坤坤"
  >
    <button>点击我</button>
  </tooltip>

</template>

<script setup lang="ts">
import OpenButton from '@/components/button/button.vue'
import Icon from '@/components/icon/icon.vue'
import {Button} from "@jeff-jayden/open-design";
import {onMounted, ref} from "vue";
import Collapse from "@/components/collapse/collapse.vue";
import CollapseItem from "@/components/collapse/collapse-item.vue";
import tooltip from '@/components/tooltip/tooltip.vue'
// import {Tooltip} from "@qinloong/snow-sky";
// import {Collapse, CollapseItem} from '@qinloong/snow-sky'

const value = ref(['1', '2'])


onMounted(() => {
  console.log('aaaa' + import.meta.url)
  setTimeout(() => {
    value.value = ['2', '3']
    console.log(value.value)
    console.log(111)
  },1000)
})


const fn = (val: any) => {
  console.log(val)
}

</script>

<style scoped>

</style>
