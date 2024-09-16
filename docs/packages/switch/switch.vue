<template>
  <open-switch v-model="value1" />
  <open-switch v-model="value1" on-color="#13ce66" off-color="#ff4949" style="margin-left: 4px" />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import OpenSwitch from '@/components/switch';

const value1 = ref(true);
</script>
