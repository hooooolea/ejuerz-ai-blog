---
author: AI Toolkit Guide
pubDatetime: 2025-05-14T09:00:00Z
title: Midjourney 新手入门指南：从零开始生成好看的图
slug: midjourney-rumen-zhinan
featured: true
draft: false
tags:
  - midjourney
  - ai绘图
  - 提示词
  - 新手
description: "Midjourney 完全新手指南：如何写出真正有效的提示词，常用参数解析，以及快速提升出图质量的实用技巧。"
---

Midjourney 是目前最强大的 AI 绘图工具之一。它生成的图可以是震撼的、超现实的、逼真的摄影风格，也可以是油画质感——完全取决于你怎么写提示词。

新手最常遇到的问题是：随便输入"一只狗站在山上"，得到一张普通的图，然后觉得这工具也不过如此。实际上，Midjourney 对提示词技巧的要求很高。掌握几个核心方法，出图质量会从平庸直接跃升到让人惊叹。

这篇指南涵盖你入门需要知道的所有内容。

## 目录

## Midjourney 怎么用（极简版）

Midjourney 在 Discord 里运行。你加入他们的服务器（或者直接用 Midjourney 官网），在频道里输入指令，AI 就会根据你的描述生成四张图。你可以放大最喜欢的那张，对它做变体，或者用优化后的提示词重新生成。

访问方式：去 [midjourney.com](https://midjourney.com) 用 Discord 账号登录。目前没有完全免费的方案——基础套餐约 $10/月，每月大约能生成 200 张图。

进去之后，用 `/imagine` 指令跟着输入你的提示词。

## 一个好提示词的结构

Midjourney 的提示词不只是描述——它是一组指令，引导 AI 对风格、氛围、主体和构图的理解。下面是一个通用的好用结构：

```
【主体】+【场景/背景】+【风格/媒介】+【氛围/光线】+【参数】
```

举个例子：

> `a lone lighthouse on a rocky coastline, stormy sky, oil painting style, dramatic side lighting, moody --ar 16:9 --v 6.1`

和只输入 `lighthouse` 相比——同一个主题，差距天差地别。

## 最常用的参数

参数加在提示词末尾，用两个横线开头。不需要全都记住，下面这五个能覆盖大多数情况。

**`--ar`（宽高比）**
控制图片的形状，常用值：

- `--ar 1:1` — 正方形（适合社交媒体头像）
- `--ar 16:9` — 宽屏（适合横幅和背景图）
- `--ar 9:16` — 竖屏（适合手机壁纸）
- `--ar 4:3` — 传统屏幕比例

**`--v`（版本）**
指定使用哪个 Midjourney 模型。截至 2025 年，`--v 6.1` 是默认版本，对大多数提示词效果最好。

**`--style raw`**
减少 Midjourney 自己加的"艺术感"。当你想要更干净、更接近字面意思的效果时用这个——比如写实摄影风格或产品图。

**`--chaos`（0-100）**
控制四张图之间的差异程度。数值低 = 四张图很相似；数值高 = 四张图各不相同。想探索不同方向时试试 `--chaos 30`。

**`--no`**
告诉 Midjourney 不要出现什么。例如：`--no text, watermark, people` 会去掉这些元素。

## 真正有效的提示词技巧

### 明确风格和媒介

不要只说"一幅山的画"，试试：

> `snow-capped mountain peaks at sunrise, impressionist oil painting, thick visible brushstrokes, warm amber and violet tones`

风格引用特别好用。试着加上"in the style of【艺术流派或年代】"，比如"in the style of Art Nouveau"或"in the style of 1970s vintage travel poster"。

### 明确描述光线

光线是决定图片是否专业的最大因素之一。一些实用词：

- `golden hour lighting` — 温暖的低角度阳光
- `soft diffused light` — 均匀无阴影的光线（适合人像）
- `neon-lit` — 彩色人工光源
- `chiaroscuro` — 强烈的明暗对比
- `backlit` — 逆光，形成剪影或发光边缘效果

### 加入相机或镜头描述（追求写实风格时）

如果你想要看起来像真实照片的效果：

> `portrait of a woman in a café, shallow depth of field, shot on 85mm lens, natural window light, film grain`

"shot on Sony A7"、"35mm film"、"DSLR"、"macro photography"这类词都能把 Midjourney 往更写实的方向推。

### 用权重控制重点

在任何词后面加两个冒号 `::` 可以增加或减少它的重要程度：

> `ocean::2 sunset::1 sailboat::0.5`

这告诉 Midjourney 把"海洋"放在最重要的位置，"日落"次之，"帆船"只是次要元素。当画面里某个元素总是被忽视的时候很好用。

## 可以直接用的示例提示词

**写实人像：**

> `close-up portrait of an elderly fisherman, weathered face, deep-set eyes, overcast coastal light, Leica photograph, sharp focus, documentary style --ar 4:5 --style raw`

**奇幻场景：**

> `ancient library inside a giant crystal cave, glowing bioluminescent mushrooms, floating books, ethereal atmosphere, digital art --ar 16:9 --v 6.1`

**产品摄影：**

> `minimalist perfume bottle on white marble surface, soft studio lighting, clean background, luxury editorial style, commercial photography --ar 1:1 --style raw`

**旅行海报（复古风）：**

> `vintage travel poster for Kyoto Japan, cherry blossoms, Mount Fuji, bold typography space, retro 1960s illustration style, limited color palette --ar 2:3`

**社交媒体配图：**

> `modern flat design illustration, productivity and focus concept, pastel colors, geometric shapes, clean lines, app icon style --ar 1:1`

## 新手常犯的错误

**提示词太模糊。** "一片漂亮的风景"几乎没有给 Midjourney 任何信息。描述越具体越丰富，出图质量就越高。

**忽略宽高比。** 默认是正方形。如果你要做横幅、壁纸或社交媒体配图，一开始就设好比例，否则后期裁剪会很难看。

**只生成一次就放弃。** Midjourney 很少在第一次就出你理想的图。从四张里选最接近的那张，点"Vary (Subtle)"或"Vary (Strong)"继续优化。大多数好图需要 5-10 次迭代。

**一次塞太多概念。** 一个提示词里有五种风格、四种氛围、三个主体，只会让模型一头雾水。一次专注一个清晰的概念。

## 如何保持角色或风格的一致性

这是进阶技巧之一，适合做插图、品牌内容或连环故事的创作者。

最简单的方法：用 `--sref`（风格参考）加上你之前生成的图片 URL。这告诉 Midjourney 去匹配那张参考图的视觉风格。

角色一致性用 `--cref`（角色参考）做同样的事——指向你已经生成的一张人脸，Midjourney 会尽量在新图中保持这个角色的连贯性。

## 怎么越用越好

最快的进步方式是研究别人的成功作品。Midjourney 网站上有公开的社区图库——看到你喜欢的图，点进去就能看到对应的提示词。这是学习哪些词和组合真正有效的最快途径。

建立自己的提示词库。把有效的提示词复制下来，换不同的主体去套用。时间久了你会形成自己的一套"词汇表"，稳定产出让自己满意的图。
