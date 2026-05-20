---
author: AI Toolkit Guide
pubDatetime: 2025-05-14T09:00:00Z
title: Midjourney Prompt Guide for Complete Beginners
slug: midjourney-prompt-guide-for-beginners
featured: true
draft: false
tags:
  - midjourney
  - ai image generation
  - prompts
  - beginners
description: "New to Midjourney? This beginner guide covers how to write prompts that actually work — with real examples, key parameters, and tips to get better results fast."
---

Midjourney is one of the most powerful AI image generators available today. The images it produces can be stunning, surreal, photorealistic, or painterly — depending entirely on how you write your prompts.

The problem most beginners run into: they type something simple like "a dog on a hill" and get a mediocre result, then assume the tool isn't that impressive. The truth is, Midjourney rewards prompting skill. Learn a few core techniques and your results go from average to genuinely remarkable.

This guide covers everything you need to get started.

## Table of contents

## How Midjourney Works (The Very Short Version)

Midjourney runs inside Discord. You join their server (or use the Midjourney website), type a command in a channel, and the AI generates four image variations based on your description. You can then upscale your favorite, generate variations of it, or start over with a refined prompt.

To access Midjourney, go to [midjourney.com](https://midjourney.com) and sign in with Discord. There's no fully free tier anymore — the Basic plan starts at around $10/month and gives you about 200 image generations per month.

Once you're in, use the `/imagine` command followed by your prompt.

## Anatomy of a Good Prompt

A Midjourney prompt isn't just a description — it's a set of instructions that guides the AI's interpretation of style, mood, subject, and composition. Here's a simple structure that works well:

```
[subject] + [setting/context] + [style/medium] + [mood/lighting] + [parameters]
```

For example:

> `a lone lighthouse on a rocky coastline, stormy sky, oil painting style, dramatic side lighting, moody --ar 16:9 --v 6.1`

Compare that to just typing: `lighthouse`. Same subject, very different results.

## The Most Useful Parameters

Parameters are added to the end of your prompt with two dashes. You don't need to memorize all of them — just these five will cover most situations.

**`--ar` (aspect ratio)**
Controls the shape of your image. Common values:
- `--ar 1:1` — square (good for social media)
- `--ar 16:9` — widescreen (good for banners and backgrounds)
- `--ar 9:16` — portrait (good for phone wallpapers)
- `--ar 4:3` — traditional screen format

**`--v` (version)**
Specifies which Midjourney model to use. As of 2025, `--v 6.1` is the current default and produces the best results for most prompts.

**`--style raw`**
Reduces Midjourney's tendency to add its own "artistic flair." Use this when you want a cleaner, more literal interpretation of your prompt — useful for realistic photography or product images.

**`--chaos` (0–100)**
Controls how varied the four generated images are. Low chaos = four similar images. High chaos = four very different interpretations. Try `--chaos 30` when you want to explore options.

**`--no`**
Tells Midjourney what to exclude. Example: `--no text, watermark, people` removes those elements from the image.

## Prompting Techniques That Actually Work

### Be specific about style and medium

Instead of "a painting of mountains," try:
> `snow-capped mountain peaks at sunrise, impressionist oil painting, thick visible brushstrokes, warm amber and violet tones`

Style references work especially well. Try adding: `in the style of [art movement]` — like "in the style of Art Nouveau" or "in the style of 1970s vintage travel poster."

### Describe lighting explicitly

Lighting is one of the biggest factors in how professional an image looks. Some useful terms:
- `golden hour lighting` — warm, low-angle sunlight
- `soft diffused light` — even, shadow-free lighting (good for portraits)
- `neon-lit` — colorful artificial light
- `chiaroscuro` — strong contrast between light and dark
- `backlit` — subject lit from behind, creates silhouette or glowing edges

### Reference camera or lens settings for photorealistic images

If you want something that looks like a real photograph:
> `portrait of a woman in a café, shallow depth of field, shot on 85mm lens, natural window light, film grain`

Terms like "shot on Sony A7", "35mm film", "DSLR", and "macro photography" all push Midjourney toward more photorealistic outputs.

### Use weighted emphasis

You can put double colons `::` after any word to increase or decrease its importance:

> `ocean::2 sunset::1 sailboat::0.5`

This tells Midjourney to emphasize the ocean most, the sunset somewhat, and treat the sailboat as a minor element. Useful when one part of your scene keeps getting ignored.

## Example Prompts to Try

Here are some ready-to-use prompts across different styles:

**Realistic portrait:**
> `close-up portrait of an elderly fisherman, weathered face, deep-set eyes, overcast coastal light, Leica photograph, sharp focus, documentary style --ar 4:5 --style raw`

**Fantasy scene:**
> `ancient library inside a giant crystal cave, glowing bioluminescent mushrooms, floating books, ethereal atmosphere, digital art --ar 16:9 --v 6.1`

**Product photography:**
> `minimalist perfume bottle on white marble surface, soft studio lighting, clean background, luxury editorial style, commercial photography --ar 1:1 --style raw`

**Social media graphic:**
> `modern flat design illustration, productivity and focus concept, pastel colors, geometric shapes, clean lines, app icon style --ar 1:1`

**Travel poster:**
> `vintage travel poster for Kyoto Japan, cherry blossoms, Mount Fuji, bold typography space, retro 1960s illustration style, limited color palette --ar 2:3`

## Common Beginner Mistakes

**Being too vague.** "A nice landscape" gives Midjourney almost nothing to work with. The more specific and layered your description, the better.

**Ignoring aspect ratio.** The default is a square. If you're making a banner, wallpaper, or social post, set the right ratio from the start or you'll crop awkwardly later.

**Not iterating.** Midjourney rarely produces your ideal image on the first try. Pick the closest result from the four options, click "Vary (Subtle)" or "Vary (Strong)", and keep refining. Most great images take 5–10 generations.

**Adding too many conflicting ideas.** A prompt with five different styles, four different moods, and three subjects will confuse the model. Focus on one clear concept per prompt.

## How to Get Consistent Characters or Styles

One of the more advanced techniques is keeping a consistent character or style across multiple images — useful for illustrations, branding, or storytelling.

The easiest way: use `--sref` (style reference) followed by a URL of an image you've already generated. This tells Midjourney to match the visual style of that reference image.

For character consistency, you can use `--cref` (character reference) the same way — point it at a face you've already generated and Midjourney will try to keep that character consistent in new generations.

## Getting Better Over Time

The best way to improve is to study what works. Midjourney's website has a public gallery of community images — when you see something you love, click it to see the prompt. This is the fastest way to learn which words and combinations produce strong results.

Keep a personal prompt library. Copy prompts that work and tweak them for new subjects. Over time you'll build a personal "vocabulary" that consistently produces images you're happy with.
