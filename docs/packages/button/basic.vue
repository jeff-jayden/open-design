<template>
  <div class="basic block">
    <open-button> Default </open-button>
    <open-button type="primary"> Primary </open-button>
    <open-button type="info"> Info </open-button>
    <open-button type="success"> Success </open-button>
    <open-button type="warning"> Warning </open-button>
    <open-button type="danger"> Danger </open-button>
  </div>

  <div class="plain block">
    <open-button plain> Plain </open-button>
    <open-button type="primary" plain> Primary </open-button>
    <open-button type="info" plain> Info </open-button>
    <open-button type="success" plain> Success </open-button>
    <open-button type="warning" plain> Warning </open-button>
    <open-button type="danger" plain> Danger </open-button>
  </div>

  <div class="round block">
    <open-button round> Round </open-button>
    <open-button type="primary" round> Primary </open-button>
    <open-button type="info" round> Info </open-button>
    <open-button type="success" round> Success </open-button>
    <open-button type="warning" round> Warning </open-button>
    <open-button type="danger" round> Danger </open-button>
  </div>

  <div class="circle block">
    <open-button circle :icon="Search" />
    <open-button type="primary" circle :icon="Share" />
    <open-button type="success" circle :icon="Delete" />
    <open-button type="warning" circle :icon="Star" />
    <open-button type="danger" circle :icon="Close" />
    <open-button type="info" circle :icon="Monitor" />
  </div>
</template>
<script setup>
import { Close, Delete, Monitor, Search, Share, Star } from '@element-plus/icons-vue';
import OpenButton from '@/components/button/button.vue';
</script>
<style>
.block {
  margin-bottom: 10px;
}
</style>
