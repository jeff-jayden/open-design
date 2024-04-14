import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
const opDescription = '一个包含通用组件的库'
const opTitle = 'Open-Design'


export default defineConfig({
  title: opTitle,
  description: opDescription,
  head: [['link']]
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '主页', link: '/' },
      { text: '组件', link: '/markdown-examples' }
    ],

    sidebar: [
      {
        text: 'Examples',
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
