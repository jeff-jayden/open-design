<template>
  <div
      class="open-tooltip"
      ref="popperContainerNode"
      v-on="outerEvents"
  >
    <div
        class="open-tooltip__trigger"
        ref="triggerNode"
        v-on="events"
    >
      <div class="slot-wrapper">
        <slot></slot>
      </div>
    </div>
    <Transition :name="transitionName" mode="out-in">
      <div
          class="open-tooltip__popper"
          ref="popperNode"
          v-if="isOpen"
      >
        <slot name="content">
          {{ content }}
        </slot>
        <div id="arrow" data-popper-arrow></div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import type {TooltipEmits, TooltipInstance, tooltipProps} from "@/components/tooltip/types";
import {computed, reactive, ref, watch} from "vue";
import {debounce} from "lodash-es";
import {createPopper, Instance} from "@popperjs/core";

defineOptions({
  name: 'OpenToolTip'
})

const props = withDefaults(defineProps<tooltipProps>(), {
  effect: 'dark',
  placement: "bottom",
  trigger: "hover",
  transitionName: 'slide-fade'
})
const emits = defineEmits<TooltipEmits>()

const popperContainerNode = ref<HTMLElement>()
const triggerNode = ref<HTMLElement>()
const popperNode = ref<HTMLElement>()

let outerEvents: Record<string, any> = reactive({})
let events: Record<string, any> = reactive({})

const isOpen = ref(false)

let popperInstance: null | Instance = null

const popperOptions = computed(() => {
  return {
    placement: props.placement,
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [0, 9]
        }
      }
    ],
    ...props.popperOptions
  }
})



watch(() => props.manual, (isManual) => {
  if (isManual) {
    events = {}
    outerEvents = {}
  } else {
    handleEvent()
  }
})

//当 click和hover变化时 监听
watch(() => props.trigger, (newTrigger, oldTrigger) => {
  if (newTrigger !== oldTrigger) {
    // clear the events
    events = {}
    outerEvents = {}
    handleEvent()
  }
})

// 用于实现创建的popperNode位置在哪 ？？？？
watch(isOpen, (newValue) => {
  if (newValue) {
    if (triggerNode.value && popperNode.value) {
      popperInstance = createPopper(triggerNode.value, popperNode.value, popperOptions.value)
    } else {
      popperInstance.destroy()
    }
  }
}, {flush: "post"})


const open = () => {
  isOpen.value = true
  emits('visible-change', true)
}

const close = () => {
  isOpen.value = false
  emits('visible-change', false)
}

const openDebounce = debounce(open, 30)
const closeDebounce = debounce(close, 30)

const openFinal = () => {
  closeDebounce.cancel()
  openDebounce()
}

const closeFinal = () => {
  openDebounce.cancel()
  closeDebounce()
}

const togglePopper = () => {
  if (isOpen.value) {
    closeFinal()
  } else {
    openFinal()
  }
}

const handleEvent = () => {
  if (props.trigger === 'hover') {
    console.log('hover')
    events['mouseenter'] = openFinal
    outerEvents['mouseleave'] = closeFinal
  } else if (props.trigger === 'click') {
    console.log('click')
    events['click'] = togglePopper
  }
}

if(!props.manual){
  handleEvent()
}


defineExpose<TooltipInstance>({
  'show': openFinal,
  'hide': closeFinal
})

</script>

<style scoped>

</style>