import { mount } from '@vue/test-utils';
import Button from '../src/button.vue';

describe('test of button', () => {
  test('class test', () => {
    const wrapper = mount(Button, {
      props: {
        type: 'primary',
        loading: true
      },
      slots: {
        default: 'Main Content'
      }
    });
    expect(wrapper.classes()).toContain('open-button--primary');
    expect(wrapper.get('button').text()).toBe('Main Content');
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
