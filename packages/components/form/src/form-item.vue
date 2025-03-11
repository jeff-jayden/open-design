<template>
  <div
    ref="formItemRef"
    class="open-form-item"
    :class="{
      'is-error': validateState === 'error'
    }"
  >
    <div class="open-form-item_lable">
      <component
        :is="labelFor ? 'label' : 'div'"
        v-if="hasLabel"
        class="open-form-label"
        :class="{
          'is-required': isRequired
        }"
        :for="labelFor"
      >
        <slot name="label" :label="currentLabel">
          {{ currentLabel }}
        </slot>
      </component>
    </div>
    <div class="open-form-content">
      <slot />
      <transition name="open-form-zoom-in-top">
        <slot v-if="shouldShowError" name="error" :error="validateMessage">
          <div class="open-form-error" v-if="validateState === 'error'">
            {{ validateMessage }}
          </div>
        </slot>
      </transition>
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
} from 'vue';
import Schema, { RuleItem } from 'async-validator';
import { clone, isFunction, isString } from 'lodash-es';
import {
  FormContext,
  FormItemContext,
  FormItemProps,
  FormItemRule,
  FormItemValidateState,
  FormValidateFailure
} from '@open-design/components/form';
import { formContextKey, formItemContextKey } from '@open-design/components/form';
import { ensureArray, getProp } from '@open-design/utils';
import { Arrayable } from '@open-design/utils';

defineOptions({
  name: 'OpenFormItem'
});

const props = withDefaults(defineProps<FormItemProps>(), {});
const slots = useSlots();
const formContext = inject(formContextKey, undefined);

const validateState = ref<FormItemValidateState>('');
const validateMessage = ref('');
const formItemRef = ref<HTMLDivElement>(null);
const initialValue: any = ref();
const isResettingField = ref(false);

// 获取校验规则
const normalizedRules = computed(() => {
  const rules: FormItemRule[] = [];

  // 获取父表单传入得规则
  const formRules = formContext?.rules;
  // 有规则且 当前组件有属性
  if (formRules && props.prop) {
    // 获取规则对象中指定属性得规则
    const _rules = getProp<Arrayable<FormItemRule> | undefined>(formRules, props.prop).value;
    if (_rules) {
      rules.push(...ensureArray(_rules));
    }
  }
  return rules;
});

const isRequired = computed(() => {
  return normalizedRules.value.some((rule) => rule.required);
});

// 获取父表单绑定得model值 字段值
const fieldValue = computed(() => {
  console.log(`JSON.stringify(formContext?.model)${JSON.stringify(formContext?.model)}`);
  const model = formContext?.model;

  if (!model || !props.prop) {
    return;
  }
  // 获取从父表单传入得绑定对象与当前组件对应得属性得值
  return getProp(model, props.prop).value || '';
});

const setValidationState = (state: FormItemValidateState) => {
  validateState.value = state;
};

const getRulesByTrigger = (trigger: string) => {
  const rules = normalizedRules.value;
  return (
    // 在获取得指定属性得规则后 过滤出指定trigger得规则
    rules.filter((rule) => {
      // 没有触发条件 直接返回true
      if (!rule.trigger || !trigger) return true;
      if (Array.isArray(rule.trigger)) {
        return rule.trigger.includes(trigger);
      }
      return rule.trigger === trigger;
    })
  );
};

const propString = computed(() => {
  if (!props.prop) return '';
  return isString(props.prop) ? props.prop : props.prop.join('.');
});

const onValidationSucceeded = () => {
  setValidationState('success');
  formContext?.emit('validate', props.prop!, true, '');
};

const onValidationFailed = (error: FormValidateFailure) => {
  const { errors, fields } = error;
  console.log(`errors${JSON.stringify(errors)}   fields${JSON.stringify(fields)}`);

  setValidationState('error');

  /**
   * ??：这是空值合并操作符。
   * 如果左侧的表达式结果为null或undefined，
   * 则会返回右侧的表达式结果。
   */

  validateMessage.value = errors ? (errors[0]?.message ?? `${props.prop} is required`) : '';
  formContext?.emit('validate', props.prop!, false, validateMessage.value);
};

const doValidate = async (rules: RuleItem[]): Promise<true> => {
  // 获取属性名
  const modelName = propString.value;
  // 创建validator
  const validator = new Schema({
    // 设置规则
    [modelName]: rules
  });

  console.log(`fieldValue${fieldValue.value}`);

  return (
    validator
      // 校验值
      .validate({ [modelName]: fieldValue.value })
      .then(() => {
        console.log(`fieldValue${fieldValue.value}`);
        onValidationSucceeded();
        return true as const;
      })
      .catch((err: FormValidateFailure) => {
        console.log(JSON.stringify(`err@@@@@${JSON.stringify(err, null, 2)}`));
        onValidationFailed(err as FormValidateFailure);
        return Promise.reject(err);
      })
  );
};

// 暴露给外部使用的
const validate: FormItemContext['validate'] = async (trigger, callback) => {
  const hasCallback = isFunction(callback);

  // 获取指定属性得指定触发得trigger规则
  const rules = getRulesByTrigger(trigger);
  // 如果没有规则直接返回true 就不会有后面得检验了
  if (rules.length === 0) {
    callback?.(true);
    return true;
  }

  setValidationState('validating');
  try {
    await doValidate(rules);
    // 如果有回调函数就执行
    callback?.(true);
    return true as const;
  } catch (err) {
    const { fields } = err;
    callback?.(false, fields);
    return hasCallback ? false : Promise.reject(fields);
  }
};

const shouldShowError = computed(() => props.showMessage);

const labelFor = computed<string | undefined>(() => props.for || undefined);

const hasLabel = computed<boolean>(() => {
  return !!(props.label || slots.label);
});

const currentLabel = computed(() => {
  console.log(`${`${props.label}@@@@3` || ''}`);
  return `${props.label || ''}`;
});

watch(
  () => props.error,
  (val) => {
    validateMessage.value = val || '';
    setValidationState(val ? 'error' : '');
  },
  { immediate: true }
);

const clearValidate: FormItemContext['clearValidate'] = () => {
  setValidationState('');
  validateMessage.value = '';
  isResettingField.value = false;
};

const resetField: FormItemContext['resetField'] = async () => {
  const model = formContext?.model;
  if (!model || !props.prop) return;

  const computedValue = getProp(model, props.prop);

  // prevent validation from being triggered
  isResettingField.value = true;

  computedValue.value = clone(initialValue);

  await nextTick();
  clearValidate();

  isResettingField.value = false;
};

const context: FormItemContext = reactive({
  ...toRefs(props),
  $el: formItemRef,
  validateState,
  hasLabel,
  fieldValue,
  validate,
  clearValidate,
  resetField
});

onMounted(() => {
  if (!props.prop) {
    return;
  }
  formContext?.addField(context);
  initialValue.value = clone(fieldValue.value);
});

onBeforeUnmount(() => {
  formContext?.removeField(context);
});

provide(formItemContextKey, context);

defineExpose({
  validate,
  clearValidate,
  resetField
});
</script>

<style scoped></style>
