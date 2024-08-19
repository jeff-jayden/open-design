<template>
  <i
    class="open-icon"
    :class="{
      loading: loading
    }"
    :style="customStyles"
    v-bind="$attrs"
  >
    <slot />
  </i>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { IconProps } from './types';

defineOptions({
  name: 'OpenIcon',
  inheritAttrs: false
});

const props = defineProps<IconProps>();
const customStyles = computed(() => (props.color ? { color: props.color } : {}));
</script>

<style scoped></style>
