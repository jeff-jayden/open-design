import { VNode } from 'vue';
import { ITooltipProps } from '@open-design/components/tooltip';

export type DropDownType = 'primary' | 'success' | 'warning' | 'danger' | 'info';

export interface MenuOption {
  label: string | VNode;
  key: string | number;
  disabled?: boolean;
  divided?: boolean;
}

export interface DropdownProps extends ITooltipProps {
  menuOptions?: MenuOption[];
  hideAfterClick?: boolean;
  splitButton?: boolean;
  type?: DropDownType;
  disabled?: boolean;
}

export interface DropdownEmits {
  (e: 'visible-change', value: boolean): void;
  (e: 'select', value: MenuOption): void;
  (e: 'click', value: any): void;
}

export interface DropdownInstance {
  show: () => void;
  hide: () => void;
}
