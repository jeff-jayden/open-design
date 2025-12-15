import { mount } from '@vue/test-utils';
import Tooltip from '../src/tooltip.vue';

describe('test of tooltip', () => {
  test('class test', () => {
    const wrapper = mount(Tooltip);
    expect(wrapper.classes()).toContain('open-tooltip');
  });
});

