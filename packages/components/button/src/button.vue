<template>
  <component
    :is="tag"
    ref="_ref"
    class="open-button"
    v-bind="$attrs"
    :class="buttonKls"
    :disabled="disabled || loading"
    :autofocus="autofocus"
    :type="nativeType"
    @click="handleClick"
  >
    <span
      v-if="$slots.default"
      :class="{
        'has-right': $slots.default && (loading || icon)
      }"
      class="default-slot"
    >
      <slot />
    </span>
    <template v-if="loading">
      <!--      如果loading插槽被填充才显示-->
      <slot v-if="$slots.loading" name="loading" />
      <open-icon v-else class="open-is-loading">
        <component :is="loadingIcon" />
      </open-icon>
    </template>
    <open-icon v-else-if="icon || $slots.icon">
      <component :is="icon" v-if="icon" />
      <slot v-else name="icon" />
    </open-icon>
  </component>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { Loading } from '@element-plus/icons-vue';
import OpenIcon from '@open-design/components/icon';
import type { IProps } from './types';

defineOptions({
  name: 'OpenButton'
});

const props = withDefaults(defineProps<IProps>(), {
  nativeType: 'button',
  loadingIcon: Loading,
  tag: 'button'
});

const emit = defineEmits(['click']);

const _ref = ref<HTMLButtonElement>();

const buttonKls = computed(() => {
  return {
    [`open-button--${props.type}`]: props.type,
    [`open-button--${props.size}`]: props.size,
    'is-plain': props.plain,
    'is-round': props.round,
    'is-circle': props.circle,
    'is-disabled': props.disabled,
    'is-loading': props.loading
  };
});

const handleClick = (e: MouseEvent) => {
  if (props.disabled || props.loading) {
    e.stopPropagation();
    return;
  }
  // TODO
  // if (props.nativeType === 'reset') {
  //   form?.resetFields()
  // }
  emit('click', e);
};

defineExpose({
  ref: _ref
});
</script>
