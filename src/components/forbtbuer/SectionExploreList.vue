<script setup lang="ts">
import SectionIcon from "./SectionIcon.vue";
import { formatPostCount } from "@/constants/btbuer-sections";

export type SectionItem = {
  id: string;
  label: string;
  desc: string;
  icon:
    | "trophy"
    | "folder"
    | "briefcase"
    | "book"
    | "alert"
    | "sparkle"
    | "paw";
  postCount: number;
};

type Props = {
  sections: SectionItem[];
};

defineProps<Props>();
</script>

<template>
  <section id="sections" class="pb-12">
    <hr
      class="border-accent/30 dark:border-border relative left-1/2 mb-4 w-screen -translate-x-1/2 border-0 border-t"
      aria-hidden="true"
    />
    <div class="mb-4 flex items-center justify-between gap-4">
      <h2 class="text-lg font-bold">探索热门板块</h2>
      <a
        href="/forbtbuer/search"
        class="text-muted-foreground hover:text-foreground shrink-0 text-sm transition-colors"
      >
        查看全部
        <span aria-hidden="true">→</span>
      </a>
    </div>

    <ul class="divide-y divide-accent/30 dark:divide-border">
      <li v-for="section in sections" :key="section.id">
        <a
          :href="`/forbtbuer/${section.id}`"
          class="hover:bg-muted/60 active:bg-muted flex items-center gap-4 py-4 transition-colors"
        >
          <span
            class="text-accent border-accent/20 bg-accent/5 flex size-11 shrink-0 items-center justify-center rounded-xl border"
          >
            <SectionIcon :icon="section.icon" />
          </span>

          <span class="min-w-0 flex-1">
            <span class="block font-semibold">{{ section.label }}</span>
            <span class="text-muted-foreground mt-0.5 block truncate text-sm">
              {{ section.desc }}
            </span>
          </span>

          <span class="text-muted-foreground shrink-0 text-xs">
            {{ formatPostCount(section.postCount) }}
          </span>
        </a>
      </li>
    </ul>
  </section>
</template>
