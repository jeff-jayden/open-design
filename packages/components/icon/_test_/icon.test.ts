import { mount } from '@vue/test-utils'
import Icon from '../src/icon.vue'

describe('Icon', () => {
  it('should render correctly', () => {
    const wrapper = mount(Icon, {
      props: {
        loading: true
      }
    })
    expect(wrapper.find('i').exists()).toBe(true)
    expect(wrapper.classes()).toContain('loading')
  })
})
