---
title: "让 AI 帮你做一个可以直接上传的展示网站"
description: "让 ChatGPT 或 Claude 帮你生成网站代码，但要在提示词里说清楚用纯 HTML/CSS，不然它会生成 React，你就没法直接拖到 Cloudflare 上了。"
pubDatetime: 2026-05-20T10:00:00Z
tags:
  - 教程
  - ai-tools
  - basics
  - cloudflare
  - btbuer
author: ejuer
featured: false
---

上一篇说了[怎么把网站拖上 Cloudflare](/posts/deploy-site-cloudflare-pages-free/)——直接上传 HTML 文件，几十秒上线。

这篇说怎么让 AI 帮你生成这个 HTML 文件。

## 有一个坑

你直接让 AI「帮我做一个展示网站」，它十有八九会生成 React 或 Vue 代码。这种代码需要安装 Node.js、运行 `npm run build` 才能得到最终文件，没法直接上传到 Cloudflare Pages。

解决方法很简单：在提示词里说清楚「用纯 HTML + CSS + JavaScript，不用任何框架，部署到 Cloudflare Pages」。

## 单文件还是多文件？

两种都可以直接上传到 Cloudflare Pages：

**单文件**（`index.html`）：内容少的时候用，最简单，上传一个文件就行。

**多文件**（一个文件夹）：内容多、有多个独立页面时用。比如首页 `index.html`、详情页 `detail.html`、关于页 `about.html`，放在同一个文件夹里，整个文件夹拖上去就行。页面之间用普通的 `<a href="detail.html">` 链接跳转，不需要路由框架。

---

## 提示词模板

### 基础版——单页项目展示

```
帮我用纯 HTML + CSS + JavaScript 做一个项目展示网站，
部署到 Cloudflare Pages，直接上传文件夹，不需要构建步骤。

要求：
- 不使用任何前端框架（不用 React、Vue、Svelte 等）
- 不用 npm，不用构建工具
- 可以用 CDN 引入的库（如 highlight.js）
- 深色主题，响应式

页面内容：
- 项目名称：[你的项目名]
- 一句话介绍：[项目介绍]
- 主要功能：[列出 3-5 个功能点]
- 技术栈：[用了什么技术]
- GitHub 链接：[你的仓库地址]
- 团队成员：[姓名列表]

只输出 index.html 的完整代码。
```

### 进阶版——多页面网站

```
帮我用纯 HTML + CSS + JavaScript 做一个多页面展示网站，
部署到 Cloudflare Pages，整个文件夹直接拖上去，不需要任何构建。

页面结构：
- index.html：首页，项目介绍 + 功能亮点 + 导航到其他页面
- features.html：功能详情，3 列卡片展示每个功能
- about.html：团队介绍 + 联系方式

导航栏在所有页面顶部都有，用普通 <a href> 链接跳转，不用路由。
公共的 CSS 写在 style.css 里，三个页面都引用。

设计要求：
- 白色主题，主色 #2563eb
- 顶部固定导航栏，当前页面高亮
- 卡片有悬停效果

内容：
产品名称：[名称]
核心卖点：[一句话]
三个主要功能：[功能1] [功能2] [功能3]
团队成员：[名单]
联系邮箱：[邮箱]

输出所有文件的完整代码，标注每个文件的文件名。
```

### 提示词展示页

```
帮我用纯 HTML + CSS + JavaScript 做一个提示词收藏网站，
部署到 Cloudflare Pages，直接上传，不需要构建。

功能：
- 提示词以卡片网格展示
- 每张卡片有标题、分类标签、简短描述、提示词原文（可滚动）
- 每张卡片有「复制」按钮，点击复制提示词原文
- 顶部分类筛选按钮
- 支持深色/浅色模式跟随系统

提示词数据写在 JS 数组里，方便后续自己改。

只输出 index.html 的完整代码。
```

---

## 用法

把模板贴到 ChatGPT 或 Claude，把方括号内容换成你的，发送。

**单文件**：AI 输出的代码保存成 `index.html`，直接拖到 Cloudflare Pages 上传框。

**多文件**：AI 会输出多个文件的代码，分别保存到同一个文件夹里（注意文件名要对上），然后把整个文件夹拖上去。

具体上传步骤看[上一篇](/posts/deploy-site-cloudflare-pages-free/)。

---

## 如果 AI 生成的不满意

**样式不好看**：补一句「重新设计，参考 Linear 或 Vercel 官网的设计风格」

**代码打开是空白**：把代码贴回去说「这段代码打开是空白页，帮我检查一下」

**想加页面**：「再帮我加一个 faq.html，问答格式，导航栏里也加上这个链接」

**想改内容**：继续在同一个对话里说，AI 会在原来的基础上修改。

---

## 关键词备忘

> **纯 HTML + CSS + JavaScript，不用框架，不用构建工具，部署到 Cloudflare Pages**

提示词里带上这几个词，AI 生成的文件拿来就能直接传。
