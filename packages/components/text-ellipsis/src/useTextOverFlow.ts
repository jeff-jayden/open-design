import { onMounted, Ref, ref, watch, onUnmounted } from 'vue';

export const useTextOverFlow = (options: {
  targetRef: Ref<HTMLElement>;
  text: Ref<string | number>;
  watchResize: boolean;
}) => {
  const { targetRef, text } = options;

  const isTextOverFlow = ref();
  function _compareWidth() {
    const targetFontSize = window.getComputedStyle(targetRef.value).fontSize;

    const span = document.createElement('span');
    span.style.fontSize = targetFontSize;
    span.style.display = 'inline-block';
    span.style.width = 'fit-content';
    span.textContent = text.value;

    document.body.appendChild(span);
    const realWidth = span.getBoundingClientRect().width;
    document.body.removeChild(span);
    const targetWidth = targetRef.value.getBoundingClientRect().width;

    // console.log(realWidth, targetWidth);

    return realWidth <= targetWidth;
  }

  const update = () => {
    isTextOverFlow.value = _compareWidth();
  };

  watch(text, update);

  onMounted(() => {
    // 这里需要一开始监听dom大小变化，因为初始宽度是文本宽度，
    // 如果一开始只执行一次update，那么拿的是初始文本宽度，因为
    // 后续才会应用el-table的宽度，所以要在dom宽度变化之后再执行update
    // 要等所有操作执行完才开始计算
    const observer = new ResizeObserver(update);
    observer.observe(targetRef.value);
    onUnmounted(() => observer.disconnect());
  });

  return {
    isTextOverFlow
  };
};
