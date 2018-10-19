import { mount } from '@vue/test-utils'
import MarkdownRender from '@/components/MarkdownRender.vue'
import Vue from 'vue'

describe('MarkdownRender.vue', () => {
  it('check markdown render', () => {
    const markdown =
      '# Heading 1\n' +
      '## Heading 2\n' +
      '*Italic*  \n' +
      '**Blod**  \n' +
      '[Link](https://target.com)  \n' +
      '![Image](https://example.com/a.png)  \n' +
      '> Blockquote  \n\n' +
      '* List 1  \n* List 2  \n\n' +
      '`Inline code`  \n'
    const wrapper = mount(MarkdownRender, {
      propsData: { markdown }
    })

    return Vue.nextTick().then(() => {
      expect(wrapper.find('h1').text()).toBe('Heading 1')
      expect(wrapper.find('h2').text()).toBe('Heading 2')
      expect(wrapper.find('em').text()).toBe('Italic')
      expect(wrapper.find('strong').text()).toBe('Blod')
      expect(wrapper.find('a').text()).toBe('Link')
      expect(wrapper.find('a').attributes('href')).toBe('https://target.com')
      expect(wrapper.find('img').attributes('alt')).toBe('Image')
      expect(wrapper.find('img').attributes('src')).toBe('https://example.com/a.png')
      expect(wrapper.findAll('ul > li').at(1).text()).toBe('List 2')
      expect(wrapper.find('code').text()).toBe('Inline code')
    })
  })

  it('check katex render', () => {
    const markdown = '$ \\sum_{i=1}^{n} \\mu(i) $'
    const wrapper = mount(MarkdownRender, {
      propsData: { markdown }
    })

    return Vue.nextTick().then(() => {
      expect(wrapper.find('span.katex').text()).toMatch('∑')
      expect(wrapper.find('span.katex').text()).toMatch('μ')
    })
  })

  it('check update', () => {
    const origin_markdown = '# Heading 1'
    const new_markdown = '## Heading 2'
    const wrapper = mount(MarkdownRender, {
      propsData: { markdown: origin_markdown }
    })

    return Vue.nextTick().then(() => {
      expect(wrapper.find('h1').text()).toBe('Heading 1')

      wrapper.setProps({ markdown: new_markdown })
      return Vue.nextTick().then(() => {
        expect(wrapper.find('h2').text()).toBe('Heading 2')
      })
    })
  })
})
