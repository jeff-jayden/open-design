<template>
  <div class="tool-tip-base-box">
    <div class="row center">
      <open-tool-tip
          class="box-item"
          effect="dark"
          content="Top Left prompts info"
          placement="top-start"
      >
        <open-button>top-start</open-button>
      </open-tool-tip>
      <open-tool-tip
          class="box-item"
          effect="dark"
          content="Top Center prompts info"
          placement="top"
      >
        <open-button>top</open-button>
      </open-tool-tip>
      <open-tool-tip
          class="box-item"
          effect="dark"
          content="Top Right prompts info"
          placement="top-end"
      >
        <open-button>top-end</open-button>
      </open-tool-tip>
    </div>
    <div class="row">
      <open-tool-tip
          class="box-item"
          effect="dark"
          content="Left Top prompts info"
          placement="left-start"
      >
        <open-button>left-start</open-button>
      </open-tool-tip>
      <open-tool-tip
          class="box-item"
          effect="dark"
          content="Right Top prompts info"
          placement="right-start"
      >
        <open-button>right-start</open-button>
      </open-tool-tip>
    </div>
    <div class="row">
      <open-tool-tip
          class="box-item"
          effect="dark"
          content="Left Center prompts info"
          placement="left"
      >
        <open-button class="mt-3 mb-3">left</open-button>
      </open-tool-tip>
      <open-tool-tip
          class="box-item"
          effect="dark"
          content="Right Center prompts info"
          placement="right"
      >
        <open-button>right</open-button>
      </open-tool-tip>
    </div>
    <div class="row">
      <open-tool-tip
          class="box-item"
          effect="dark"
          content="Left Bottom prompts info"
          placement="left-end"
      >
        <open-button>left-end</open-button>
      </open-tool-tip>
      <open-tool-tip
          class="box-item"
          effect="dark"
          content="Right Bottom prompts info"
          placement="right-end"
      >
        <open-button>right-end</open-button>
      </open-tool-tip>
    </div>
    <div class="row center">
      <open-tool-tip
          class="box-item"
          effect="dark"
          content="Bottom Left prompts info"
          placement="bottom-start"
      >
        <open-button>bottom-start</open-button>
      </open-tool-tip>
      <open-tool-tip
          class="box-item"
          effect="dark"
          content="Bottom Center prompts info"
          placement="bottom"
      >
        <open-button>bottom</open-button>
      </open-tool-tip>
      <open-tool-tip
          class="box-item"
          effect="dark"
          content="Bottom Right prompts info"
          placement="bottom-end"
      >
        <open-button>bottom-end</open-button>
      </open-tool-tip>
    </div>
  </div>
</template>
<script lang="ts" setup>
import OpenToolTip from "@/components/tooltip";
import OpenButton from "@/components/button";
</script>
<style scoped>
.tool-tip-base-box {
  width: 600px;
}
.tool-tip-base-box .row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.tool-tip-base-box .center {
  justify-content: center;
}
.tool-tip-base-box .box-item {
  width: 110px;
  margin-top: 10px;
}
</style>
