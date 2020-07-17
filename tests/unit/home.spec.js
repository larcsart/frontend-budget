import { shallowMount } from '@vue/test-utils'
import Home from '@/views/Home.vue'

describe('Home.vue', () => {
  it('renders representative', () => {
    const wrapper = shallowMount(Home)
    expect(wrapper.text()).toMatch('Representative')
  })

  it('renders orders', () => {
    const wrapper = shallowMount(Home)
    expect(wrapper.text()).toMatch('Orders')
  })

  it('renders buttons', () => {
    const wrapper = shallowMount(Home)
    expect(wrapper.html()).toContain('New Product')
    expect(wrapper.html()).toContain('New Order')
  })
})
