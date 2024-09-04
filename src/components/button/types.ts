import { InjectionKey, PropType } from 'vue';

export type ButtonType = 'primary' | 'success' | 'warning' | 'danger' | 'info';
export type ButtonSize = 'large' | 'small';
export type NativeType = 'button' | 'submit' | 'reset';

export interface IButtonProps {
  tag?: string;
  type?: ButtonType;
  size?: ButtonSize;
  plain?: boolean;
  round?: boolean;
  circle?: boolean;
  disabled?: boolean;
  nativeType?: NativeType;
  autofocus?: boolean;
  icon?: any;
  loading?: boolean;
  loadingIcon?: any;
}

export interface ButtonGroupContext {
  size?: IButtonProps['size'];
  type?: IButtonProps['type'];
}

export const buttonGroupContextKey: InjectionKey<ButtonGroupContext> =
  Symbol('buttonGroupContextKey');

export interface IButtonGroupProps {
  type?: ButtonType;
  size?: ButtonSize;
}

export interface ButtonInstance {
  ref: HTMLButtonElement;
}