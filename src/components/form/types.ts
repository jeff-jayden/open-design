import {RuleItem} from "async-validator";

export interface FormItemRule extends RuleItem {
    trigger?: string;
}

export type FormRules = Record<string, FormItemRule[]>;

export interface FormProps {
    /**
     * @description Data of form component.
     */
    model: Object;
    rules?: FormRules;
}

export interface FormItemProps {
    /**
     * @description Control the size of components in this form.
     */
    size?: string;
    /**
     * @description Whether to disable all components in this form. If set to `true`, it will override the `disabled` prop of the inner component.
     */
    disabled?: boolean;
    for?: string;
    label?: string;
    error?: string;
    showMessage?: boolean;
    prop?: string;
}


export const formItemValidateStates = [
    '',
    'error',
    'validating',
    'success',
] as const
export type FormItemValidateState = typeof formItemValidateStates[number]