<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";

const isOpen = ref(false);
const message = ref("");
const selectedFile = ref<File | null>(null);
const fileInputRef = ref<HTMLInputElement | null>(null);
const isSubmitting = ref(false);
const feedback = ref<{ type: "success" | "error"; text: string } | null>(null);

const MAX_FILE_SIZE = 5 * 1024 * 1024;

const openDialog = () => {
  isOpen.value = true;
  feedback.value = null;
};

const closeDialog = () => {
  if (isSubmitting.value) return;
  isOpen.value = false;
  feedback.value = null;
};

const handleBackdropClick = (event: MouseEvent) => {
  if (event.target === event.currentTarget) closeDialog();
};

const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === "Escape" && isOpen.value) closeDialog();
};

const triggerFileSelect = () => {
  fileInputRef.value?.click();
};

const handleFileChange = (event: Event) => {
  const input = event.target as HTMLInputElement;
  const file = input.files?.[0];
  if (!file) return;

  if (file.size > MAX_FILE_SIZE) {
    feedback.value = { type: "error", text: "文件大小不能超过 5MB" };
    input.value = "";
    return;
  }

  selectedFile.value = file;
  feedback.value = null;
};

const clearFile = () => {
  selectedFile.value = null;
  if (fileInputRef.value) fileInputRef.value.value = "";
};

const resetForm = () => {
  message.value = "";
  clearFile();
};

const submit = async () => {
  const content = message.value.trim();
  if (!content) {
    feedback.value = { type: "error", text: "请输入投稿内容" };
    return;
  }

  isSubmitting.value = true;
  feedback.value = null;

  try {
    const formData = new FormData();
    formData.append("message", content);
    if (selectedFile.value) formData.append("file", selectedFile.value);

    const response = await fetch("/api/submit", {
      method: "POST",
      body: formData,
    });

    const data = (await response.json()) as { error?: string; ok?: boolean };

    if (!response.ok) {
      throw new Error(data.error ?? "发送失败，请稍后重试");
    }

    feedback.value = { type: "success", text: "投稿已发送，感谢分享！" };
    resetForm();
    setTimeout(() => {
      closeDialog();
    }, 1500);
  } catch (error) {
    feedback.value = {
      type: "error",
      text: error instanceof Error ? error.message : "发送失败，请稍后重试",
    };
  } finally {
    isSubmitting.value = false;
  }
};

onMounted(() => {
  document.addEventListener("keydown", handleKeydown);
});

onUnmounted(() => {
  document.removeEventListener("keydown", handleKeydown);
});
</script>

<template>
  <div>
    <button
      type="button"
      class="focus-outline hover:[&>svg]:stroke-accent flex size-10 items-center justify-center p-0"
      title="投稿"
      aria-label="投稿"
      @click="openDialog"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="size-6"
        aria-hidden="true"
      >
        <path d="M3 7a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-10z" />
        <path d="M3 7l9 6l9 -6" />
      </svg>
    </button>

    <Teleport to="body">
      <div
        v-if="isOpen"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
        role="dialog"
        aria-modal="true"
        aria-labelledby="submit-dialog-title"
        @click="handleBackdropClick"
      >
        <div class="app-card w-full max-w-md p-5 shadow-lg">
          <div class="mb-4 flex items-start justify-between gap-3">
            <div>
              <h2 id="submit-dialog-title" class="text-lg font-bold">投稿</h2>
              <p class="text-muted-foreground mt-1 text-sm">分享你在校园的见解......</p>
            </div>
            <button
              type="button"
              class="text-muted-foreground hover:text-foreground focus-outline rounded-md p-1"
              aria-label="关闭"
              :disabled="isSubmitting"
              @click="closeDialog"
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
                <path d="M18 6l-12 12" />
                <path d="M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div class="border-border focus-within:ring-accent/30 overflow-hidden rounded-lg border focus-within:ring-2">
            <textarea
              v-model="message"
              rows="6"
              placeholder="写下你想分享的内容..."
              class="placeholder:text-muted-foreground w-full resize-none border-0 bg-transparent px-3 py-3 text-sm outline-none"
              :disabled="isSubmitting"
            />

            <div class="border-border flex items-center justify-between gap-2 border-t px-3 py-2">
              <div class="flex min-w-0 items-center gap-2">
                <input
                  ref="fileInputRef"
                  type="file"
                  class="hidden"
                  :disabled="isSubmitting"
                  @change="handleFileChange"
                />
                <button
                  type="button"
                  class="text-muted-foreground hover:text-foreground focus-outline flex size-8 shrink-0 items-center justify-center rounded-md transition-colors"
                  title="上传文件"
                  aria-label="上传文件"
                  :disabled="isSubmitting"
                  @click="triggerFileSelect"
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
                    <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2" />
                    <path d="M7 9l5 -5l5 5" />
                    <path d="M12 4v12" />
                  </svg>
                </button>
                <span
                  v-if="selectedFile"
                  class="text-muted-foreground flex min-w-0 items-center gap-1 text-xs"
                >
                  <span class="truncate">{{ selectedFile.name }}</span>
                  <button
                    type="button"
                    class="text-muted-foreground hover:text-foreground shrink-0"
                    aria-label="移除文件"
                    :disabled="isSubmitting"
                    @click="clearFile"
                  >
                    ×
                  </button>
                </span>
              </div>

              <button
                type="button"
                class="bg-accent text-accent-foreground focus-outline shrink-0 rounded-md px-4 py-1.5 text-sm font-medium transition-opacity disabled:opacity-50"
                :disabled="isSubmitting"
                @click="submit"
              >
                {{ isSubmitting ? "发送中..." : "发送" }}
              </button>
            </div>
          </div>

          <p
            v-if="feedback"
            class="mt-3 text-sm"
            :class="feedback.type === 'success' ? 'text-accent' : 'text-red-500'"
            role="status"
          >
            {{ feedback.text }}
          </p>
        </div>
      </div>
    </Teleport>
  </div>
</template>
