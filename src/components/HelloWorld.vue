<script setup>
import { ref } from 'vue'
import Index from "./Preview/Index.vue";

defineProps({
  msg: String,
})

const count = ref(0)
</script>

<template>
  <Index type="number"></Index>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
