export const NAVIGATION = [
  // Флаг для открытия в новом окне - external: true 
  { id: 1, 
    name: 'menu.business', 
    slug: '/business' 
  },
  { 
    id: 3, 
    name: 'menu.about', 
    slug: '/about',
    channels: [
      { id: 21, name: 'menu.aboutPriorities', slug: '/about/strategy', static: true },
      { id: 21, name: 'menu.aboutCsr', slug: 'https://pro.gazprom-media.com/', external: true, static: true },
      { id: 22, name: 'menu.aboutCareer', slug: '/about/career', static: true },
      { id: 23, name: 'menu.aboutHistory', slug: '/about/history', static: true},
    ]
  },
  { id: 4, name: 'menu.media', slug: '/media' },
  { id: 6, name: 'menu.contacts', slug: '/contacts' },
  { 
    id: 7, 
    name: 'menu.ui', 
    slug: '/ui', 
    channels: [
      { id: 71, name: 'menu.uiFonts', slug: '/ui/fonts', static: true },
      { id: 72, name: 'menu.uiTokens', slug: '/ui/tokens', static: true },
      { id: 73, name: 'menu.uiElements', slug: '/ui/elements', static: true },
      { id: 74, name: 'menu.uiWidgets', slug: '/ui/widgets', static: true },
    ]
  }
]