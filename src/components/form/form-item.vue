<template>
  <div
      ref="formItemRef"
      class="open-form"
      :class="{
        'is-error': validateState === 'error',
      }"
  >
    <div
        class="open-form-item"
    >
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
        <slot/>
        <transition name="open-form-zoom-in-top">
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
import {
  computed,
  inject,
  nextTick,
  onBeforeUnmount,
  onMounted,
  provide,
  reactive,
  ref,
  toRefs,
  useSlots,
  watch
} from "vue";
import {
  FormItemContext,
  FormItemProps,
  FormItemRule,
  FormItemValidateState,
  FormValidateFailure
} from "@/components/form/types";
import {formContextKey, formItemContextKey} from "@/components/form/constant";
import {ensureArray, getProp} from "@/util";
import {Arrayable} from "@/types";
import {RuleItem} from "async-validator";
import {clone, isFunction, isString} from "lodash-es";
import Schema from "async-validator";
import {isNil} from "lodash-unified";

defineOptions({
  name: 'OpenFormItem',
})

const formContext = inject(formContextKey, undefined)
const validateState = ref<FormItemValidateState>('')
const validateMessage = ref('')
const slots = useSlots();
const props = withDefaults(defineProps<FormItemProps>(), {});
const formItemRef = ref<HTMLDivElement>()
let initialValue: any = undefined
let isResettingField = false

//获取父表单绑定得model值 字段值
const fieldValue = computed(() => {
  console.log('JSON.stringify(formContext?.model)' + JSON.stringify(formContext?.model))
  const model = formContext?.model
  
  if (!model || !props.prop) {
    return
  }
  //获取从父表单传入得绑定对象与当前组件对应得属性得值
  return getProp(model, props.prop).value
  // -----玄学 一样得上面得代码在尝试下面得之后又行了？？？--------------------
  //isNil检验是否为null或undefined
  // if (model && props.prop && !isNil(model[props.prop])) {
  //   return getProp(model, props.prop).value;
  // } else {
  //   console.log('没通过')
  //   return null;
  // }
})

//获取校验规则
const normalizedRules = computed(() => {
  const rules: FormItemRule[] = []
  
  //获取父表单传入得规则
  const formRules = formContext?.rules
  //有规则且 当前组件有属性
  if (formRules && props.prop) {
    //获取规则对象中指定属性得规则
    const _rules = getProp<Arrayable<FormItemRule> | undefined>(
        formRules,
        props.prop
    ).value
    if (_rules) {
      rules.push(...ensureArray(_rules))
    }
  }
  console.log('@@@@1' + rules)
  return rules;
})

const setValidationState = (state: FormItemValidateState) => {
  validateState.value = state
}

const getRulesByTrigger = (trigger: string) => {
  let rules = normalizedRules.value;
  return (
      //在获取得指定属性得规则后 过滤出指定trigger得规则
      rules.filter(rule => {
        //没有触发条件 直接返回true
        if (!rule.trigger || !trigger) return true;
        if (Array.isArray(rule.trigger)) {
          return rule.trigger.includes(trigger)
        } else {
          return rule.trigger === trigger
        }
      })
  )
}

const propString = computed(() => {
  if (!props.prop) return ''
  return isString(props.prop) ? props.prop : props.prop.join('.')
})

const onValidationSucceeded = () => {
  setValidationState('success')
  formContext?.emit('validate', props.prop!, true, '')
}

const onValidationFailed = (error: FormValidateFailure) => {
  const {errors, fields} = error
  console.log('error' + JSON.stringify(error))
  console.log('errors' + JSON.stringify(errors) + '   fields' + JSON.stringify(fields))
  if (!errors || !fields) {
    console.error(error + '@@@@@@22222')
  }
  
  setValidationState('error')
  
  /**
   * ??：这是空值合并操作符。
   * 如果左侧的表达式结果为null或undefined，
   * 则会返回右侧的表达式结果。
   */
  
  validateMessage.value = errors
      ? errors?.[0]?.message ?? `${props.prop} is required`
      : ''
  console.log('error.errors'+error.errors)
  formContext?.emit('validate', props.prop!, false, validateMessage.value)
}

const doValidate = async (rules: RuleItem[]): Promise<true> => {
  //获取属性名
  const modelName = propString.value;
  //创建validator
  const validator = new Schema({
    //设置规则
    [modelName]: rules
  })
  
  console.log('fieldValue' + fieldValue.value)
  
  
  return validator
      //校验值
      .validate({[modelName]: fieldValue.value})
      .then(() => {
        console.log('fieldValue' + fieldValue.value)
        onValidationSucceeded()
        return true as const
      })
      .catch((err: FormValidateFailure) => {
        console.log('fieldValue' + fieldValue.value)
        console.log(JSON.stringify('err@@@@@' + JSON.stringify(err)))
        onValidationFailed(err as FormValidateFailure)
        return Promise.reject(err)
      })
  
}

const validate: FormItemContext['validate'] = async (trigger, callback) => {
  
  const hasCallback = isFunction(callback)
  
  //获取指定属性得指定触发得trigger规则
  const rules = getRulesByTrigger(trigger)
  console.log(JSON.stringify(rules) + '@@@@@2')
  //如果没有规则直接返回true 就不会有后面得检验了
  if (rules.length === 0) {
    callback?.(true)
    return true
  }
  
  setValidationState('validating')
  try {
    await doValidate(rules);
    //如果有回调函数就执行
    callback?.(true);
    return true as const;
  } catch (err) {
    const {fields} = err;
    callback?.(false, fields);
    return hasCallback ? false : Promise.reject(fields);
  }
}


const shouldShowError = computed(() =>
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
      console.log(`${props.label + '@@@@3' || ''}`)
      return `${props.label || ''}`
    }
)

watch(
    () => props.error,
    (val) => {
      validateMessage.value = val || ''
      setValidationState(val ? 'error' : '')
    },
    {immediate: true}
)


const clearValidate: FormItemContext['clearValidate'] = () => {
  setValidationState('')
  validateMessage.value = ''
  isResettingField = false
}

const resetField: FormItemContext['resetField'] = async () => {
  const model = formContext?.model
  if (!model || !props.prop) return
  
  const computedValue = getProp(model, props.prop)
  
  // prevent validation from being triggered
  isResettingField = true
  
  computedValue.value = clone(initialValue)
  
  await nextTick()
  clearValidate()
  
  isResettingField = false
}

const context: FormItemContext = reactive({
  ...toRefs(props),
  $el: formItemRef,
  validateState,
  hasLabel,
  fieldValue,
  validate,
  clearValidate,
  resetField
})

provide(formItemContextKey, context)

onMounted(() => {
  console.log('mouted了@@@@')
  if (props.prop) {
    console.log(props.prop + 'props.prop')
    formContext?.addField(context)
    initialValue = clone(fieldValue.value)
  }
})

onBeforeUnmount(() => {
  formContext?.removeField(context)
})

defineExpose({
  validate,
  clearValidate,
  resetField
})

</script>

<style scoped>

</style>