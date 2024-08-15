import { reactive, render, h } from 'vue';
import type { CreateMessageProps, MessageContext, messageType } from '@/components/message/types';
import useZIndex from '../../hooks/src/useZIndex';
import MessageConstructor from './message.vue';
import { instances } from './instance';

let seed = 1;

export const createMessage = (props: CreateMessageProps) => {
  const { nextZIndex } = useZIndex();
  const id = `message_${seed++}`;
  const container = document.createElement('div');
  const destory = () => {
    // 删除数组中的实例
    const idx = instances.findIndex((instance) => instance.id === id);
    if (idx === -1) return;
    instances.splice(idx, 1);
    render(null, container);
  };
  const manualDestroy = () => {
    const instance = instances.find((item) => item.id === id);
    if (instance) {
      instance.vm.exposed!.visible.value = false;
    }
  };
  const newProps = {
    ...props,
    id,
    zIndex: nextZIndex(),
    onDestory: destory
  };
  console.log(`newProps${JSON.stringify(newProps)}`);
  const vNode = h(MessageConstructor, newProps);
  render(vNode, container);
  document.body.appendChild(container.firstElementChild!);
  const vm = vNode.component!;
  const instance = {
    id,
    vNode,
    vm,
    props: newProps,
    destory: manualDestroy
  };
  // console.log('instance' + JSON.stringify(instance))
  instances.push(instance);
  console.log(`instances.length${instances.length}`);
  return instance;
};

export function closeAll(type?: messageType): void {
  for (const instance of instances) {
    if (!type || type === instance.props.type) {
      instance.destory();
    }
  }
}

export default createMessage;
