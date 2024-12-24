import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Miresa documentation",
  description: "The official documentation for Miresa",
  base: "/doc/",
  head: [['link', { rel: 'icon', href: '/assets/icon.png' }]],
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
        link: '/api/starting',
        items: [
          { text: 'Full reference', link: '/api/ref' },
          { text: 'Usage examples', link: '/api/examples' }
        ]
      },
      {
        text: 'Self Hosting',
        collapsed: true,
        link: '/selfhost/starting',
        items: [
          { text: 'Configuration', link: '/selfhost/config' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/miresa-dev' }
    ]
  }
})
