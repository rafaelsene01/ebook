<script setup lang="ts">
const headers = useRequestHeaders(["cookie"]) as HeadersInit;
const { data: token } = await useFetch("/api/token", { headers });

// FIXME: Criar pagina de comentarios, modal para add comentario.
// Listar todos comentario no dashboard
</script>

<template>
  <div class="border pa-4 mb-4 bg-yellow">
    <pre>{{ token || "Usuario não logado" }}</pre>
  </div>
  <div class="border pa-4 mb-2 bg-blue-accent-1">
    <h5 class="text-h5">Comentários</h5>
  </div>
  <div class="border pa-4 mb-2 bg-blue-accent-1">
    <h6 class="text-h6">Usuário:</h6>
    <pre>{{ token || "Usuario não logado" }}</pre>
  </div>
</template>
