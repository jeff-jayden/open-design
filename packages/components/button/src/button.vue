<template>
  <component
    is="button"
    ref="_ref"
    class="open-button"
    :class="{
      [`open-button--${type}`]: type,
      [`open-button--${size}`]: size,
      'is-plain': plain,
      'is-round': round,
      'is-circle': circle,
      'is-disabled': disabled,
      'is-loading': loading
    }"
    :disabled="disabled || loading"
    :autofocus="autofocus"
    :type="nativeType"
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
import { ref } from 'vue';
import { Loading } from '@element-plus/icons-vue';
import OpenIcon from '../../icon';
import type { IProps } from './types';

defineOptions({
  name: 'OpenButton'
});

const props = withDefaults(defineProps<IProps>(), {
  nativeType: 'button',
  loadingIcon: Loading,
  tag: 'button'
});

const _ref = ref<HTMLButtonElement>();

defineExpose({
  ref: _ref
});
</script>

<style></style>
