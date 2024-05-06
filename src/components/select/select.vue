<template>
  <div
      ref="selectRef"
  >
    <open-tool-tip
        ref="tooltipRef"
        content="open-select"
        :effect="effect"
    >
      <template #default>
        <div>
          <open-input
              type="text"
              ref="inputRef"
              v-model="states.inputValue"
              @click.stop="toggleMenu"
          />
        </div>
      </template>
      <template #content>
        <div>
          no match data
        </div>
      </template>
    </open-tool-tip>
  </div>
</template>

<script setup lang="ts">

import OpenToolTip from "@/components/tooltip/tooltip.vue";
import {computed, reactive, ref} from "vue";
import {OpenSelectProps} from "@/components/select/type";
import OpenInput from "@/components/input/input.vue";

defineOptions({
  name: 'OpenSelect'
})

const props = defineProps<OpenSelectProps>()

const selectDisabled = computed(() => props.disabled)
const states = reactive({
  inputValue: '',
})

const inputRef = ref<HTMLInputElement>(null)

const focus = () => {
  inputRef.value?.focus()
}

const toggleMenu = () => {
  if (selectDisabled.value) return
  
  // if (states.menuVisibleOnFocus) {
  //   // controlled by automaticDropdown
  //   states.menuVisibleOnFocus = false
  // } else {
  //   expanded.value = !expanded.value
  // }
}

</script>

<style scoped>

</style>