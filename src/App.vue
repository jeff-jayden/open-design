<template>
  <div>
    <OpenButton :icon="Check" loading type="primary">op按钮</OpenButton>
    <ElButton :icon="Check" loading>el按钮</ElButton>
    
    <op-tooltip></op-tooltip>
  </div>
</template>

<script setup lang="ts">
import {
  Check,
  Delete,
  Edit,
  Message,
  Search,
  Star,
  ArrowDown,
  Calendar
} from '@element-plus/icons-vue';
import { ElInput, ElTooltip, ElButton } from 'element-plus';
import OpenButton from '@/components/button/button.vue';
import Icon from '@/components/icon/icon.vue';
// import {Button} from "@jeff-jayden/open-design";
import { onMounted, reactive, ref } from 'vue';
import Collapse from '@/components/collapse/collapse.vue';
import CollapseItem from '@/components/collapse/collapse-item.vue';
import OpTooltip from '@/components/tooltip/tooltip.vue';
// import {Dropdown} from "@qinloong/snow-sky";
import OpenDropDown from '@/components/dropdown/dropdown.vue';
import { createMessage } from '@/components/message/methods';
// import {Tooltip} from "@qinloong/snow-sky";
import { Form, FormItem, Input } from '@qinloong/snow-sky';
// import OpenMessage from '@/components/message/message.vue'
import OpenSwitch from '@/components/switch/switch.vue';
import Switch from '@qinloong/snow-sky';
import OpenInput from '@/components/input/input.vue';
import OpenSelect from '@/components/select/select.vue';
import button from '@/components/button';
import OpenToolTip from '@/components/tooltip';
import OpenForm from '@/components/form/form.vue';
import OpenFormItem from '@/components/form/form-item.vue';

const switchvalue = ref(true);
const value = ref('');
const value1 = ref('');
const value2 = ref('');
const selectValue = ref('');
const format = (percentage) => (percentage === 100 ? 'Full' : `${percentage}%`);
const percentage = ref(0);
const timer = setInterval(() => {
  percentage.value++;
  if (percentage.value === 100) {
    clearInterval(timer);
  }
}, 100);

const formInput = reactive({
  input: ''
});

const rules = reactive({
  name: [
    { required: true, message: 'Please input Activity name', trigger: 'blur' },
    { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' }
  ]
});

const form = reactive({
  name: '',
  region: '',
  date1: '',
  date2: '',
  delivery: false,
  type: [],
  resource: '',
  desc: ''
});

const opinput = (val) => {
  console.log(value1.value);
  console.log('opinput' + val);
};

onMounted(() => {
  createMessage({ message: 'hello world', showClose: true, type: 'success' });
  createMessage({ message: 'hello world', showClose: true, type: 'error' });
  createMessage({ message: 'hello world', showClose: true, type: 'info' });
  createMessage({ message: 'hello world', showClose: true, type: 'warning' });

  console.log('aaaa' + import.meta.url);
  setTimeout(() => {
    value.value = ['2', '3'];
    console.log(value.value);
    console.log(111);
  }, 1000);
});

const options = [
  {
    value: 'Option1',
    label: 'Option1',
    disabled: true
  },
  {
    value: 'Option2',
    label: 'Option2'
  },
  {
    value: 'Option3',
    label: 'Option3'
  },
  {
    value: 'Option4',
    label: 'Option4'
  },
  {
    value: 'Option5',
    label: 'Option5'
  }
];

const selectChange = (val: string) => {
  console.log('selectChange' + val);
};

const fn = (val: any) => {
  console.log(val);
};

const handleSwitchChange = (val) => {
  console.log(val);
};

const showMessage = () => {
  createMessage({ message: 'hello world', showClose: true, type: 'success' });
  // sonwMessage({message: 'hello world', showClose: true, type: "success"})
};

const menuOptions = [
  {
    label: '大撒大撒',
    key: 1,
    disabled: true
  },
  {
    label: '大撒大撒',
    key: 2,
    divided: true
  },
  {
    label: '大撒大撒',
    key: 3
  },
  {
    label: '大撒大撒',
    key: 4
  }
];

const handleSelect = (val: any) => {
  console.log('选择的值是：' + val.label);
};
</script>

<style scoped></style>
