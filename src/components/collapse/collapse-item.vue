<template>
<div class="snow-collapse-item"
     :class="{
      'is-disabled': disabled,
    }"
>
  <div></div>
</div>
</template>

<script setup lang="ts">
import {ref} from "vue";

const disabled = ref(true)
</script>

<style scoped>

</style>