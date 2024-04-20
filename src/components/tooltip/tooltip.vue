<template>
  <div
      class="open-tooltip"
      ref="popperContainerNode"
      v-on="outerEvents"
  >
    <div
        class="open-tooltip-trigger"
        ref="triggerNode"
        v-on="events"
    >
      <slot/>
    </div>
    <transition>
      <div
          class="open-tooltip__popper"
          ref="popperNode"
          v-if="isOpen"
      >
        <slot name="content">
          {{ content }}
        </slot>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import {TooltipEmits, tooltipProps} from "@/components/tooltip/types";
import {reactive, ref} from "vue";
import {debounce} from "lodash-es";

defineOptions({
  name: 'OpenToolTip'
})

const props = withDefaults(defineProps<tooltipProps>(), {
  effect: 'dark',
  placement: "bottom",
  trigger: "hover"
})
const emits = defineEmits<TooltipEmits>()

const popperContainerNode = ref<HTMLElement>()
const triggerNode = ref<HTMLElement>()
const popperNode = ref<HTMLElement>()

const outerEvents: Record<string, any> = reactive({})
const events: Record<string, any> = reactive({})

const isOpen = ref(false)


const open = () => {
  isOpen.value = true
  emits('visible-change', true)
}

const close = () => {
  isOpen.value = false
  emits('visible-change', false)
}

const openDebounce = debounce(open, 300)
const closeDebounce = debounce(close, 300)

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

handleEvent()


</script>

<style scoped>

</style>