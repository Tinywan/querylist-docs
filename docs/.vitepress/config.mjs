import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "QueryList",
  description: "QueryList",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: '入门指南', link: '/markdown-examples' },
      { text: 'API手册', link: '/markdown-examples' },
      {
        text: '版本',
        items: [
          { text: 'v4', link: '/v4/guide/', activeMatch: '/v4/' },
          { text: 'v3', link: '/v3/guide/', activeMatch: '/v3/' }
        ]
      }
    ],

    sidebar: {
      '/v4/guide/': [{
        text: 'Examples V4',
        items: [
          { text: 'overview V4', link: '/v4/guide/overview' },
          { text: 'Runtime API Examples', link: '/api-examples' }
        ]
      }],
      '/v3/guide/': [{
        text: 'Examples V3',
        items: [
          { text: 'Markdown Examples V3', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' }
        ]
      }]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ],

    editLink: {
      pattern: 'https://github.com/jae-jae/querylist-docs/edit/main/docs/:path'
    },
    search: {
      provider: 'local'
    }
  },
  lastUpdated: true
})
