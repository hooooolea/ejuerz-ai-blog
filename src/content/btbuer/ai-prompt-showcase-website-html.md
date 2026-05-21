---
title: "让大模型帮你做一个可以直接上传的展示网站"
description: "提示词加一句话，让大模型生成纯 HTML/CSS，上传 Cloudflare 就能用。"
pubDatetime: 2026-05-20T10:00:00Z
tags:
  - 教程
  - ai-tools
  - basics
  - cloudflare
  - btbuer
  - 竞赛经验
author: ejuer
featured: false
---

[怎么把网站拖上 Cloudflare Pages](/posts/deploy-site-cloudflare-pages-free/)说过了，这篇说怎么让大模型生成代码。

大模型直接写会出 React/Vue，上传不了。加一句「纯 HTML + CSS + JS」就行。

## 提示词模板

```
帮我做一个项目展示网站，纯 HTML + CSS + JavaScript。

要求：
- 不用 React/Vue/任何框架，不用 npm
- 设计简洁大方，可以加适当的动效

内容：
- 项目名称：[名称]
- 一句话介绍：[介绍]
- 主要功能：[功能点]
- 团队成员：[名单]

输出单个 index.html 的完整代码。
```

## 用法

方括号换成你的，发给大模型。输出保存成 `index.html`，拖到 [Cloudflare Pages](/posts/deploy-site-cloudflare-pages-free/) 上传框。

不满意继续在对话里说，大模型会帮你改。
