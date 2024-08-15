import { InjectionKey, PropType } from 'vue';

export type TButton = 'primary' | 'success' | 'warning' | 'danger' | 'info';
export type TSize = 'large' | 'small';
export type TNative = 'button' | 'submit' | 'reset';

export interface IProps {
  tag?: string;
  type?: TButton;
  size?: TSize;
  plain?: boolean;
  round?: boolean;
  circle?: boolean;
  disabled?: boolean;
  nativeType?: TNative;
  autofocus?: boolean;
  icon?: any;
  loading?: boolean;
  loadingIcon?: any;
}

export interface IButtonGroupContext {
  size?: IProps['size'];
  type?: IProps['type'];
}

export const buttonGroupContextKey: InjectionKey<IButtonGroupContext> =
  Symbol('buttonGroupContextKey');

export interface IButtonGroupProps {
  type?: TButton;
  size?: TSize;
}

export interface IButtonInstance {
  ref: HTMLButtonElement;
}

export const buttonProps = {
  type: {
    type: String as PropType<TButton>
  },
  size: {
    type: String as PropType<TSize>
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
