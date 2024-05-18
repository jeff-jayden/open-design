<template>
  <open-dropdown
    :menu-options="menuOptions"
  >
    <open-button>Dropdown List</open-button>
  </open-dropdown>
</template>

<script setup lang="ts">
import OpenDropdown from '@/components/dropdown'
import OpenButton from "@/components/button";

const menuOptions = [
  {
    label: '大撒大撒',
    key: 1,
    disabled: true
  },
  {
    label: '大撒大撒',
    key: 2,
    divided: true
  },
  {
    label: '大撒大撒',
    key: 3,
  },
  {
    label: '大撒大撒',
    key: 4,
  }
]
</script>
