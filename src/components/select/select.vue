<template>
  <div
      class="open-select"
      ref="selectRef"
      @click="toggleDropdown"
  >
    <open-tool-tip
        ref="tooltipRef"
        content="open-select"
        :effect="effect"
        manual
        @click-outside="controlDropdown(false)"
        :popper-options="popperOptions"
    >
      <template #default>
        <div>
          <open-input
              type="text"
              ref="inputRef"
              v-model="states.inputValue"
          />
        </div>
      </template>
      <template #content>
        <div
            class="open-select__nodata"
            v-if="filterOption.length === 0"
        >
          no match data
        </div>
        <ul class="open-select__menu" v-else>
          <template v-for="item in filterOption" :key="item.value">
            <li
                class="open-select__menu-item"
                :class="{
                'is-disabled': item.disabled,
              }"
                @click="selectItem(item)"
            >
              <render-vnode :v-node="item.label"/>
            </li>
          </template>
        </ul>
      </template>
    </open-tool-tip>
  </div>
</template>

<script setup lang="ts">

import OpenToolTip from "@/components/tooltip/tooltip.vue";
import {computed, reactive, ref, watch} from "vue";
import type {Ref} from 'vue';
import {OpenSelectEmits, OpenSelectProps, SelectOption, SelectStates} from "@/components/select/type";
import OpenInput from "@/components/input/input.vue";
import RenderVnode from "@/util/RenderVnode";
import {TooltipInstance} from "@/components/tooltip/types";

defineOptions({
  name: 'OpenSelect'
})

const props = withDefaults(defineProps<OpenSelectProps>(), {
  disabled: false,
  options: () => []
})

const emits = defineEmits<OpenSelectEmits>()

const findOption = (value: string) => {
  const option = props.options.find((option) => option.value === value);
  return option ? option : null;
};

const initialOption = findOption(props.modelValue);
const filterOption = ref(props.options);
const selectDisabled = computed(() => props.disabled)
const states = reactive<SelectStates>({
  inputValue: '',
  selectedOption: initialOption,
  mouseHover: false,
  loading: false,
  highlightIndex: -1,
})

const inputRef = ref<HTMLInputElement>(null)

const focus = () => {
  inputRef.value?.focus()
}


const isDropdownShow = ref(false);
const tooltipRef = ref() as Ref<TooltipInstance>;

const toggleDropdown = () => {
  if (selectDisabled.value) return
  
  if (isDropdownShow.value) {
    controlDropdown(false)
  } else {
    controlDropdown(true)
  }
}

const popperOptions: any = {
  modifiers: [
    {
      name: "offset",
      options: {
        offset: [0, 9],
      },
    },
    {
      name: "sameWidth",
      enabled: true,
      fn: ({ state }: { state: any }) => {
        state.styles.popper.width = `${state.rects.reference.width}px`;
      },
      phase: "beforeWrite",
      requires: ["computeStyles"],
    },
  ],
};

const controlDropdown = (show: boolean) => {
  if (show) {
    // //filter模式，并且之前选择过的对应的值
    // if (props.filterable && states.selectedOption) {
    //   states.inputValue = "";
    // }
    // //进行一次默认选项的生成
    // if (props.filterable) {
    //   generateFilterOptions(states.inputValue);
    // }
    tooltipRef.value.show();
  } else {
    tooltipRef.value.hide();
    //blur 时候将之前的值回灌到input中
    //   if (props.filterable) {
    //     states.inputValue = states.selectedOption
    //         ? states.selectedOption.label
    //         : "";
    //   }
    //   states.highlightIndex = -1;
    // }
    isDropdownShow.value = show;
    emits("visible-change", show);
  }
}


const selectItem = (e: SelectOption) => {
  if (e.disabled) return;
  states.inputValue = e.label;
  states.selectedOption = e;
  emits("change", e.value);
  emits("update:modelValue", e.value);
  controlDropdown(false);
  inputRef.value?.focus();
};

</script>

<style scoped>

</style>