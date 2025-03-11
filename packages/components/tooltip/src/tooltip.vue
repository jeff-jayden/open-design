<template>
  <div class="open-tooltip" ref="popperContainerRef" v-on="outerEvents">
    <div class="open-tooltip__trigger" ref="triggerRef" v-on="events">
      <div class="slot-wrapper">
        <slot />
      </div>
    </div>
    <Transition name="slide-fade">
      <div
        ref="contentRef"
        v-if="isOpen"
        class="open-tooltip__popper"
        :class="{
          light: effect === 'light',
          dark: effect === 'dark'
        }"
      >
        <slot name="content">
          <span v-if="rawContent" v-html="content" />
          <span v-else>{{ content }}</span>
        </slot>
        <div id="arrow" data-popper-arrow />
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, reactive, ref, shallowRef, unref, watch } from 'vue';
import { createPopper, Instance } from '@popperjs/core';
import type { ITooltipEmits, ITooltipInstance, ITooltipProps } from './types';
import useClickOutside from '../../../hooks/src/useClickOutside';
import { useDelayedToggle } from '@open-design/components/tooltip/src/hooks/use-delayed-toggle';

defineOptions({
  // 参考https://www.jiyik.com/w/popperjs/popper-modifiers-offset
  name: 'OpenToolTip'
});

const props = withDefaults(defineProps<ITooltipProps>(), {
  effect: 'light',
  placement: 'bottom',
  trigger: 'hover'
});
const emits = defineEmits<ITooltipEmits>();

const popperContainerRef = ref<HTMLElement>();
const contentRef = ref<HTMLElement>();
const triggerRef = ref<HTMLElement>();

let outerEvents: Record<string, any> = reactive({});
let events: Record<string, any> = reactive({});

const isOpen = ref(false);
const popperInstanceRef = shallowRef<Instance>();

const opts = computed(() => {
  return {
    placement: props.placement,
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [0, 8]
        }
      }
    ],
    ...props.popperOptions
  };
});

const destroy = () => {
  if (!popperInstanceRef.value) return;

  popperInstanceRef.value.destroy();
  popperInstanceRef.value = undefined;
};

const open = () => {
  isOpen.value = true;
  emits('visible-change', true);
};

const close = () => {
  isOpen.value = false;
  emits('visible-change', false);
};

const { onOpen, onClose } = useDelayedToggle({
  open,
  close
});

const togglePopper = () => {
  if (isOpen.value) {
    onClose();
  } else {
    onOpen();
  }
};

const updatePopper = () => {
  if (popperInstanceRef) {
    popperInstanceRef.value?.update();
  }
};

const handleEvent = () => {
  if (props.trigger === 'hover') {
    events.mouseenter = onOpen;
    outerEvents.mouseleave = onClose;
  } else if (props.trigger === 'click') {
    events.click = togglePopper;
  }
};

useClickOutside(popperContainerRef, () => {
  if (props.trigger === 'click' && isOpen.value && !props.manual) {
    onClose();
  }
  // emits('click-outside', true);
});

onMounted(() => {
  // 监听参考以及展示元素变化时，调用createPopper方法
  watch(
    () => [contentRef.value, triggerRef.value],
    ([contentRef, triggerRef]: [HTMLElement, HTMLElement]) => {
      // console.log('执行destroy前', contentRef, triggerRef);
      // destroy();
      if (!triggerRef || !contentRef) return;
      // console.log('执行destroy后', contentRef, triggerRef);
      popperInstanceRef.value = createPopper(triggerRef, contentRef, opts.value);
    },
    {
      flush: 'post',
      immediate: true
    }
  );

  // 当参考元素发生变化时
  watch(
    () => props.virtualRef,
    (virtualEl: HTMLElement) => {
      // console.log('triggerRef', triggerRef.value);
      if (!virtualEl) return;
      // console.log('virtualRef', virtualEl);
      // console.log('triggerRef', triggerRef.value);
      triggerRef.value = virtualEl;
      // console.log('instanceRef', popperInstanceRef.value);
    },
    {
      flush: 'post',
      immediate: true
    }
  );
});

// 组件卸载时清理
onUnmounted(() => {
  if (popperInstanceRef.value) {
    popperInstanceRef.value.destroy();
  }
});

watch(
  () => props.manual,
  (isManual: string) => {
    if (isManual) {
      events = {};
      outerEvents = {};
    } else {
      handleEvent();
    }
  }
);

// 当 click和hover变化时 监听
watch(
  () => props.trigger,
  ([newTrigger, oldTrigger]: [string, string]) => {
    if (newTrigger === oldTrigger) return;
    events = {};
    outerEvents = {};
    handleEvent();
  }
);

// 当配置项改变的时候，动态改变
watch(
  opts,
  (newOptions: object) => {
    const instance = unref(popperInstanceRef);
    if (!instance) return;
    instance.setOptions(newOptions);
  },
  {
    deep: true
  }
);

if (!props.manual) {
  handleEvent();
}

defineExpose<ITooltipInstance>({
  show: onOpen,
  hide: onClose,
  isOpen,
  updatePopper
});
</script>

<style scoped></style>
