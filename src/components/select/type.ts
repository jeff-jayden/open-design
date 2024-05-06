import type {UPDATE_MODEL_EVENT} from '@/constants'


export interface OpenSelectProps {
    modelValue?: 'string' | 'number' | 'boolean' | 'object'
    disabled?: boolean;
    effect?: 'dark' | 'light';
}

export interface OpenSelectEmits {
    // (e: UPDATE_MODEL_EVENT, value: string): void,

}