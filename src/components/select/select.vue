<template>
  <div class="open-select" ref="selectRef" @click="toggleDropdown">
    <open-tool-tip
      :placement="placement"
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
          <div :class="['selected-item', 'input-wrapper']">
            <input
              :readonly="!filterable"
              :placeholder="placeholder"
              ref="inputRef"
              v-model="states.inputValue"
              type="text"
              :disabled="selectDisabled"
              class="open-select__input"
              :class="{
                disabled: selectDisabled
              }"
              @focus="handleFocus"
              @blur="handleBlur"
              @input="OnInput"
              @click.stop="toggleDropdown"
              @keydown="handleKeydown"
            />
            <!--            <span-->
            <!--                v-if="filterable"-->
            <!--                ref="calculatorRef"-->
            <!--                aria-hidden="true"-->
            <!--                class="input-calculator"-->
            <!--                v-text="states.inputValue"-->
            <!--            />-->
          </div>
          <!--          TODO-->
          <div v-if="false" :class="['selected-item', 'placeholder', 'transparent']">
            <span>{{ currentPlaceholder }}</span>
          </div>
          <div class="suffix">
            <open-icon
              v-if="iconComponent && !showClose"
              :class="[
                'caret',
                'icon',
                {
                  'is-reverse': isDropdownShow,
                  disabled: selectDisabled
                }
              ]"
            >
              <component :is="iconComponent" />
            </open-icon>
            <open-icon
              v-if="showClose && clearIcon"
              :class="['caret', 'icon']"
              @click.stop="handleClearClick"
            >
              <component :is="clearIcon" />
            </open-icon>
          </div>
        </div>
      </template>

      <template #content>
        <div class="open-select__nodata" v-if="filterOption.length === 0">No match data</div>
        <ul class="open-select__menu" v-else>
          <template v-for="(item, index) in filterOption" :key="item.value">
            <li
              class="open-select__menu-item"
              :class="{
                'is-disabled': item.disabled,
                'is-selected': states.selectedOption?.value === item.value,
                'is-highlighted': states.highlightIndex === index
              }"
              @click.stop="selectItem(item)"
            >
              <render-vnode :v-node="item.label" />
            </li>
          </template>
        </ul>
      </template>
    </open-tool-tip>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue';
import type { Ref } from 'vue';
import { ArrowDown, CircleClose } from '@element-plus/icons-vue';
import { isArray, isFunction } from 'lodash-es';
import OpenToolTip from '@/components/tooltip/tooltip.vue';
import { SelectEmits, SelectProps, SelectOption, SelectStates } from '@/components/select/types';
import RenderVnode from '@/util/RenderVnode';
import { TooltipInstance } from '@/components/tooltip/types';
import OpenIcon from '@/components/icon';

defineOptions({
  name: 'OpenSelect'
});

const props = withDefaults(defineProps<SelectProps>(), {
  placement: 'bottom',
  disabled: false,
  suffixIcon: ArrowDown,
  options: () => [],
  clearIcon: CircleClose,
  filterable: false
});

const isFocus = ref(false);
const emit = defineEmits<SelectEmits>();

const findOption = (value: string) => {
  const option = props.options.find((option) => option.value === value);
  return option || null;
};

const initialOption = findOption(props.modelValue);
const filterOption = ref(props.options);
const selectDisabled = computed(() => props.disabled);
const states = reactive<SelectStates>({
  inputValue: '',
  selectedOption: initialOption,
  mouseHover: false,
  loading: false,
  highlightIndex: -1,
  previousQuery: null,
  selectedLabel: ''
});

const inputRef = ref<HTMLInputElement>(null);

const focus = () => {
  inputRef.value?.focus();
};

const isDropdownShow = ref(false);
const tooltipRef = ref() as Ref<TooltipInstance>;

const currentPlaceholder = computed(() => {
  const _placeholder = props.placeholder ?? 'please select';
  return props.multiple ? _placeholder : states.selectedLabel;
});

// TODO
const shouldShowPlaceholder = computed(() => {
  if (isArray(props.modelValue)) {
    return props.modelValue.length === 0 && !states.inputValue;
  }
  return props.filterable ? !states.inputValue : true;
});

const showClose = computed(() => props.clearable && !selectDisabled.value && states.inputValue);

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
    console.log(`${isDropdownShow.value}@@`);
    tooltipRef.value.show();
  } else {
    tooltipRef.value.hide();
    // blur 时候将之前的值回灌到input中
    //   if (props.filterable) {
    //     states.inputValue = states.selectedOption
    //         ? states.selectedOption.label
    //         : "";
    //   }
    //   states.highlightIndex = -1;
    // }
    console.log(`visible-change${isDropdownShow.value}`);
    emit('visible-change', show);
  }
  isDropdownShow.value = show;
};

const selectItem = (e: SelectOption) => {
  if (e.disabled) return;
  states.inputValue = e.label;
  states.selectedOption = e;
  emit('change', e.value);
  emit('update:modelValue', e.value);
  console.log('执行了');
  controlDropdown(false);
  console.log('执行完了');
  inputRef.value?.focus();
};

const handleKeydown = (e: KeyboardEvent) => {
  console.log(`KeyboardEvent@@@@@${e.key}`);
  switch (e.key) {
    case 'Enter':
      if (!isDropdownShow.value) {
        controlDropdown(true);
      } else if (states.highlightIndex > 0 && filterOption.value[states.highlightIndex]) {
        selectItem(filterOption.value[states.highlightIndex]);
      } else {
        controlDropdown(false);
      }
      break;
    case 'Escape':
      if (isDropdownShow.value) {
        controlDropdown(false);
      }
      break;
    case 'ArrowUp':
      e.preventDefault();
      // states.highlightIndex = -1
      if (filterOption.value.length > 0) {
        if (states.highlightIndex === -1 || states.highlightIndex === 0) {
          states.highlightIndex = filterOption.value.length - 1;
        } else {
          // move up
          states.highlightIndex--;
        }
      }
      break;
    case 'ArrowDown':
      e.preventDefault();
      // states.highlightIndex = -1
      if (filterOption.value.length > 0) {
        if (
          states.highlightIndex === -1 ||
          states.highlightIndex === filterOption.value.length - 1
        ) {
          states.highlightIndex = 0;
        } else {
          // move up
          states.highlightIndex++;
        }
      }
      break;
    default:
      break;
  }
};

const toggleDropdown = () => {
  if (selectDisabled.value) return;

  if (isDropdownShow.value) {
    console.log(`isDropdownShow1${isDropdownShow.value}`);
    controlDropdown(false);
  } else {
    console.log(`isDropdownShow2${isDropdownShow.value}`);
    controlDropdown(true);
  }
};

const iconComponent = computed(() => props.suffixIcon);

const handleClearClick = () => {
  states.selectedOption = null;
  states.inputValue = '';
  emit('clear');
  emit('change', '');
  emit('update:modelValue', '');
};

const handleQueryChange = (searchValue: string) => {
  if (states.previousQuery === searchValue) {
    return;
  }
  states.previousQuery = searchValue;
  // 过滤方法
  if (props.filterable && isFunction(props.filterMethod)) {
    // 执行自定义筛选方法
    filterOption.value = props.filterMethod(searchValue);
  } else if (props.filterable && props.remote && isFunction(props.remoteMethod)) {
    props.remoteMethod(searchValue);
  } else {
    // 简单过滤
    filterOption.value = props.options.filter((option) => option.label.includes(searchValue));
  }
};

const onInputChange = () => {
  if (states.inputValue.length > 0 && !isDropdownShow.value) {
    isDropdownShow.value = true;
  }
  handleQueryChange(states.inputValue);
};

const OnInput = ({ target }) => {
  console.log(`select: ${target.value}`);
  states.inputValue = target.value;
  return onInputChange();
};

const handleFocus = (event: FocusEvent) => {
  isFocus.value = true;
  // tooltipRef.value?.show()
  emit('focus', event);
};

const handleBlur = (event: FocusEvent) => {
  console.log('blur triggered');
  isFocus.value = false;
  emit('blur', event);
};

const popperOptions: any = {
  modifiers: [
    {
      name: 'offset',
      options: {
        offset: [0, 9]
      }
    },
    {
      name: 'sameWidth',
      enabled: true,
      fn: ({ state, instance, options, name }) => {
        state.styles.popper.width = `${state.rects.reference.width}px`;
      },
      phase: 'beforeWrite',
      requires: ['computeStyles']
    }
  ]
};
</script>

<style scoped></style>
