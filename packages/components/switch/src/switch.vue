<template>
  <div
    class="open-switch"
    :style="{
      '--open-switch-on-color': onColor,
      '--open-switch-off-color': offColor
    }"
    :class="{
      [`open-switch--${size}`]: size,
      'is-disabled': disabled,
      'is-checked': checked
    }"
    @click.prevent="handleChange"
  >
    <input
      type="checkbox"
      ref="input"
      class="input"
      :true-value="activeValue"
      :false-value="inactiveValue"
      role="switch"
      :disabled="disabled"
    />
    <div class="open-switch__core">
      <div class="open-switch-core__inner">
        <span v-if="activeText || inactiveText" class="snow-switch__core-inner-text">
          {{ checked ? activeText : inactiveText }}
        </span>
      </div>
      <div class="open-switch-core__action" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';

import { ISwitchEmits, ISwitchProps } from './types';

const props = withDefaults(defineProps<ISwitchProps>(), {
  activeValue: true,
  inactiveValue: false
});
const emits = defineEmits<ISwitchEmits>();
const input = ref<HTMLInputElement>(null);
// 实际值
const actualValue = ref(props.modelValue);

// 判断当前实际值是否与选中值一样 显示选择与否
const checked = computed(() => actualValue.value === props.activeValue);

defineOptions({
  name: 'OpenSwitch'
});

onMounted(() => {
  input.value!.checked = checked.value;
});

const handleChange = () => {
  if (props.disabled) return;
  const newValue = checked.value ? props.inactiveValue : props.activeValue;
  actualValue.value = newValue;
  // console.log(actualValue.value)
  // 1.改变选中的值 触发事件
  emits('update:modelValue', newValue);
  emits('change', newValue);
};
</script>

<style scoped></style>
