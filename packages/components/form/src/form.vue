<template>
  <form class="open-form" model="">
    <slot />
  </form>
</template>

<script setup lang="ts">
import { provide, reactive, toRefs, watch } from 'vue';
import type ValidateFieldsError from 'async-validator';
import type { Arrayable } from '@open-design/utils';
import { ensureArray } from '@open-design/utils';
import {
  FormContext,
  FormEmits,
  FormItemContext,
  FormItemProps,
  FormProps,
  FormValidateCallback
} from './types';
import { formContextKey } from './constant';

defineOptions({
  name: 'OpenForm'
});

const props = defineProps<FormProps>();
const emit = defineEmits<FormEmits>();

const fields: FormItemContext[] = [];

// 增加字段
const addField: FormContext['addField'] = (field) => {
  fields.push(field);
};

// 删除字段
const removeField: FormContext['removeField'] = (field) => {
  if (!field.prop) {
    return;
  }

  fields.splice(fields.indexOf(field), 1);
};

// 过滤字段
const filterFields = (fields: FormItemContext[], props: Arrayable<FormItemProps>) => {
  const normalized = ensureArray(props);
  return normalized.length > 0
    ? fields.filter((field) => field.prop && normalized.includes(field.prop))
    : fields;
};

const obtainValidateFields = (props: Arrayable<FormItemProps>) => {
  if (fields.length === 0) return [];

  const filteredFields = filterFields(fields, props);
  if (!filteredFields.length) {
    console.error('please pass correct props!');
    return [];
  }
  return filteredFields;
};

// 校验字段
const doValidateField = async (props: Arrayable<FormItemProps> = []): Promise<boolean> => {
  const fields = obtainValidateFields(props);
  let validationErrors = {};

  for (const field of fields) {
    try {
      await field.validate('');
    } catch (fields) {
      validationErrors = {
        ...validationErrors,
        ...(fields as ValidateFieldsError)
      };
    }
  }
  if (Object.keys(validationErrors).length === 0) return true;
  return Promise.reject(validationErrors);
};

const validateField: FormContext['validateField'] = async (callback, modelProps = []) => {
  const res = await doValidateField(modelProps);

  return res ? callback?.(res) : res;
};

const validate = (callback?: FormValidateCallback) => validateField(undefined, callback);

const resetFields: FormContext['resetFields'] = (properties = []) => {
  if (!props.model) {
    console.error('model is required for resetFields to work.');
    return;
  }
  filterFields(fields, properties).forEach((field) => field.resetField());
};

const clearValidate: FormContext['clearValidate'] = (props = []) => {
  filterFields(fields, props).forEach((field) => field.clearValidate());
};

watch(
  () => props.rules,
  () => {
    validate().catch((err) => console.log(err));
  },
  { deep: true }
);

provide(
  formContextKey,
  reactive({
    ...toRefs(props),

    emit,
    addField,
    removeField,
    validateField,
    resetFields,
    clearValidate
  })
);

defineExpose({
  validate,
  resetFields,
  clearValidate
});
</script>

<style scoped></style>
