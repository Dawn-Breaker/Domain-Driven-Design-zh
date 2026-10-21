// .vuepress/config.mjs — 本地化改造为 VuePress 2（原 v1 配置，改法参照隔壁 aposd2e-zh）
import { viteBundler } from '@vuepress/bundler-vite'
import { defaultTheme } from '@vuepress/theme-default'

export default {
  bundler: viteBundler({}),
  // 网站的标题
  title: "领域驱动设计 中文",
  // 上下文根（本地阅读直接走根路径）
  base: "/",
  theme: defaultTheme({
    editLink: true,
    editLinkText: "帮助我们改善此页面！",
    lastUpdated: true,
    sidebarDepth: 2,
    nav: [],
    sidebar: {
      "/": [
        "",
        "part1.md",
        "ch1.md",
        "ch2.md",
        "ch3.md",
        "part2.md",
        "ch4.md",
        "ch5.md",
        "ch6.md",
        "ch7.md",
        "part3.md",
        "ch8.md",
        "ch9.md",
        "ch10.md",
        "ch11.md",
        "ch12.md",
        "ch13.md",
        "part4.md",
        "ch14.md",
        "ch15.md",
        "ch16.md",
        "ch17.md",
        "conclusion.md"
      ]
    }
  })
}
