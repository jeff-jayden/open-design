export type placementType =
    'top'
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
    | 'right-end'

export interface tooltipProps {
    effect?: 'dark' | 'light';
    content?: string;
    placement?: placementType;
    trigger?: 'hover' | 'click';
}

export interface TooltipEmits {
    (e: 'visible-change', value: boolean): void
    (e: 'click-outside', value: boolean): void
}