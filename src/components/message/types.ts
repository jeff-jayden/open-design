import type {VNode, ComponentInternalInstance} from "vue";

export interface MessageProps {
    message?: string | VNode | Function;
    type?: 'success' | 'info' | 'warning' | 'error';
    showClose?: boolean;
    duration?: number;
    center?: boolean;
    onClose?: () => void;
    id?: string;
    zIndex?: number;
    offset?: number;
    onDestory?: Function;
}

export interface MessageContext {
    id: string;
    vNode: VNode;
    vm: ComponentInternalInstance;
    props: MessageProps;
    destory: () => void;
}

// export const messageTypes = ['success', 'info', 'warning', 'error'] as const
// export type messageType = typeof messageTypes[number]

export type CreateMessageProps = Omit<MessageProps, 'onDestory' | 'id' | 'zIndex'>