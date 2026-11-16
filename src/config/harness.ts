/**
 * 顶层 harness 的应用清单。
 *
 * harness 是整个站点的最上层入口：列出站点提供的各个应用，
 * 第一个应用通常是主应用（EduAgent）。新增应用只需在这里追加一项。
 */
export interface HarnessApp {
  /** 唯一标识，用于锚点与测试选择器 */
  id: string;
  /** 应用名称 */
  name: string;
  /** 一句话说明 */
  description: string;
  /** 入口地址（可为外站） */
  url: string;
  /** 是否跳转到站外 */
  external?: boolean;
  /** 卡片上的标签，如 "主应用" */
  badge?: string;
  /** 主题色（CSS 颜色值），用于卡片左侧色条 */
  accent?: string;
  /** 图标字符，作为无图片时的占位标识 */
  glyph?: string;
}

export const harnessApps: HarnessApp[] = [
  {
    id: "eduagent",
    name: "EduAgent",
    description:
      "你的学习智能体：对话答疑、学习诊断、知识库与知识图谱，随时接着上次继续。",
    url: "https://eduagent.ejuerz.com/",
    external: true,
    badge: "主应用",
    accent: "#4f6ef7",
    glyph: "E",
  },
];

export const harnessMeta = {
  title: "应用",
  subtitle: "这里是站点的最上层入口，选择一个应用开始。",
  open: "进入",
  backToSite: "返回站点首页",
};
