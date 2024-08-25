import { reactive } from 'vue';
import type { MessageContext } from './types';

export const instances: MessageContext[] = reactive([]);

// 返回当前实例和前一个实例
export const getInstance = (id: string) => {
  const idx = instances.findIndex((instance) => instance.id === id);
  console.log(`11111idx${idx}`);
  console.log(`instances${instances.length}`);
  const current = instances[idx];
  let prev: MessageContext | undefined;
  if (idx > 0) {
    prev = instances[idx - 1];
  }
  return { current, prev };
};

// ! 表示明确告诉ts exposed 不为空
export const getLastOffset = (id: string) => {
  const { prev } = getInstance(id);
  if (!prev) {
    console.log('没有prev');
    return 0;
  }
  // 获取前一个的底边位置
  return prev.vm.exposed!.bottom.value;
};

export const getOffsetOrSpace = (id: string, offset: number) => {
  const idx = instances.findIndex((instance) => instance.id === id);
  console.log(`这里的：${idx}`);
  return idx > 0 ? 16 : offset;
};

// 获取最后一个实例
export const getLastInstance = () => {
  return instances.at(-1);
};
