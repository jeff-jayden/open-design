<template>
  <OpenButton type="success" plain>提交</OpenButton>
  <el-dropdown :popper-options="menuOptions" trigger="click" split-button type="primary">
    elDropdown List
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item>Action 1</el-dropdown-item>
        <el-dropdown-item>Action 2</el-dropdown-item>
        <el-dropdown-item>Action 3</el-dropdown-item>
        <el-dropdown-item>Action 4</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import { OpenButton } from '@open-design/components/button';

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

<style scoped></style>
