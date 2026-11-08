export const NAVIGATION = [
  // Флаг для открытия в новом окне - external: true 
  { id: 1, 
    name: 'menu.business',
    link: '/business',
  },
  { 
    id: 3, 
    name: 'menu.about', 
    slug: '/about',
    link: '/about',
    channels: [
      { id: 21, name: 'menu.aboutPriorities', link: '/about/strategy', static: true },
      { id: 21, name: 'menu.aboutCsr', link: 'https://pro.gazprom-media.com/', external: true, static: true },
      { id: 22, name: 'menu.aboutCareer', link: '/about/career', static: true },
      { id: 23, name: 'menu.aboutHistory', link: '/about/history',static: true},
    ]
  },
  { id: 4, name: 'menu.media', link: '/media', },
  { id: 6, name: 'menu.contacts', link: '/contacts' },
  { 
    id: 7, 
    name: 'menu.ui',
    slug: '/ui',  
    link: '/ui', 
    channels: [
      { id: 71, name: 'menu.uiFonts', link: '/ui/fonts', static: true },
      { id: 72, name: 'menu.uiTokens', link: '/ui/tokens', static: true },
      { id: 73, name: 'menu.uiElements', link: '/ui/elements', static: true },
      { id: 74, name: 'menu.uiWidgets', link: '/ui/widgets', static: true },
    ]
  }
]