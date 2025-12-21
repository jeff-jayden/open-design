<template>
  <span class="text_ellipsis">
    <el-tooltip placement="top" effect="light" :disabled="isTextOverFlow">
      <template #content>
        <span class="ellipsis_content">{{ text }}</span>
      </template>
      <span
        ref="target"
        :class="[
          'ellipsis_default_text',
          'ellipsis_default_' + `${+rows > 1 ? 'multi' : 'single'}`
        ]"
        @click="() => copyContent('text')"
        >{{ text }}</span
      >
    </el-tooltip>
  </span>
</template>

<script setup lang="ts">
import { toRefs, useTemplateRef, Ref } from 'vue';
import { ElTooltip, ElMessage } from 'element-plus';
import { useTextOverFlow } from './useTextOverFlow';

const props = defineProps<{ text: string; rows: string; copyable: boolean }>();

const targetRef = useTemplateRef<HTMLElement>('target');
const { text, rows } = toRefs(props);

const { isTextOverFlow } = useTextOverFlow({ targetRef, text, watchResize: false });

const copyContent = (type: 'text' | 'icon') => {
  async function copyText(text: Ref<string>) {
    try {
      await navigator.clipboard.writeText(text.value);
      ElMessage({
        showClose: true,
        message: '复制成功',
        type: 'success'
      });
    } catch (error) {
      ElMessage({
        showClose: true,
        message: '复制失败，请稍后重试',
        type: 'error'
      });
    }
  }

  if (type === 'text' && props.copyable) {
    copyText(text);
  }
};

defineOptions({
  name: 'OpenEllipsis'
});
</script>

<style scoped lang="less">
.text_ellipsis {
  display: inline-flex;
  vertical-align: middle;
  align-items: center;
  width: 100%;

  .ellipsis_default {
    &_text {
      display: inline-block;
      width: 100%;
      cursor: v-bind("(isTextOverFlow || copyable) ? 'pointer' : 'inherit'");
    }

    &_single {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    &_multi {
      display: -webkit-box;
      -webkit-line-clamp: v-bind(rows);
      -webkit-box-orient: vertical;
      word-break: break-all;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}
</style>
