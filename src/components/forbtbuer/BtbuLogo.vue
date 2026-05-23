<script setup lang="ts">
import logoSvg from "@/assets/icons/BtbuLogo.svg?raw";
</script>

<template>
  <span
    class="btbu-logo flex size-10 shrink-0 overflow-hidden rounded-full bg-white"
    v-html="logoSvg"
    aria-hidden="true"
  />
</template>

<style scoped>
.btbu-logo :deep(svg) {
  display: block;
  width: 100%;
  height: 100%;
  border-radius: 9999px;
}
</style>
