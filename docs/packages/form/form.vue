<template>
  <open-form
      :model="form"
      :rules="rules"
      style="width: 600px"
  >
    <open-form-item
        label="Activity name"
        show-message
        prop="name"
    >
      <OpenInput id="hello" v-model="form.name"/>
    </open-form-item>
  </open-form>
</template>

<script setup lang="ts">

import OpenForm from "@/components/form/form.vue";
import OpenInput from "@/components/input";
import OpenFormItem from "@/components/form/form-item.vue";
import {reactive} from "vue";


const form = reactive({
  name: '',
  region: '',
  date1: '',
  date2: '',
  delivery: false,
  type: [],
  resource: '',
  desc: '',
})

const rules = reactive({
  name: [
    { required: true, message: 'Please input Activity name', trigger: 'blur' },
    { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
  ]
})
</script>

<style scoped>

</style>