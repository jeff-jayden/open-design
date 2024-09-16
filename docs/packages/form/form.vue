<template>
  <open-form :model="form" :rules="rules" style="width: 600px">
    <open-form-item label="Activity name" show-message prop="name">
      <open-input id="name" v-model="form.name" />
    </open-form-item>
    <open-form-item label="Activity region" show-message prop="region">
      <open-select v-model="form.region" placeholder="Select" :options="options" />
    </open-form-item>
  </open-form>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import OpenForm from '@/components/form/form.vue';
import OpenInput from '@/components/input';
import OpenFormItem from '@/components/form/form-item.vue';
import OpenSelect from '@/components/select';

const form = reactive({
  name: '',
  region: '',
  date1: '',
  date2: '',
  delivery: false,
  type: [],
  resource: '',
  desc: ''
});

const options = [
  {
    value: 'Option1',
    label: 'Option1',
    disabled: true
  },
  {
    value: 'Option2',
    label: 'Option2'
  },
  {
    value: 'Option3',
    label: 'Option3'
  },
  {
    value: 'Option4',
    label: 'Option4'
  },
  {
    value: 'Option5',
    label: 'Option5'
  }
];

const rules = reactive({
  name: [
    { required: true, message: 'Please input Activity name', trigger: 'blur' },
    { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' }
  ],
  region: [{ required: true, message: 'Please input Activity region', trigger: 'blur' }]
});
</script>

<style scoped></style>
