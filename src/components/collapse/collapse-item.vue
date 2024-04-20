<template>
  <div
      class="open-collapse-item"
      :class="{
          'is-disabled': disabled
      }"
  >
    <div
        @click="handleClick"
        class="open-collapse-item__header"
        :class="{
          'is-active': isActive,
          'is-disabled': disabled
        }"
    >
      <slot name="title">{{ title }}</slot>
      <Icon icon="angle-right" class="header-angle"/>
    </div>
    <Transition name="slide" v-on="transitionEvents">
      <div class="open-collapse-item__wrapper" v-show="isActive">
        <div class="open-collapse-item__content" :id="`item-content-${name}`">
          <slot/>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import Icon from "@/components/icon";
import {computed, inject, ref} from "vue";
import {collapseContextKey, CollapseItemProps} from "@/components/collapse/types";

const props = defineProps<CollapseItemProps>()
const collapseContext = inject(collapseContextKey)


defineOptions({
  name: 'OpenCollapseItem'
})

const handleClick = () => {
  console.log(props.name)
  if(props.disabled){
    return
  }
  collapseContext?.handleItemClick(props.name)
}

const isActive = computed(() =>
    collapseContext?.activeNames.value.includes(props.name)
)

const transitionEvents: Record<string, (el: HTMLElement) => void> = {
  beforeEnter(el) {
    el.style.height = '0px'
    el.style.overflow = 'hidden'
  },
  enter(el) {
    el.style.height = `${el.scrollHeight}px`
  },
  afterEnter(el) {
    el.style.height = ''
    el.style.overflow = ''
  },
  beforeLeave(el) {
    el.style.height = `${el.scrollHeight}px`
    el.style.overflow = 'hidden'
  },
  leave(el) {
    el.style.height = '0px'
  },
  afterLeave(el) {
    el.style.height = ''
    el.style.overflow = ''
  }
}

</script>

<style scoped>

</style>