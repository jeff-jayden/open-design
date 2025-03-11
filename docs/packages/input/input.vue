<template>
  <open-input v-model="input" style="width: 240px" placeholder="Please input" />
</template>

<script setup lang="ts">
import OpenInput from '@open-design/components/input';
import { ref } from 'vue';

const input = ref('');
</script>
