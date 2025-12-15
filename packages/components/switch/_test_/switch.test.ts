import { mount } from '@vue/test-utils';
import Switch from '../src/switch.vue';

describe('test of switch', () => {
  test('class test', () => {
    const wrapper = mount(Switch);
    expect(wrapper.classes()).toContain('open-switch');
  });
});

