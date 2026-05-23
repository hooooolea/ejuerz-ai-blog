<script setup lang="ts">
type Props = {
  label: string;
  desc: string;
  postCount: number;
};

defineProps<Props>();
</script>

<template>
  <section class="border-b border-accent/30 pb-8 pt-2 dark:border-border">
    <a
      href="/forbtbuer/"
      class="text-muted-foreground hover:text-foreground mb-6 inline-flex items-center gap-1 text-sm transition-colors"
    >
      <span aria-hidden="true">←</span>
      工商人共享
    </a>

    <h1 class="mb-3 text-3xl font-bold leading-tight sm:text-4xl">
      {{ label }}
    </h1>
    <p class="text-muted-foreground max-w-lg text-base leading-relaxed">
      {{ desc }}
    </p>
    <p class="text-muted-foreground mt-3 text-sm">{{ postCount }} 篇内容</p>
  </section>
</template>
