import { InjectionKey, PropType } from 'vue';

export type ButtonType = 'primary' | 'success' | 'warning' | 'danger' | 'info';
export type ButtonSize = 'large' | 'small';
export type NativeType = 'button' | 'submit' | 'reset';

export interface ButtonProps {
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
  size?: ButtonProps['size'];
  type?: ButtonProps['type'];
}

export const buttonGroupContextKey: InjectionKey<ButtonGroupContext> =
  Symbol('buttonGroupContextKey');

export interface ButtonGroupProps {
  type?: ButtonType;
  size?: ButtonSize;
}

export interface ButtonInstance {
  ref: HTMLButtonElement;
}

export const buttonProps = {
  type: {
    type: String as PropType<ButtonType>
  },
  size: {
    type: String as PropType<ButtonSize>
  },
  plain: {
    type: Boolean
  },
  round: {
    type: Boolean
  },
  circle: {
    type: Boolean
  },
  disabled: {
    type: Boolean
  }
};
