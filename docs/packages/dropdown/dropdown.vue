<template>
  <open-dropdown :menu-options="menuOptions" trigger="click">
    <open-button
      >Dropdown List
      <open-icon><ArrowDown /></open-icon>
    </open-button>
  </open-dropdown>
  <open-dropdown :menu-options="menuOptions" trigger="click" split-button type="primary">
    Dropdown List
  </open-dropdown>
</template>

<script setup lang="ts">
import OpenDropdown from '@open-design/components/dropdown';
import OpenButton from '@open-design/components/button';
import { ArrowDown, ArrowRight } from '@element-plus/icons-vue';
import OpenIcon from '@open-design/components/icon';
import eldropdown from 'element-plus';

const menuOptions = [
  {
    label: 'Action 1',
    key: 1,
    disabled: true
  },
  {
    label: 'Action 2',
    key: 2,
    divided: true
  },
  {
    label: 'Action 3',
    key: 3
  },
  {
    label: 'Action 4',
    key: 4
  }
];
</script>
