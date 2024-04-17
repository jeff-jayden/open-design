<template>
  <Icon icon="arrow-up" size="2xl"  type="danger" color="#0e7a0d" />
  <OpenButton type="danger" :loading="false" icon="arrow-down">Primary</OpenButton>
  <Button plain >Plain Button</Button>
</template>

<script setup lang="ts">
import OpenButton from '@/components/button/button.vue'
import Icon from '@/components/icon/icon.vue'
import {Button} from "@jeff-jayden/open-design";
import {onMounted} from "vue";


onMounted(()=>{
  console.log('aaaa' + import.meta.url)
})

</script>

<style scoped>

</style>
