import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Miresa documentation",
  description: "The official documentation for Miresa",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'API reference', link: '/api/starting' }
    ],

    sidebar: [
      {
        text: 'API',
        collapsed: true,
        items: [
          { text: 'Full reference', link: '/api/ref' },
          { text: 'Usage examples', link: '/api/examples' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/miresa-dev' }
    ]
  }
})
