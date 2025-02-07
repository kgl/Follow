export interface GeneralSettings {
  appLaunchOnStartup: boolean
  language: string
  dataPersist: boolean
  sendAnonymousData: boolean
  unreadOnly: boolean
  scrollMarkUnread: boolean
  hoverMarkUnread: boolean
  renderMarkUnread: boolean
  groupByDate: boolean
  jumpOutLinkWarn: boolean
}

export interface UISettings {
  entryColWidth: number
  feedColWidth: number
  opaqueSidebar: boolean
  sidebarShowUnreadCount: boolean
  uiTextSize: number
  showDockBadge: boolean
  modalOverlay: boolean
  modalDraggable: boolean
  modalOpaque: boolean
  reduceMotion: boolean
  uiFontFamily: string
  readerFontFamily: string
  readerRenderInlineStyle: boolean
  codeHighlightThemeLight: string
  codeHighlightThemeDark: string
  guessCodeLanguage: boolean

  // view
  pictureViewMasonry: boolean
  pictureViewFilterNoImage: boolean

  // tts
  voice: string
}

export interface IntegrationSettings {
  enableEagle: boolean
  enableReadwise: boolean
  readwiseToken: string
  enableInstapaper: boolean
  instapaperUsername: string
  instapaperPassword: string
}
