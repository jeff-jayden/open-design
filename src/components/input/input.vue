<template>
  
  <div
      class="open-input"
      :class="{
        [`open-input-${type}`]: type
      }"
  >
    <!--    template默认不显示-->
    <template v-if="type!=='textarea'">
      <div
          ref="wrapperRef"
          class="open-input__wrapper"
          :class="{
          'is-focus': isFocus
       }"
      >
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
            :type="showPassword ? (passwordVisible ? 'text' : 'password') : type"
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
            <el-icon
                v-if="showPwdVisible"
                :class="['open-input__icon', 'open-input__password']"
                @click="handlePasswordVisible"
            >
              <component :is="passwordIcon"/>
            </el-icon>
            <span v-if="isWordLimitVisible" class="open-input-count">
              <span class="open-input-count-inner">
                {{ textLength }} / {{ maxlength }}
              </span>
            </span>
            
          </span>
        </span>
      
      </div>
    </template>
    
    <template v-else>
      <textarea
          v-model="innerValue"
          class="open-textarea__inner"
          ref="textarea"
          v-bind="$attrs"
          :minlength="minlength"
          :maxlength="maxlength"
          :placeholder="placeholder"
          @input="handleInput"
          @focus="handleFocus"
          @blur="handleBlur"
          @change="handleChange"
          @keydown="handleKeydown"
      />
      <span
          v-if="isWordLimitVisible"
          class="open-input__count"
      >
        {{ textLength }} / {{ maxlength }}
      </span>
    </template>
  </div>

</template>

<script lang="ts" setup>

import {InputEmits, InputProps} from "@/components/input/types";
import {computed, nextTick, ref, shallowRef, useSlots} from "vue";
import {UPDATE_MODEL_EVENT} from "@/constants";
import {
  CircleClose,
  Hide as IconHide,
  View as IconView,
} from '@element-plus/icons-vue'
import {isNil} from "lodash-unified";


const props = withDefaults(defineProps<InputProps>(), {
  showPassword: false,
  type: 'text'
})
const emit = defineEmits<InputEmits>()
const slots = useSlots()

defineOptions({
  name: 'OpenInput',
  inheritAttrs: false
})
const input = shallowRef<HTMLInputElement>()
const textarea = shallowRef<HTMLTextAreaElement>()
const innerValue = ref(props.modelValue)
const isFocus = ref(false)
const passwordVisible = ref(false)
const _ref = computed(() => input.value || textarea.value)


const handlePasswordVisible = () => {
  passwordVisible.value = !passwordVisible.value
  focus()
}

const focus = async () => {
  // see: https://github.com/ElemeFE/element/issues/18573
  await nextTick()
  _ref.value?.focus()
}

const passwordIcon = computed(() =>
    passwordVisible.value ? IconView : IconHide
)

const showPwdVisible = computed(
    () =>
        props.showPassword &&
        !props.readonly &&
        !!nativeInputValue.value &&
        (!!nativeInputValue.value || isFocus.value)
)

const nativeInputValue = computed(() =>
    isNil(props.modelValue) ? '' : String(props.modelValue)
)

const textLength = computed(() =>
    nativeInputValue.value.length
)

const showClear = computed(() =>
    props.clearable &&
    !props.disabled &&
    !!innerValue.value
)

const suffixVisible = computed(() =>
    !!slots.suffix ||
    !!props.suffixIcon ||
    showClear.value
)

const isWordLimitVisible = computed(
    () =>
        // !!props.showWordLimit &&
        !!props.maxlength &&
        (props.type === 'text' || props.type === 'textarea') &&
        !props.readonly &&
        !props.showPassword
)

const handleInput = () => {
  emit(UPDATE_MODEL_EVENT, innerValue.value)
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

defineExpose({
  /** @description HTML input element */
  input,
  /** @description HTML textarea element */
  textarea,
  /** @description HTML element, input or textarea */
  ref: _ref,
  focus,
  /** @description HTML input element native method */
  blur,
  /** @description clear input value */
  clear,
})

</script>

<style lang="scss" scoped>

</style>