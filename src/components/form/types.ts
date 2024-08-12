import { RuleItem, type ValidateError, ValidateFieldsError } from 'async-validator';
import { Arrayable } from '@/types';

export interface FormValidateFailure {
  errors: ValidateError[] | null;
  fields: ValidateFieldsError;
}

/**
 上下文用到的东西
 */
export type FormValidationResult = Promise<boolean>;
export type FormValidateCallback = (isValid: boolean, invalidFields?: ValidateFieldsError) => void;

export interface FormItemProps {
  size?: string;
  disabled?: boolean;
  for?: string;
  label?: string;
  error?: string;
  required?: boolean;
  showMessage?: boolean;
  prop: string;
}

export const formItemValidateStates = ['', 'error', 'validating', 'success'] as const;

export type FormItemValidateState = (typeof formItemValidateStates)[number];

export interface FormItemContext extends FormItemProps {
  $el: HTMLDivElement | undefined;
  validateState: FormItemValidateState;
  hasLabel: boolean;
  fieldValue: any;
  validate: (trigger: string, callback?: FormValidateCallback) => FormValidationResult;
  resetField(): void;
  clearValidate(): void;
}

/**
 * 规则类型
 */
export interface FormItemRule extends RuleItem {
  trigger?: string;
}

export type FormRules = Record<string, FormItemRule[]>;

export interface FormProps {
  model: Object;
  rules?: FormRules;
}

export type FormContext = FormProps & {
  addField: (field: FormItemContext) => void;
  removeField: (field: FormItemContext) => void;
  resetFields: (props?: Arrayable<FormItemProps>) => void;
  clearValidate: (props?: Arrayable<FormItemProps>) => void;
  validateField: (
    props?: Arrayable<FormItemProps>,
    callback?: FormValidateCallback
  ) => FormValidationResult;
};

export interface FormEmits {
  (e: 'validate', prop: FormItemProps, isValid: boolean, message: string): boolean;
}
