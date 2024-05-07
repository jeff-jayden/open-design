import type {UPDATE_MODEL_EVENT} from '@/constants'
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
}

export interface OpenSelectProps {
    modelValue?: 'string' | 'number' | 'boolean' | 'object'
    disabled?: boolean;
    effect?: 'dark' | 'light';
    options?: SelectOption[];
}

export interface OpenSelectEmits {
    (e: 'update:modelValue', value: string): void,
    (e: 'visible-change', value: boolean): void,
    (e: 'change', value: string): void,

}