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
    <template v-if="loading">
      <!--      如果是加载中，是使用插槽还是直接属性传-->
      <!--      如果loading插槽被填充才显示-->
      <slot name="loading" v-if="$slots.loading" />
      <op-icon class="open-is-loading" v-else>
        <component :is="loadingIcon" />
      </op-icon>
    </template>
    <!--    不是加载中，显示绑定的icon-->
    <op-icon v-else-if="icon || $slots.icon">
      <component :is="icon" v-if="icon" />
      <slot v-else name="icon" />
    </op-icon>
    <span
      v-if="$slots.default"
      :class="{
        'has-left': $slots.default && (loading || icon)
      }"
      class="default-slot"
    >
      <slot />
    </span>
  </component>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Loading } from '@element-plus/icons-vue';
import OpIcon from '@/components/icon/icon.vue';
import { IButtonProps } from '@/components/button/types';

defineOptions({
  name: 'OpenButton'
});

const props = withDefaults(defineProps<IButtonProps>(), {
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
