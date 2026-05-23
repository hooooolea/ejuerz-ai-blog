<script setup lang="ts">
export type PostItem = {
  href: string;
  title: string;
  description?: string;
  date: string;
  author?: string;
  cover?: string;
  showAuthor: boolean;
};

type Props = {
  posts: PostItem[];
  showCover?: boolean;
};

withDefaults(defineProps<Props>(), {
  showCover: false,
});
</script>

<template>
  <section class="py-8">
    <ul v-if="posts.length > 0" class="divide-y divide-accent/30 dark:divide-border">
      <li v-for="post in posts" :key="post.href">
        <a
          :href="post.href"
          class="hover:bg-muted/60 active:bg-muted flex items-start gap-4 py-4 transition-colors"
        >
          <img
            v-if="showCover && post.cover"
            :src="post.cover"
            alt=""
            class="size-[4.5rem] shrink-0 rounded-xl object-cover"
          />

          <span class="min-w-0 flex-1">
            <span class="hover:text-accent block font-semibold transition-colors">
              {{ post.title }}
            </span>
            <span
              v-if="post.description"
              class="text-muted-foreground mt-1 line-clamp-2 text-sm"
            >
              {{ post.description }}
            </span>
            <span class="text-muted-foreground mt-2 flex flex-wrap items-center gap-x-2 text-xs">
              <span>{{ post.date }}</span>
              <span v-if="post.showAuthor && post.author">· {{ post.author }}</span>
            </span>
          </span>
        </a>
      </li>
    </ul>

    <div v-else class="py-16 text-center">
      <p class="text-muted-foreground text-sm">这个板块还没有内容</p>
      <a
        href="/btbuer-submit"
        class="text-foreground mt-2 inline-block text-sm underline underline-offset-4"
      >
        成为第一个投稿的同学
      </a>
    </div>
  </section>
</template>
