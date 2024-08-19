import type { Options } from '@popperjs/core';

export type TPlacementType =
  | 'top'
  | 'top-start'
  | 'top-end'
  | 'bottom'
  | 'bottom-start'
  | 'bottom-end'
  | 'left'
  | 'left-start'
  | 'left-end'
  | 'right'
  | 'right-start'
  | 'right-end';

export interface ITooltipProps {
  rawContent?: boolean;
  effect?: 'dark' | 'light';
  content?: string;
  placement?: TPlacementType;
  trigger?: 'hover' | 'click';
  popperOptions?: Partial<Options>;
  transitionName?: string;
  manual?: boolean;
}

export interface ITooltipEmits {
  (e: 'visible-change', value: boolean): void;
  (e: 'click-outside', value: boolean): void;
}

export interface ITooltipInstance {
  show: () => void;
  hide: () => void;
  isOpen: boolean;
}
