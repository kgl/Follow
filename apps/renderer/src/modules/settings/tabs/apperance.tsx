import { useTranslation } from "react-i18next"
import { bundledThemesInfo } from "shiki/themes"

import { createDefineSettingItem } from "~/atoms/settings/helper"
import {
  setUISetting,
  useUISettingKey,
  useUISettingSelector,
  useUISettingValue,
} from "~/atoms/settings/ui"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select"
import { isElectronBuild } from "~/constants"
import { useIsDark, useSetTheme, useThemeAtomValue } from "~/hooks/common"
import { getOS } from "~/lib/utils"

import { SettingTabbedSegment } from "../control"
import { ContentFontSelector, UIFontSelector } from "../sections/fonts"
import { createSettingBuilder } from "../setting-builder"

const SettingBuilder = createSettingBuilder(useUISettingValue)
const defineItem = createDefineSettingItem(useUISettingValue, setUISetting)

export const SettingAppearance = () => {
  const { t } = useTranslation("settings")
  return (
    <div className="mt-4">
      <SettingBuilder
        settings={[
          {
            type: "title",
            value: t("appearance.general"),
          },
          AppThemeSegment,

          defineItem("opaqueSidebar", {
            label: t("appearance.opaque_sidebars.label"),
            hide: !window.api?.canWindowBlur,
          }),

          {
            type: "title",
            value: t("appearance.unread_count"),
          },

          defineItem("showDockBadge", {
            label: t("appearance.show_dock_badge.label"),
            hide: !window.electron || !["macOS", "Linux"].includes(getOS()),
          }),

          defineItem("sidebarShowUnreadCount", {
            label: t("appearance.sidebar_show_unread_count.label"),
          }),

          {
            type: "title",
            value: t("appearance.fonts"),
          },
          TextSize,
          UIFontSelector,
          ContentFontSelector,
          {
            type: "title",
            value: t("appearance.content"),
          },
          ShikiTheme,

          defineItem("guessCodeLanguage", {
            label: t("appearance.guess_code_language.label"),
            hide: !isElectronBuild,
            description: t("appearance.guess_code_language.description"),
          }),

          defineItem("readerRenderInlineStyle", {
            label: t("appearance.reader_render_inline_style.label"),
            description: t("appearance.reader_render_inline_style.description"),
          }),
          {
            type: "title",
            value: t("appearance.misc"),
          },

          defineItem("modalOverlay", {
            label: t("appearance.modal_overlay.label"),
            description: t("appearance.modal_overlay.description"),
          }),
          defineItem("reduceMotion", {
            label: t("appearance.reduce_motion.label"),
            description: t("appearance.reduce_motion.description"),
          }),
        ]}
      />
    </div>
  )
}

const ShikiTheme = () => {
  const { t } = useTranslation("settings")
  const isDark = useIsDark()
  const codeHighlightThemeLight = useUISettingKey("codeHighlightThemeLight")
  const codeHighlightThemeDark = useUISettingKey("codeHighlightThemeDark")

  return (
    <div className="mb-3 flex items-center justify-between">
      <span className="shrink-0 text-sm font-medium">{t("appearance.code_highlight_theme")}</span>
      <Select
        defaultValue={isDark ? "github-dark" : "github-light"}
        value={isDark ? codeHighlightThemeDark : codeHighlightThemeLight}
        onValueChange={(value) => {
          if (isDark) {
            setUISetting("codeHighlightThemeDark", value)
          } else {
            setUISetting("codeHighlightThemeLight", value)
          }
        }}
      >
        <SelectTrigger size="sm" className="w-48">
          <SelectValue />
        </SelectTrigger>
        <SelectContent position="item-aligned">
          {bundledThemesInfo
            .filter((theme) => theme.type === (isDark ? "dark" : "light"))
            .map((theme) => (
              <SelectItem key={theme.id} value={theme.id}>
                {theme.displayName}
              </SelectItem>
            ))}
        </SelectContent>
      </Select>
    </div>
  )
}

const textSizeMap = {
  smaller: 15,
  default: 16,
  medium: 18,
  large: 20,
}

const TextSize = () => {
  const { t } = useTranslation("settings")
  const uiTextSize = useUISettingSelector((state) => state.uiTextSize)

  return (
    <div className="-mt-1 mb-3 flex items-center justify-between">
      <span className="shrink-0 text-sm font-medium">{t("appearance.text_size")}</span>
      <Select
        defaultValue={textSizeMap.default.toString()}
        value={uiTextSize.toString() || textSizeMap.default.toString()}
        onValueChange={(value) => {
          setUISetting("uiTextSize", Number.parseInt(value) || textSizeMap.default)
        }}
      >
        <SelectTrigger size="sm" className="w-48 capitalize">
          <SelectValue />
        </SelectTrigger>
        <SelectContent position="item-aligned">
          {Object.entries(textSizeMap).map(([size, value]) => (
            <SelectItem className="capitalize" key={size} value={value.toString()}>
              {size}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

const AppThemeSegment = () => {
  const { t } = useTranslation("settings")
  const theme = useThemeAtomValue()
  const setTheme = useSetTheme()

  return (
    <SettingTabbedSegment
      key="theme"
      label={t("appearance.theme.label")}
      value={theme}
      values={[
        {
          value: "system",
          label: t("appearance.theme.system"),
          icon: <i className="i-mingcute-monitor-line" />,
        },
        {
          value: "light",
          label: t("appearance.theme.light"),
          icon: <i className="i-mingcute-sun-line" />,
        },
        {
          value: "dark",
          label: t("appearance.theme.dark"),
          icon: <i className="i-mingcute-moon-line" />,
        },
      ]}
      onValueChanged={(value) => {
        setTheme(value as "light" | "dark" | "system")
      }}
    />
  )
}
