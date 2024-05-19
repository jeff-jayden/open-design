<template>
  <open-select
      placeholder="Select"
      :options="options"
      v-model="selectValue"
      :suffix-icon="ArrowDown"
      clearable
      placement="bottom"
  />
</template>

<script setup lang="ts">
import OpenSelect from "@/components/select";
import {ref} from "vue";
import {ArrowDown} from "@element-plus/icons-vue";

const selectValue = ref('')

const options = [
  {
    value: 'Option1',
    label: 'Option1',
  },
  {
    value: 'Option2',
    label: 'Option2',
  },
  {
    value: 'Option3',
    label: 'Option3',
  },
  {
    value: 'Option4',
    label: 'Option4',
    disabled: true
  },
  {
    value: 'Option5',
    label: 'Option5',
  },
]

</script>