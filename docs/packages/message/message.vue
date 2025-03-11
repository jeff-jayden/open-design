<template>
  <open-button plain @click="open1">Success</open-button>
  <open-button plain @click="open2">Warning</open-button>
  <open-button plain @click="open3">Message</open-button>
  <open-button plain @click="open4">Error</open-button>
</template>

<script setup lang="ts">
import createMessage from '@open-design/components/message';
import OpenButton from '@open-design/components/button';

const open1 = () => {
  createMessage({
    message: 'This is a message.',
    type: 'success'
  });
};

const open2 = () => {
  createMessage({
    message: 'This is a message.',
    type: 'warning'
  });
};
const open3 = () => {
  createMessage({
    message: 'This is a message.',
    type: 'info'
  });
};
const open4 = () => {
  createMessage({
    message: 'This is a message.',
    type: 'danger'
  });
};
</script>
