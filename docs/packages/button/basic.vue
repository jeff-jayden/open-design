<template>
<div class="basic block">
  <OpenButton> Default </OpenButton>
  <OpenButton type="primary"> Primary </OpenButton>
  <OpenButton type="info"> Info </OpenButton>
  <OpenButton type="success"> Success </OpenButton>
  <OpenButton type="warning"> Warning </OpenButton>
  <OpenButton type="danger"> Danger </OpenButton>
</div>

<div class="plain block">
  <OpenButton plain> Plain </OpenButton>
  <OpenButton type="primary" plain> Primary </OpenButton>
  <OpenButton type="info" plain> Info </OpenButton>
  <OpenButton type="success" plain> Success </OpenButton>
  <OpenButton type="warning" plain> Warning </OpenButton>
  <OpenButton type="danger" plain> Danger </OpenButton>
</div>

<div class="round block">
  <OpenButton round> Round </OpenButton>
  <OpenButton type="primary" round> Primary </OpenButton>
  <OpenButton type="info" round> Info </OpenButton>
  <OpenButton type="success" round> Success </OpenButton>
  <OpenButton type="warning" round> Warning </OpenButton>
  <OpenButton type="danger" round> Danger </OpenButton>
</div>

<div class="circle block">
  <OpenButton circle> <OpenIcon icon="magnifying-glass" /> </OpenButton>
  <OpenButton type="primary" circle> <OpenIcon icon="magnifying-glass" /> </OpenButton>
  <OpenButton type="success" circle> <OpenIcon icon="magnifying-glass" /> </OpenButton>
  <OpenButton type="warning" circle> <OpenIcon icon="magnifying-glass" /> </OpenButton>
  <OpenButton type="danger" circle> <OpenIcon icon="magnifying-glass" /> </OpenButton>
  <OpenButton type="info" circle> <OpenIcon icon="magnifying-glass" /> </OpenButton>
</div>
</template>
<script setup>
import OpenButton from '@/components/button/button.vue'
import OpenIcon from '@/components/icon/icon.vue'
</script>
<style>
.block {
  margin-bottom: 10px;
}
</style>