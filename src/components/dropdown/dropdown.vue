<template>
  <div class="open-dropdown">
    <Tooltip
        :trigger="trigger"
        :placement="placement"
        @visible-change="visibleChange"
        ref="tooltipRef"
    >
      <slot></slot>
      <template #content>
        <ul class="open-dropdown__menu">
          <template v-for="item in menuOptions" :key="item.key">
            <li
                v-if="item.divided"
                role="separator"
                class="open-dropdown-separator"
            ></li>
            <li
                class="open-dropdown__item"
                :class="{'is-disabled': item.disabled, 'is-divided': item.divided}"
                @click="handleClickItem(item)"
                :id="`open-dropdown-${item.key}`"
            >
              <RenderVnode :v-node="item.label"/>
            </li>
          </template>
        </ul>
      </template>
    </Tooltip>
  </div>
</template>

<script setup lang="ts">

import Tooltip from "@/components/tooltip/tooltip.vue";
import type {DropdownProps, DropdownEmits, DropdownInstance, MenuOption} from '@/components/dropdown/types'
import RenderVnode from "@/util/RenderVnode";
import {ref} from "vue";
import type {TooltipInstance} from "@/components/tooltip";

defineOptions({
  name: 'OpenDropDown'
})

const props = defineProps<DropdownProps>()
const emits = defineEmits<DropdownEmits>()

const tooltipRef = ref<TooltipInstance | null>(null)

//tooltip抛出的事件给外面的人使用
const visibleChange = (val: any) => {
  console.log('dropVal' + val)
  emits('visible-change', val)
}

const handleClickItem = (item: MenuOption) => {
  if (item.disabled) {
    return
  }
  emits('select', item)
  if (props.hideAfterClick) {
    tooltipRef?.value.hide()
  }
}


</script>

<style scoped>

</style>