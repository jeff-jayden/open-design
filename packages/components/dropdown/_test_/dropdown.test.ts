import { mount } from '@vue/test-utils'
import Dropdown from '../src/dropdown.vue'

describe('Dropdown', () => {
  it('should render correctly', () => {
    const wrapper = mount(Dropdown, {
      props: {
        options: [{ label: 'Option 1', key: '1' }, { label: 'Option 2', key: '2' }],
      },
      slots: {
        default: '<button>Dropdown</button>',
      },
    })
    expect(wrapper.find('.open-dropdown').exists()).toBe(true)
    expect(wrapper.find('button').exists()).toBe(true)
  })
})
