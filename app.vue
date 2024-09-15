<template>
  <div>Demo for .vue file in worker
  </div>
</template>

<script setup lang="ts">
import CustomRendererWorker from "~/utils/Worker?worker"
new CustomRendererWorker()
</script>