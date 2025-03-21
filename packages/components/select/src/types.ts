import { TPlacementType } from '@open-design/components/tooltip';

export interface SelectOption {
  label: string;
  value: string;
  disabled?: boolean;
}

export interface SelectStates {
  inputValue: string;
  selectedOption: null | SelectOption;
  mouseHover: boolean;
  loading: boolean;
  highlightIndex: number;
  previousQuery: string;
  selectedLabel: string;
}

export interface SelectProps {
  name?: string;
  id?: string;
  modelValue: 'string' | 'number' | 'boolean' | 'object' | 'Array';
  disabled?: boolean;
  effect?: 'dark' | 'light';
  options?: SelectOption[];
  clearable?: boolean;
  filterable?: boolean;
  loading?: boolean;
  placeholder?: string;
  suffixIcon?: any;
  remote?: boolean;
  clearIcon?: any;
  filterMethod?: Function;
  remoteMethod?: Function;
  multiple?: boolean;
  placement?: TPlacementType;
  trigger?: string;
}

export interface SelectEmits {
  (e: 'update:modelValue', value: string): void;

  (e: 'visible-change', value: boolean): void;

  // input 的 input事件指的是值有变化就算
  (e: 'input', value: string): void;

  // input 的 change事件指的是修改了值，并且失去了 focus
  (e: 'change', value: string): void;

  (e: 'focus', value: FocusEvent): void;

  (e: 'blur', value: FocusEvent): void;

  (e: 'keydown', value: KeyboardEvent): void;

  (e: 'clear'): void;
}
