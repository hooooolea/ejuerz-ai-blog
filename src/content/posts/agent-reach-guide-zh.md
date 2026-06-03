---
author: "AI Toolkit Guide"
pubDatetime: 2026-06-03
title: "我的 AI Agent 老是对我撒谎——直到我给它装了一双眼睛"
featured: false
draft: false
tags: ["AI Tools", "Agent", "CLI", "Open Source"]
description: "大多数 AI Agent 其实搜不了网页。它们要么瞎编，要么烧 API 费用。我用一个开源工具解决了这个问题。"
---

## 我不再相信我的 Agent 了

前几周，我让我的 AI Agent 帮我搜一下 Reddit 上大家对某个编程工具的评价。

它回来了一份非常详细的总结。提到了具体 subreddit。有用户名。甚至引用了"最高赞评论"和点赞数。

看起来很专业对吧？

**全是编的。** 那个 subreddit 根本不存在。用户名是幻觉。评论是 AI 凭空生成的、包装得很像调研结果的小说。

我之所以发现，是因为那次碰巧去核实了一下。但之前呢？有多少次我的 Agent 喂给我一堆看起来合情合理的废话，而我直接就信了？

## 瞎子给瞎子带路

2026 年了，说句不好听的：**大部分 AI Agent 根本不会搜网页。** 真不会。

它们能读你粘贴的链接。能搜你本地的文件。但你要是让它去 Twitter 看看大家在讨论什么、去 Reddit 翻翻帖子、去小红书看看趋势——它就傻了。要么：

- **瞎编**（自信满满地编造搜索结果，看着跟真的一样）
- **烧钱**（走 Twitter、Reddit 官方 API，按次计费，$100/月说没就没）
- **摆烂**（"抱歉，我无法访问该平台"）

哪种都不是正经干活的样子。

## 我到底需要什么

我不需要魔法。我只需要 Agent 能像我自己手动操作一样：

1. **真的去搜**，不是假装搜了
2. **返回真实内容**，不是生成一段看似合理的总结
3. 不用我每个月掏 $100 的 API 费用
4. 搜不到就直说搜不到，别骗我

就这么简单。不花哨。

## Agent Reach

我在 GitHub 上翻到了 [Agent Reach](https://github.com/Panniantong/agent-reach) —— 20,000+ Star，MIT 协议，持续更新。它的定位一句话：**"给你的 AI Agent 装上眼睛，让它看见整个互联网。"**

打动我的是这一点：**它不走付费 API。** 它做的是安装一套开源的命令行工具——就是那些已经在社区用了好多年的东西——然后把它们接到你的 Agent 里。你的 Agent 执行 `twitter search "关键词"`，拿到的就是真实推文。执行 `rdt search`，就真的去 Reddit 搜了。没有 API Key，没有月费账单。

支持 15+ 平台。8 个装完就能用，零配置——YouTube、B站、微博、微信公众号、V2EX、RSS、全网搜索。需要登录的平台（Twitter、Reddit、小红书），从浏览器导出一次 Cookie 就搞定。

## 到底能搜哪些地方

下面是我的 Agent 现在实际能访问的所有平台，以及它用的真实命令。不画饼，只说能用的和不能用的。

### 装完即用（零配置）

这些在 `agent-reach install` 跑完的那一刻就能用：

| 平台 | Agent 能干什么 | 背后实际执行的命令 |
|------|--------------|-----------------|
| 🌐 任意网页 | 把任何 URL 读成干净文本 | `curl -s "https://r.jina.ai/URL"` |
| 🔍 全网搜索 | AI 语义搜索整个开放互联网 | `mcporter call exa.web_search_exa` |
| 📺 YouTube | 搜视频、提取任意语言字幕 | `yt-dlp --dump-json "URL"` |
| 📺 B站 | 同上——字幕、热门、搜索、排行 | `bili hot` / `bili search "关键词"` |
| 📰 微博 | 热搜、搜内容/用户、读评论 | `mcporter call weibo.get_trendings` |
| 💬 微信公众号 | 搜索+全文阅读公众号文章 | Exa 搜索 + Jina Reader |
| 💻 V2EX | 热门帖子、节点浏览、回复详情 | `curl -s "https://www.v2ex.com/api/..."` |
| 📡 RSS | 阅读任意 RSS/Atom 源 | `python3 -c "import feedparser..."` |

### 需要浏览器 Cookie（一次性配置）

浏览器登录 → Cookie-Editor 导出 → 搞定。Cookie 只存在你的电脑上。

| 平台 | Agent 能干什么 | 背后实际执行的命令 |
|------|--------------|-----------------|
| 🐦 Twitter/X | 搜推文、读时间线、读长文 | `twitter search "关键词" -n 10 --json` |
| 📖 Reddit | 搜帖子、读完整帖子+所有评论 | `rdt search "关键词"` / `rdt read POST_ID` |
| 📕 小红书 | 搜笔记、读全文、评论、发帖、点赞 | `xhs search "关键词"` / `xhs read NOTE_ID` |
| 💼 LinkedIn | 读 Profile、公司页面、职位 | `mcporter call linkedin.get_person_profile` |
| 📈 雪球 | 股票行情、市场趋势、搜帖子 | `mcporter call xueqiu...` |

### 需要免费 Key（可选）

| 平台 | Agent 能干什么 | 背后实际执行的命令 |
|------|--------------|-----------------|
| 🎵 抖音 | 解析视频、拿无水印下载链接 | `mcporter call douyin.parse_douyin_video_info` |
| 🎙️ 小宇宙 | 播客音频 → Whisper 转文字 | `bash transcribe.sh PODCAST_ID` |

### 还有一个基本不费力就能用的

| 平台 | Agent 能干什么 | 背后实际执行的命令 |
|------|--------------|-----------------|
| 📦 GitHub | 搜仓库、读代码、提 Issue、开 PR | `gh search repos "关键词" --sort stars` |

### 实际用起来什么样

当我对 Agent 说"帮我搜一下大家对 QuickBooks 定价的真实评价"，它不会猜。它直接跑：

```bash
twitter search "QuickBooks pricing" -n 15 --json
rdt search "QuickBooks too expensive" --limit 10
xhs search "QuickBooks 太贵"
mcporter call exa.web_search_exa query="QuickBooks pricing complaints 2026"
```

几秒钟内，它拿到了真实推文、真实 Reddit 帖子、真实小红书笔记、真实网页搜索结果。然后它会读最相关的那几条，交叉比对，最后给我一份真正的调研总结——**每条结论都能点开原文验证。**

没有虚构的 subreddit。没有不存在的用户。只有真实存在的东西。

## 真的有用吗

我配了 Hermes Agent + Agent Reach，用了几个星期。变化是这样的：

**装之前：**
- 让 Agent 调研点什么 → 拿回来一堆 AI 生成的总结，不知道真假
- 想核实只能手动一条条去搜
- Agent 有时候承认自己搜不了，有时候就……直接编
- 每次调研都像在赌

**装之后：**
- Agent 真的去 Twitter、Reddit、小红书实时搜索
- 结果可以溯源——我能看到它具体读了哪个帖子
- 哪个平台挂了（比如 Cookie 过期），工具会明确告诉我——不用猜
- 我可以点原文链接验证任何结论

完美吗？不。有些平台偶尔要刷新 Cookie。Reddit 封锁数据中心 IP（$1/月的代理就解决了）。有时候就是搜不出什么东西——因为真的就没有。

但**我知道什么时候它在干活，什么时候它没在干活。** 光是这个透明度，就值得花那三分钟装一下。

## 怎么装

> **不用自己敲命令。** 把这个链接发给你的 AI Agent：`https://github.com/Panniantong/agent-reach`

跟它说一句"帮我装上配好"。它会自己读 README、跑安装，然后告诉你哪些平台通了、哪些需要你的浏览器 Cookie。你只需要在它要 Cookie 的时候提供就行。

> **OpenClaw 用户注意**：默认配置跑不了 shell 命令，先让 Agent 执行 `openclaw config set tools.profile "coding"`，然后重启 Gateway，否则装不上。

## 我想对刚开始用的人说

如果你在用任何 AI Agent（Claude Code、Cursor、Hermes、OpenClaw——实测都兼容），而且你也遇到过让它"帮我搜一下网上的评价"然后拿回来一堆模棱两可甚至虚构的结果——**装上 Agent Reach。**

它不会让你的 Agent 变聪明。但它会阻止 Agent 对你说谎——至少不再在"我能不能搜"这件事上说谎。

说实话，这一点比任何新功能都值。

---

[Agent Reach on GitHub](https://github.com/Panniantong/agent-reach) · MIT License · 20K+ Stars
