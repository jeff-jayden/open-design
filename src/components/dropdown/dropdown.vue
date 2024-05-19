<template>
  <div class="open-dropdown">
    <open-tool-tip
        :effect="effect"
        :trigger="trigger"
        :placement="placement"
        @visible-change="visibleChange"
        ref="tooltipRef"
    >
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
      <template #default v-if="!splitButton">
        <slot></slot>
      </template>
    </open-tool-tip>
    
    <template v-if="splitButton">
      <open-button-group>
        <open-button
            :type="type"
            :disabled="disabled"
            role="button"
            @click="handlerMainButtonClick"
        >
          <slot/>
        </open-button>
        <open-button
            :type="type"
            :disabled="disabled"
            role="button"
            class="caret-button"
            v-on="events"
        >
          <open-icon>
            <ArrowDown/>
          </open-icon>
        </open-button>
      </open-button-group>
    </template>
  </div>
</template>

<script setup lang="ts">
import {ArrowDown} from '@element-plus/icons-vue'
import OpenIcon from '@/components/icon'
import OpenButton from "@/components/button";
import type {DropdownProps, DropdownEmits, DropdownInstance, MenuOption} from '@/components/dropdown/types'
import RenderVnode from "@/util/RenderVnode";
import {onMounted, reactive, ref, watch} from "vue";
import OpenToolTip, {TooltipInstance} from "@/components/tooltip";
import OpenButtonGroup from "@/components/button/button-group.vue";

defineOptions({
  name: 'OpenDropDown'
})


const props = defineProps<DropdownProps>()
const emits = defineEmits<DropdownEmits>()
const tooltipRef = ref<TooltipInstance | null>(null)
const events: Record<string, any> = reactive({})


watch(() => tooltipRef.value?.isOpen, () => {
  console.log(tooltipRef.value?.isOpen)
}, {immediate: true})

const visible = ref(false)

const toggleTooltip = () => {
  console.log('tooltipRef.value?.isOpen' + tooltipRef.value?.isOpen)
  if (visible.value) {
    tooltipRef.value?.hide()
    visible.value = false
  } else {
    tooltipRef.value?.show()
    visible.value = true
  }
}

const handleEvent = () => {
  if (props.trigger === 'hover') {
    events['mouseenter'] = tooltipRef.value?.show()
    events['mouseleave'] = tooltipRef.value?.hide()
  } else {
    events['click'] = toggleTooltip
  }
}
//TODO 分割线的时候触发tooltip

onMounted(() => {
  handleEvent()
})

//tooltip抛出的事件给外面的组件使用
const visibleChange = (val: any) => {
  console.log('dropVal' + val)
  emits('visible-change', val)
}

const handlerMainButtonClick = (event: MouseEvent) => {
  console.log('dropdown点击了')
  emits('click', event)
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

defineExpose<DropdownInstance>({
  show: () => tooltipRef.value?.show(),
  hide: () => tooltipRef.value?.hide()
})


</script>

<style scoped>

</style>