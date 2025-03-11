<template>
  <div class="open-dropdown">
    <open-tool-tip
      :effect="effect"
      :trigger="trigger"
      :placement="placement"
      @visible-change="visibleChange"
      ref="tooltipRef"
      :virtual-ref="virtualTriggerRef"
    >
      <template #content>
        <ul class="open-dropdown__menu">
          <template v-for="item in menuOptions" :key="item.key">
            <li v-if="item.divided" role="separator" class="open-dropdown-separator" />
            <li
              class="open-dropdown__item"
              :class="{ 'is-disabled': item.disabled, 'is-divided': item.divided }"
              @click="handleClickItem(item)"
              :id="`open-dropdown-${item.key}`"
            >
              <RenderVnode :v-node="item.label" />
            </li>
          </template>
        </ul>
      </template>
      <template #default v-if="!splitButton">
        <slot />
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
          <slot />
        </open-button>
        <open-button
          :type="type"
          :disabled="disabled"
          role="button"
          class="caret-button"
          v-on="events"
          ref="triggerRef"
        >
          <open-icon>
            <ArrowDown />
          </open-icon>
        </open-button>
      </open-button-group>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ArrowDown } from '@element-plus/icons-vue';
import { onMounted, reactive, ref, unref, watch } from 'vue';
import { OpenButtonGroup, OpenButton } from '@open-design/components/button';
import OpenToolTip, { ITooltipInstance } from '@open-design/components/tooltip';
import OpenIcon from '@open-design/components/icon';
import RenderVnode from '@open-design/utils/src/RenderVnode';
import type { DropdownProps, DropdownEmits, DropdownInstance, MenuOption } from './types';

defineOptions({
  name: 'OpenDropDown'
});

const props = defineProps<DropdownProps>();
const emits = defineEmits<DropdownEmits>();
const tooltipRef = ref<ITooltipInstance | null>(null);
let events: Record<string, any> = reactive({});
const triggerRef = ref();
const virtualTriggerRef = ref();

const toggleTooltip = () => {
  if (tooltipRef.value?.isOpen) {
    tooltipRef.value?.hide();
  } else {
    tooltipRef.value?.show();
  }
};

const handleEvent = () => {
  if (props.trigger === 'hover') {
    events.mouseenter = tooltipRef.value?.show;
    events.mouseleave = tooltipRef.value?.hide;
  } else {
    events.click = toggleTooltip;
  }
};

onMounted(() => {
  handleEvent();
  // 当使用 splitButton 时，设置改变triggerRef
  if (props.splitButton) {
    virtualTriggerRef.value = unref(triggerRef.value.ref);
  }
});

// tooltip抛出的事件给外面的组件使用
const visibleChange = (val: any) => {
  emits('visible-change', val);
};

const handlerMainButtonClick = (event: MouseEvent) => {
  emits('click', event);
};

const handleClickItem = (item: MenuOption) => {
  if (item.disabled) {
    return;
  }
  emits('select', item);
  if (props.hideAfterClick) {
    tooltipRef?.value.hide();
  }
};

watch(
  () => props.trigger,
  ([newVal, preVal]: [string, string]) => {
    if (newVal === preVal) return;
    events = {};
    if (newVal === 'hover') {
      events.mouseenter = tooltipRef.value?.show();
      events.mouseleave = tooltipRef.value?.hide();
    } else {
      events.click = toggleTooltip;
    }
  }
);

defineExpose<DropdownInstance>({
  show: () => tooltipRef.value?.show(),
  hide: () => tooltipRef.value?.hide()
});
</script>

<style scoped></style>
