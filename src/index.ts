import type { App } from 'vue';
import './styles/index.css';
import OpButton from '@/components/button';
import OpenDropDown from '@/components/dropdown';
import OpIcon from '@/components/icon';
import OpenInput from '@/components/input';
import OpenForm from '@/components/form';
import OpTooltip from '@/components/tooltip';
import OpenMessage from '@/components/message';
import OpCollapse from '@/components/collapse';
import OpSelect from '@/components/select';
import OpenSwitch from '@/components/switch';

const components = [
  OpButton,
  OpIcon,
  OpenDropDown,
  OpenInput,
  OpenForm,
  OpTooltip,
  OpenMessage,
  OpCollapse,
  OpSelect,
  OpenSwitch
];

const install = (app: App) => {
  components.forEach((component) => {
    app.component(component.name, component);
  });
};

export {
  OpButton,
  OpIcon,
  OpenDropDown,
  OpenInput,
  OpenForm,
  OpTooltip,
  OpenMessage,
  OpCollapse,
  OpSelect,
  OpenSwitch
};

export default {
  install
};
