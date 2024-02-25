<script setup lang="ts">
import { LoremIpsum } from "lorem-ipsum";
import type { CommentType } from "~/server/models";

// Não é necessario passar esse header, usando o useFetch ou $fetch
// ele é aplicado automaticamente
const headers = useRequestHeaders(["cookie"]) as HeadersInit;
const { data: token } = await useFetch("/api/token", { headers });

const lorem = new LoremIpsum();

const texts = ref();
const loading = ref(false);

onMounted(async () => {
  try {
    const data = await (<Promise<CommentType>>(
      $fetch(`/api/comments/${token.value.sub}`, {
        method: "GET",
      })
    ));
    texts.value = data;
  } catch (error) {
    // TOAST AQUi
  }
});

const createComment = async () => {
  loading.value = true;

  try {
    const { text } = await (<Promise<CommentType>>$fetch("/api/comments", {
      method: "POST",
      body: {
        text: lorem.generateWords(10),
      },
    }));
    texts.value = [...texts.value, text];
  } catch (error) {
    // TOAST AQUi
  }

  loading.value = false;
};
</script>

<template>
  <div class="border pa-4 mb-4 bg-yellow">
    <pre>{{ token || "Usuario não logado" }}</pre>
  </div>
  <div class="border pa-4 mb-2 bg-blue-accent-1 d-flex align-center">
    <h5 class="text-h5 mr-4">Comentários</h5>
    <v-btn
      :loading="loading"
      color="success"
      density="compact"
      @click="createComment"
    >
      ADD
    </v-btn>
  </div>
  <div class="border pa-2 mb-1 bg-blue-accent-1" v-for="text in texts">
    <p>{{ text }}</p>
  </div>
</template>
