<template>
  <div class="icon block">
    <open-icon icon="rocket" />
    <open-icon icon="file" />
    <open-icon icon="plane" />
    <open-icon icon="rocket" />
    <open-icon icon="gear" />
    <open-icon icon="search" />
    <open-icon icon="plane" />
    <open-icon icon="rocket" />
    <open-icon icon="trash" />
  </div>
</template>

<script setup>
import openIcon from '@open-design/components/icon';
</script>

<style>
.icon {
  display: flex;
  justify-content: space-around;
  align-items: center;
}
</style>
