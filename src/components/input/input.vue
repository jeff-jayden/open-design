<template>
  
  <div
      class="open-input"
  >
    <!--    template默认不显示-->
    <template v-if="type!=='textarea'">
      <div ref="wrapperRef" class="open-input__wrapper">
        <!-- prefix slot -->
        <span v-if="$slots.prefix || prefixIcon" class="open-input__prefix">
          <span class="open-input__prefix-inner">
            <slot name="prefix"/>
            <el-icon v-if="prefixIcon" class="open-input__icon">
              <Component :is="prefixIcon"/>
            </el-icon>
          </span>
        </span>
        <input
            ref="input"
            class="open-input__inner"
            :placeholder="placeholder"
            v-model="innerValue"
            :minlength="minlength"
            :maxlength="maxlength"
            :type="showPassword ? 'text' : 'password'"
            @input="handleInput"
            @blur="handleBlur"
            @focus="handleFocus"
            @change="handleChange"
            @keydown="handleKeydown"
        />
        <!-- suffix slot -->
        <span v-if="suffixVisible" class="open-input__suffix">
          <span class="open-input__suffix-inner">
            <slot name="suffix"/>
            <el-icon
                v-if="showClear"
                class="open-input__icon open-input__clear"
                @click="clear"
            >
              <circle-close/>
            </el-icon>
            <!--            <el-icon-->
            <!--                v-if="showPwdVisible"-->
            <!--                :class="[nsInput.e('icon'), nsInput.e('password')]"-->
            <!--                @click="handlePasswordVisible"-->
            <!--            >-->
            <!--              <component :is="passwordIcon"/>-->
            <!--            </el-icon>-->
            
          </span>
        </span>
      
      </div>
    </template>
    
    <template v-else>
    
    </template>
  </div>

</template>

<script lang="ts" setup>

import {InputEmits, InputProps} from "@/components/input/types";
import {computed, ref, useSlots} from "vue";
import {UPDATE_MODEL_EVENT} from "@/constants";
import {
  CircleClose,
} from '@element-plus/icons-vue'


const props = defineProps<InputProps>()
const emit = defineEmits<InputEmits>()
const slots = useSlots()

defineOptions({
  name: 'OpenInput'
})

const innerValue = ref(props.modelValue)
const isFocus = ref(false)

const showClear = computed(() => props.clearable)

const suffixVisible = computed(() =>
    !!slots.suffix ||
    !!props.suffixIcon ||
    showClear.value
)

const handleInput = () => {
  emit('input', innerValue.value)
}

const handleFocus = (event: FocusEvent) => {
  isFocus.value = true
  emit('focus', event)
}
const handleBlur = (event: FocusEvent) => {
  console.log('blur triggered')
  isFocus.value = false
  emit('blur', event)
}

const handleChange = () => {
  emit('change', innerValue.value)
}

const handleKeydown = (evt: KeyboardEvent) => {
  emit('keydown', evt)
}

const clear = () => {
  innerValue.value = ''
  emit(UPDATE_MODEL_EVENT, '')
  emit('change', '')
  emit('clear')
  emit('input', '清楚了')
}

</script>

<style lang="scss" scoped>

</style>