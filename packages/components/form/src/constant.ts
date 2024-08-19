import { InjectionKey } from 'vue';
import { FormContext, FormItemContext } from './types';

export const formContextKey: InjectionKey<FormContext> = Symbol('formContextKey');
export const formItemContextKey: InjectionKey<FormItemContext> = Symbol('formItemContextKey');
