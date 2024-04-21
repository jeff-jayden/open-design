import {tooltipProps} from "@/components/tooltip";
import {VNode} from "vue";

export interface MenuOption {
    label: string | VNode;
    key: string | number;
    disabled?: boolean;
    divided?: boolean;
}

export interface DropdownProps extends tooltipProps {
    menuOptions: MenuOption[];
    hideAfterClick?: boolean;
}

export interface DropdownEmits {
    (e:'visible-change', value: boolean) : void;
    (e:'select', value: MenuOption) : void;
}

export interface DropdownInstance {
    show: () => void;
    hide: () => void;
}