<template>
  <div>Demo for vue custom renderer in worker
  </div>
</template>

<script setup lang="ts">
import CustomRendererWorker from "~/utils/Worker?worker"
new CustomRendererWorker()
</script>