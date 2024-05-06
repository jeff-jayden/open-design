<template>
  <div
    class="open-input"
  >
    <template v-if="type !== 'textarea'">
      <div ref="wrapperRef">
        <!-- prefix slot -->
        <span v-if="$slots.prefix || prefixIcon" class="open-prefix">
          <span class="open-prefix-inner">
            <slot name="prefix" />
            <el-icon v-if="prefixIcon" class="open-icon">
              <component :is="prefixIcon" />
            </el-icon>
          </span>
        </span>
        
        <input
          ref="input"
          v-bind="$attrs"
          :type="showPassword ? (passwordVisible ? 'text' : 'password') : type"
          :minlength="minlength"
          :maxlength="maxlength"
          :placeholder="placeholder"
          :autofocus="autofocus"
         />
      </div>
      
    </template>
    <template v-else></template>
  </div>
</template>

<script setup lang="ts">
import {InputEmits, InputProps} from "@/components/input/types";
import {ref} from "vue";

const props = defineProps<InputProps>()
const emits = defineEmits<InputEmits>()
const passwordVisible = ref(false)

</script>

<style scoped>

</style>