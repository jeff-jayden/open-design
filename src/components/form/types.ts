export interface FormProps {
    /**
     * @description Control the size of components in this form.
     */
    size: string,
    /**
     * @description Whether to disable all components in this form. If set to `true`, it will override the `disabled` prop of the inner component.
     */
    disabled: boolean,
    /**
     * @description Data of form component.
     */
    model: Object,


}