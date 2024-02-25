<script setup lang="ts">
import type { CommentType } from "~/server/models";
definePageMeta({ auth: false });

const headers = useRequestHeaders(["cookie"]) as HeadersInit;
const { data: token } = await useFetch("/api/token", { headers });

const texts = ref();

onMounted(async () => {
  try {
    const data = await (<Promise<CommentType>>$fetch("/api/comments", {
      method: "GET",
    }));
    texts.value = data;
  } catch (error) {
    // TOAST AQUi
  }
});
</script>

<template>
  <div class="border pa-4 mb-4 bg-yellow">
    <pre>{{ token || "Usuario não logado" }}</pre>
  </div>
  <div class="border pa-4 mb-2 bg-blue-accent-1">
    <h5 class="text-h5">Comentários</h5>
  </div>
  <div class="border pa-2 mb-1 bg-blue-accent-1" v-for="text in texts">
    <p>{{ text }}</p>
  </div>
</template>
