<template>
  <Transition name="fade-up" @enter="updateHeight" @after-leave="destroyComponent">
    <div
      ref="messageRef"
      v-show="visible"
      :id="id"
      class="open-message"
      :class="{
        [`open-message--${type}`]: type,
        'is-close': showClose,
        center: center
      }"
      :style="customStyle"
      @mouseenter="clearTimer"
      @mouseleave="startTimer"
    >
      <div class="open-message__content">
        <RenderVnode :vNode="message" v-if="message" />
      </div>
      <div class="open-message__close" v-if="showClose">
        <open-icon icon="xmark" @click.stop="visible = false" />
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import OpenIcon from '@open-design/components/icon';
import type { MessageProps } from './types';
import RenderVnode from '../../../util/src/RenderVnode';
import { getLastOffset, getOffsetOrSpace } from '../../message';
import useZIndex from '../../../hooks/src/useZIndex';

const props = withDefaults(defineProps<MessageProps>(), {
  type: 'info',
  duration: 3000,
  offset: 16
});

defineOptions({
  name: 'OpenMessage'
});

const messageRef = ref();
const height = ref(0);
const visible = ref(false);

// 鼠标移入 让其一直显示
// 鼠标移出 让其过会关闭
let timer: any;

const close = () => {
  visible.value = false;
};

function startTimer() {
  if (props.duration === 0) return;
  timer = setTimeout(() => {
    close();
  }, props.duration);
}

function clearTimer() {
  clearTimeout(timer);
}

function updateHeight() {
  height.value = messageRef.value!.getBoundingClientRect().height;
}

const lastOffset = computed(() => getLastOffset(props.id));
// const lastOffset = getLastOffset(props.id)
// console.log('lastOffset' + JSON.stringify(lastOffset))

const offset = computed(() => getOffsetOrSpace(props.id, props.offset) + lastOffset.value);

const { currentZIndex, nextZIndex } = useZIndex();

const customStyle = computed(() => ({
  top: `${offset.value}px`,
  zIndex: currentZIndex.value
}));

// 用于导出给外界用的 用于在多次点击出现时 给外界一个底部值
const bottom = computed((): number => height.value + offset.value);

function destroyComponent() {
  props.onDestory();
}

onMounted(() => {
  startTimer();
  visible.value = true;
});

defineExpose({
  visible,
  bottom,
  close
});
</script>

<style scoped></style>
