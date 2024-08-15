export type SwitchValueType = boolean | string | number;

export interface switchProps {
  modelValue?: SwitchValueType;
  disabled?: boolean;
  activeText?: string;
  inactiveText?: string;
  activeValue?: SwitchValueType;
  inactiveValue?: SwitchValueType;
  name?: string;
  id?: string;
  size?: 'small' | 'large';
  onColor?: string;
  offColor?: string;
}

export interface switchEmits {
  (e: 'update:modelValue', value: SwitchValueType): void;

  (e: 'change', value: SwitchValueType): void;
}
