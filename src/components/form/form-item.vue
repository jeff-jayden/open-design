<template>
  <div
    ref="formItemRef"
    class="open-form"
  >
    <div class="open-form-item">
      <component
          :is="labelFor ? 'label' : 'div'"
          v-if="hasLabel"
          class="open-form-label"
          :for="labelFor"
      >
        <slot name="label" :label="currentLabel">
          {{ currentLabel }}
        </slot>
      </component>
      
      <div class="open-form-content">
        <slot />
          <transition name="open-form-zoom-in-top`">
            <slot v-if="shouldShowError" name="error" :error="validateMessage">
              <div class="open-form-error">
                {{ validateMessage }}
              </div>
            </slot>
          </transition>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

import {computed, ref, useSlots, watch} from "vue";
import {FormItemProps, FormItemValidateState, FormProps} from "@/components/form/types";

defineOptions({
  name: 'OpenFormItem',
})

const validateState = ref<FormItemValidateState>('')
const validateMessage = ref('')
const slots = useSlots();
const props = withDefaults(defineProps<FormItemProps>(), {
});

const shouldShowError = computed(()=>
  props.showMessage
)

const labelFor = computed<string | undefined>(() =>
      props.for || undefined
)

const hasLabel = computed<boolean>(() => {
  return !!(props.label || slots.label)
})

const currentLabel = computed(
    () => {
      console.log(`${props.label || ''}`)
      return `${props.label || ''}`
    }
)

const setValidationState = (state: FormItemValidateState) => {
  validateState.value = state
}

watch(
    () => props.error,
    (val) => {
      validateMessage.value = val || ''
      setValidationState(val ? 'error' : '')
    },
    { immediate: true }
)

</script>

<style scoped>

</style>