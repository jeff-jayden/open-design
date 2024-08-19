<template>
  <div class="open-collapse">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { provide, ref, watch } from 'vue';
import type { CollapseEmits, CollapseProps, NameType } from './types';
import { collapseContextKey } from './types';

const emits = defineEmits<CollapseEmits>();
const props = defineProps<CollapseProps>();
const activeNames = ref<NameType[]>(props.modelValue);

defineOptions({
  name: 'OpenCollapse'
});

watch(
  () => props.modelValue,
  () => {
    activeNames.value = props.modelValue;
    console.log(`activeNames.value: ${activeNames.value}`);
  }
);

// 解决item点击时做的事情
const handleItemClick = (item: NameType) => {
  console.log(`handleItemClick ${item}`);
  let _activeNames = [...activeNames.value];
  // 如果是手风琴模式  只有一个值
  if (props.accordion) {
    _activeNames = [activeNames.value[0] === item ? '' : item];
    activeNames.value = _activeNames;
  } else {
    console.log(`修改前的：${_activeNames}`);
    // 不是手风琴模式  有多个值
    const index = _activeNames.indexOf(item);
    if (index > -1) {
      // 存在 删除对应的item 即关闭一个item
      _activeNames.splice(index, 1);
    } else {
      // 没有 就添加 展开
      _activeNames.push(item);
    }
    activeNames.value = _activeNames;
    console.log(`修改后的：${_activeNames}`);
  }
  // 触发事件  弹出事件给开发者用
  emits('update:modelValue', _activeNames);
  emits('change', _activeNames);
};

if (props.accordion && activeNames.value.length > 1) {
  console.warn('accordion mode should only have one active item');
}

provide(collapseContextKey, {
  activeNames,
  handleItemClick
});
</script>

<style scoped></style>
