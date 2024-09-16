<template>
  <open-input v-model="input" style="width: 240px" placeholder="Please input" />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import OpenInput from '@/components/input';

const input = ref('');
</script>
