<template>
  <button
    ref="_ref"
    class="open-button"
    :class="{
      [`open-button--${type}`]: type,
      [`open-button--${size}`]: size,
        'is-plain':plain,
        'is-round':round,
        'is-circle':circle,
        'is-disabled':disabled,
        'is-loading': loading
    }"
    :disabled="disabled || loading"
    :autofocus="autofocus"
    :type="nativeType"
  >
    <OpenIcon icon="spinner" spin v-if="loading"></OpenIcon>
    <OpenIcon :icon="icon" v-if="icon"></OpenIcon>
    <span>
      <slot/>
    </span>
  </button>
</template>

<script setup lang="ts">
import OpenIcon from '@/components/icon/icon.vue'
import type {ButtonProps} from "@/components/button/types";
import {ref} from "vue";

defineOptions({
  name: 'OpenButton'
})

withDefaults(defineProps<ButtonProps>(), {
  nativeType:'button'
})

const _ref = ref<HTMLButtonElement>()

defineExpose({
  ref: _ref
})

</script>

<style>

</style>