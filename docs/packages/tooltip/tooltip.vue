<template>
  <div class="tool-tip-base-box">
    <div class="row center">
      <open-tool-tip
        class="box-item"
        effect="light"
        content="Top Left prompts info"
        placement="top"
      >
        <open-button>top</open-button>
      </open-tool-tip>
      <open-tool-tip
        class="box-item"
        effect="light"
        content="Top Center prompts info"
        placement="bottom"
      >
        <open-button>bottom</open-button>
      </open-tool-tip>
      <open-tool-tip
        class="box-item"
        effect="light"
        content="Top Right prompts info"
        placement="top-end"
      >
        <open-button>top-end</open-button>
      </open-tool-tip>
    </div>
  </div>
</template>
<script lang="ts" setup>
import OpenToolTip from '@/components/tooltip';
import OpenButton from '@/components/button';
</script>
<style scoped></style>
