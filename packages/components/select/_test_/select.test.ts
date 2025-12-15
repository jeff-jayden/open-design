import { mount } from '@vue/test-utils';
import Select from '../src/select.vue';

describe('test of select', () => {
  test('class test', () => {
    const wrapper = mount(Select);
    expect(wrapper.classes()).toContain('open-select');
  });
});

