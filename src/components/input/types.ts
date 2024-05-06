export interface InputProps {
    type?: string;
    prefixIcon?: string;
    minlength?: number;
    maxlength?: number;
    placeholder?: string;
    showPassword?: boolean;
    autofocus?: boolean;
}


export interface InputEmits {
    /**支持v-model而添加的事件*/
    (e: 'update:modelValue', value: string) : void;
    // input 的 input事件指的是值有变化就算
    (e: 'input', value: string): void;
    // input 的 change事件指的是修改了值，并且失去了 focus
    (e: 'change', value: string): void;
    (e: 'focus', value: FocusEvent): void;
    (e: 'blur', value: FocusEvent): void;
    (e: 'clear'): void;
}