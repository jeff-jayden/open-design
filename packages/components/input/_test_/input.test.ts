import { mount } from '@vue/test-utils'
import Input from '../src/input.vue'
import { nextTick } from 'vue'

describe('Input', () => {
  it('should render correctly', () => {
    const wrapper = mount(Input, {
      props: {
        modelValue: 'test'
      }
    })
    expect(wrapper.find('input').exists()).toBe(true)
    expect(wrapper.find('input').element.value).toBe('test')
  })
})
