<template>
  <div class="open-button-group">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { provide, reactive, toRef } from 'vue';
import { buttonGroupContextKey, ButtonGroupProps } from '@/components/button/types';

defineOptions({
  name: 'OpenButtonGroup'
});

const props = defineProps<ButtonGroupProps>();

provide(
  buttonGroupContextKey,
  reactive({
    size: toRef(props, 'size'),
    type: toRef(props, 'type')
  })
);
</script>

<style scoped></style>
