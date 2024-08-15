import { describe, expect, test, it } from 'vitest';
import { mount } from '@vue/test-utils';
import Button from '../src/button.vue';

describe('测试按钮', () => {
  test('class test', () => {
    const wrapper = mount(Button, {
      props: {
        type: 'primary',
        loading: true
      }
    });
    expect(wrapper.classes()).toContain('open-button--primary');
    expect(wrapper.get('button').text()).toBe('button');
  });

  it('nativeType', () => {
    const wrapper = mount(Button, {
      props: {
        nativeType: 'submit'
      }
    });
    expect(wrapper.attributes('type')).toBe('submit');
  });
});
