export const NAVIGATION = [
  // Флаг для открытия в новом окне - external: true 
  { id: 1, 
    name: 'menu.business',
    link: '/business',
  },
  { 
    id: 2, 
    name: 'menu.about',
    link: '/about',
    channels: [
      { id: 21, name: 'menu.aboutPriorities', link: '/about/strategy', static: true },
      { id: 22, name: 'menu.aboutCsr', link: 'https://pro.gazprom-media.com/', external: true, static: true },
      { id: 23, name: 'menu.aboutCareer', link: '/about/career', static: true },
      { id: 24, name: 'menu.aboutHistory', link: '/about/history',static: true},
    ]
  },
  { id: 3, name: 'menu.media', link: '/media', },
  { id: 4, name: 'menu.contacts', link: '/contacts' },
  { 
    id: 5, 
    name: 'menu.ui', 
    link: '/ui', 
    channels: [
      { id: 51, name: 'menu.uiFonts', link: '/ui/fonts', static: true },
      { id: 52, name: 'menu.uiTokens', link: '/ui/tokens', static: true },
      { id: 53, name: 'menu.uiElements', link: '/ui/elements', static: true },
      { id: 54, name: 'menu.uiWidgets', link: '/ui/widgets', static: true },
    ]
  }
]