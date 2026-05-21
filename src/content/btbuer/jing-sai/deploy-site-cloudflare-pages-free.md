---
title: "5 分钟在 Cloudflare 上发布一个网站，不需要域名"
description: "做完竞赛项目，想快速给评委看一个在线展示页面？Cloudflare Pages 免费提供 .pages.dev 域名，上传文件就能用，不需要买域名，不需要服务器。"
pubDatetime: 2026-05-20T09:00:00Z
tags:
  - 教程
  - cloudflare
  - 建站
  - basics
  - btbuer
  - 竞赛经验
author: ejuer
featured: false
---

做竞赛、课设、或者只是想把项目展示给别人看——最快的方式就是 Cloudflare Pages。

免费，不限流量，上传完就有一个 `xxx.pages.dev` 的链接，直接发给评委或者老师。不需要买域名，不需要服务器，注册个账号就能用。

## 你需要准备什么

- 一个 [Cloudflare 账号](https://dash.cloudflare.com/sign-up)（免费注册，邮箱即可）
- 你的网站文件——哪怕只有一个 `index.html` 也行



---

## 方法一：直接上传文件（最快，5 分钟内）

适合情况：你有现成的 HTML / CSS / JS 文件，不用 GitHub，不想折腾。

**第一步**：登录 [Cloudflare Dashboard](https://dash.cloudflare.com)，左侧菜单点 **Workers & Pages**。

**第二步**：点右上角 **Create**，选 **Pages** 标签，然后点 **Upload assets**。

**第三步**：给项目起个名字，比如 `my-project`。这会决定你的域名是 `my-project.pages.dev`，起之前想好。

**第四步**：把你的文件夹（包含 `index.html`）直接拖进去，或者点选文件上传。

**第五步**：点 **Deploy site**，等十几秒，完成。

你会拿到一个 `xxx.pages.dev` 的链接，全球可访问，HTTPS 自动开启。

---

## 方法二：连接 GitHub 自动部署 *(适合计算机相关专业同学)*

适合情况：你的代码在 GitHub 上，以后还要继续更新，想每次 push 自动更新网站。

**第一步**：同样进 Workers & Pages → Create → Pages，这次选 **Connect to Git**。

**第二步**：授权 Cloudflare 访问你的 GitHub，选择对应的仓库。

**第三步**：配置构建设置：

| 项目类型 | 构建命令 | 输出目录 |
|---------|---------|---------|
| 纯 HTML | （留空） | `/`（根目录）|
| Vite / Vue / React | `npm run build` | `dist` |
| Astro | `npm run build` | `dist` |
| Next.js | `npm run build` | `.next` |

**第四步**：点 **Save and Deploy**，第一次部署大概 1-2 分钟。

之后每次你 push 代码，网站自动更新，不用手动操作。

---

## 更新文件怎么办

用直接上传的方式，更新也很简单：

进 Workers & Pages → 找到你的项目 → **Create deployment** → 重新上传文件。

每次上传都会生成一个新版本，旧版本也保留，可以随时回滚。

---

## 能用自己的域名吗

可以，但不是必须的。如果你之后想换成自己的域名（比如 `myproject.com`），在项目设置里的 **Custom domains** 里加一下就行，不影响现有的 `.pages.dev` 链接。

---

这套方案完全免费，没有流量限制，不会过期。竞赛结束了网站还在，想展示随时能发链接。