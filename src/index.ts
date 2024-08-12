import type { App } from 'vue';
import './styles/index.css';
import OpButton from '@/components/button';
import OpenCollapse from '@/components/collapse';
import OpenDropDown from '@/components/dropdown';
import OpIcon from '@/components/icon';
import OpenInput from '@/components/input';
import OpenForm from '@/components/form';

const components = [OpButton, OpIcon];

const install = (app: App) => {
  components.forEach((component) => {
    app.component(component.name, component);
  });
};

export { OpButton, OpIcon };

export default {
  install
};
