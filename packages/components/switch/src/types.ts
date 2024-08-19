export type TSwitchValueType = boolean | string | number;

export interface ISwitchProps {
  modelValue?: TSwitchValueType;
  disabled?: boolean;
  activeText?: string;
  inactiveText?: string;
  activeValue?: TSwitchValueType;
  inactiveValue?: TSwitchValueType;
  name?: string;
  id?: string;
  size?: 'small' | 'large';
  onColor?: string;
  offColor?: string;
}

export interface ISwitchEmits {
  (e: 'update:modelValue', value: TSwitchValueType): void;

  (e: 'change', value: TSwitchValueType): void;
}
