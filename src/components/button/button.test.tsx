import { describe, expect, test, it } from 'vitest';
import { mount } from '@vue/test-utils';
import Button from './button.vue';

describe('测试按钮', () => {
  test('create', () => {
    const wrapper = mount(Button, {
      props: {
        type: 'primary'
      }
    });
    console.log(wrapper);

    expect(wrapper.classes()).toContain('open-button--primary');
  });

  test('class test', () => {
    const wrapper = mount(Button, {
      props: {
        type: 'primary',
        loading: true
      },
      slots: {
        default: 'button'
      }
    });
    expect(wrapper.classes()).toContain('open-button--primary');
    expect(wrapper.get('button').text()).toBe('button');
  });

  test('nativeType', () => {
    const wrapper = mount(Button, {
      props: {
        nativeType: 'submit'
      }
    });
    expect(wrapper.attributes('type')).toBe('submit');
  });

  test('size', () => {
    const wrapper = mount(Button, {
      props: {
        size: 'large'
      }
    });

    expect(wrapper.classes()).toContain('open-button--large');
  });

  it('loading', () => {
    const wrapper = mount(Button, {
      props: {
        loading: true
      }
    });

    expect(wrapper.classes()).toContain('is-loading');
  });
});
