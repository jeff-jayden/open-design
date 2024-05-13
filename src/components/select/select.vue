<template>
  <div
      class="open-select"
      ref="selectRef"
      @click="toggleDropdown"
  >
    <OpenToolTip
        ref="tooltipRef"
        content="open-select"
        :effect="effect"
        trigger="click"
        @click-outside="controlDropdown(false)"
        :popper-options="popperOptions"
    >
      <template #default>
        <div
          class="open-select-wrapper"
          :class="{
            'is-disabled': disabled
          }"
        >
          <div
              :class="['selected-item', 'input-wrapper']"
          >
            <input
                ref="inputRef"
                v-model="states.inputValue"
                @focus="handleFocus"
                @blur="handleBlur"
                @input="OnInput"
                type="text"
                :disabled="selectDisabled"
                class="open-select__input"
                :class="{
                  'disabled': selectDisabled
                }"
                @click.stop="toggleDropdown"
            />
            <span
                v-if="filterable"
                ref="calculatorRef"
                aria-hidden="true"
                class="input-calculator"
                v-text="states.inputValue"
            />
          </div>
          
          <div
              class="suffix"
          >
            <el-icon
                v-if="iconComponent && !showClose"
                :class="['caret', 'icon', {
                  'is-reverse': isDropdownShow,
                  'disabled': selectDisabled
                }]"
            >
              <component :is="iconComponent"/>
            </el-icon>
            <el-icon
                v-if="showClose && clearIcon"
                :class="['caret','icon']"
                @click.stop="handleClearClick"
            >
              <component :is="clearIcon"/>
            </el-icon>
          </div>
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
                @click.stop="selectItem(item)"
            >
              <render-vnode :v-node="item.label"/>
            </li>
          </template>
        </ul>
      </template>
    </OpenToolTip>
  </div>
</template>

<script setup lang="ts">

import OpenToolTip from "@/components/tooltip/tooltip.vue";
import {computed, reactive, ref, watch} from "vue";
import type {Ref} from 'vue';
import {SelectEmits, SelectProps, SelectOption, SelectStates} from "@/components/select/type";
import RenderVnode from "@/util/RenderVnode";
import {TooltipInstance} from "@/components/tooltip/types";
import {ArrowDown, CircleClose} from "@element-plus/icons-vue";

defineOptions({
  name: 'OpenSelect'
})

const props = withDefaults(defineProps<SelectProps>(), {
  disabled: false,
  suffixIcon: ArrowDown,
  options: () => [],
  clearIcon: CircleClose
})

const isFocus = ref(false)
const emit = defineEmits<SelectEmits>()

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

const showClose = computed(() =>
      props.clearable &&
      !selectDisabled.value&&
      states.inputValue
)

const toggleDropdown = () => {
  if (selectDisabled.value) return
  
  if (isDropdownShow.value) {
    console.log('isDropdownShow1' + isDropdownShow.value)
    controlDropdown(false)
  } else {
    console.log('isDropdownShow2' + isDropdownShow.value)
    controlDropdown(true)
  }
}


const iconComponent = computed(() => props.suffixIcon)

const handleClearClick = () => {
  states.selectedOption = null;
  states.inputValue = "";
  emit("clear");
  emit("change", "");
  emit("update:modelValue", "");
}


const OnInput = ({target}) => {
  console.log('select: ' + target.value)
  states.inputValue = target.value
}

const handleFocus = (event: FocusEvent) => {
  isFocus.value = true
  // tooltipRef.value?.show()
  emit('focus', event)
}

const handleBlur = (event: FocusEvent) => {
  console.log('blur triggered')
  isFocus.value = false
  emit('blur', event)
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
      fn: ({state}: { state: any }) => {
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
    console.log(isDropdownShow.value + '@@')
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
    console.log('visible-change' + isDropdownShow.value)
    emit("visible-change", show);
  }
  isDropdownShow.value = show;
}


const selectItem = (e: SelectOption) => {
  if (e.disabled) return;
  states.inputValue = e.label;
  states.selectedOption = e;
  emit("change", e.value);
  emit("update:modelValue", e.value);
  console.log('执行了')
  controlDropdown(false);
  console.log('执行完了')
  inputRef.value?.focus();
};

</script>

<style scoped>

</style>