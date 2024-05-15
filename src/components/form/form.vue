<template>
  <form class="open-form">
    <slot />
  </form>
</template>

<script setup lang="ts">

import {FormProps} from "@/components/form/types";

defineOptions({
  name: 'OpenForm'
})

const props = defineProps<FormProps>()

</script>

<style scoped>

</style>