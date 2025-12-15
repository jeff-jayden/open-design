import { mount } from '@vue/test-utils'
import Collapse from '../src/collapse.vue'
import CollapseItem from '../src/collapse-item.vue'

describe('Collapse', () => {
  it('should render correctly', () => {
    const wrapper = mount(Collapse, {
      props: {
        modelValue: []
      },
      slots: {
        default: `
          <CollapseItem name="a" title="Title A">
            <div>content a</div>
          </CollapseItem>
          <CollapseItem name="b" title="Title B">
            <div>content b</div>
          </CollapseItem>
        `
      },
      global: {
        components: {
          CollapseItem
        }
      }
    })
    expect(wrapper.find('.open-collapse').exists()).toBe(true)
    expect(wrapper.findAll('.open-collapse-item').length).toBe(2)
  })
})
