<script setup lang="ts">
import { onMounted, ref } from "vue";
import BtbuLogo from "./BtbuLogo.vue";
import SubmitDialog from "./SubmitDialog.vue";

const isMenuOpen = ref(false);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

onMounted(() => {
  void import("@/scripts/theme").then(({ bindThemeButton }) => {
    bindThemeButton();
  });
});
</script>

<template>
  <header class="app-layout">
    <div class="flex w-full items-center justify-between py-5">
      <a href="/forbtbuer/" class="flex min-w-0 items-center gap-3">
        <BtbuLogo />
        <span class="min-w-0">
          <span class="block truncate text-lg font-bold leading-tight">工商人共享</span>
          <span class="text-muted-foreground block truncate text-xs">匿名 · 自由 · 分享</span>
        </span>
      </a>

      <div class="flex shrink-0 items-center gap-1">
        <SubmitDialog />

        <button
          id="theme-btn"
          type="button"
          class="focus-outline hover:[&>svg]:stroke-accent relative size-10 p-0"
          title="切换主题"
          aria-label="auto"
          aria-live="polite"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="absolute top-1/2 left-1/2 size-6 -translate-x-1/2 -translate-y-1/2 scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90"
            aria-hidden="true"
          >
            <path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454z" />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="absolute top-1/2 left-1/2 size-6 -translate-x-1/2 -translate-y-1/2 scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0"
            aria-hidden="true"
          >
            <path d="M14.828 14.828a4 4 0 1 0 -5.656 -5.656a4 4 0 0 0 5.656 5.656z" />
            <path d="M6.343 17.657l-1.414 1.414" />
            <path d="M6.343 6.343l-1.414 -1.414" />
            <path d="M17.657 6.343l1.414 -1.414" />
            <path d="M17.657 17.657l1.414 1.414" />
            <path d="M4 12h-2" />
            <path d="M12 4v-2" />
            <path d="M20 12h2" />
            <path d="M12 20v2" />
          </svg>
        </button>

        <button
          type="button"
          class="hover:bg-muted focus-outline flex size-10 items-center justify-center rounded-lg transition-colors"
          :aria-expanded="isMenuOpen"
          aria-controls="btbuer-mobile-menu"
          aria-label="打开菜单"
          @click="toggleMenu"
        >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="size-5"
          aria-hidden="true"
        >
          <path d="M4 5h16" />
          <path d="M4 12h16" />
          <path d="M4 19h16" />
        </svg>
        </button>
      </div>
    </div>

    <nav
      v-show="isMenuOpen"
      id="btbuer-mobile-menu"
      class="border-border mb-4 flex flex-col gap-1 border-t pt-4"
    >
      <a
        href="/forbtbuer/search"
        class="hover:bg-muted rounded-lg px-3 py-2.5 text-sm transition-colors"
      >
        搜索
      </a>
      <a
        href="/btbuer-submit"
        class="hover:bg-muted rounded-lg px-3 py-2.5 text-sm transition-colors"
      >
        投稿说明
      </a>
    </nav>
  </header>
</template>
