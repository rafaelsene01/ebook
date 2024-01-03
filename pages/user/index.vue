<script setup lang="ts">
const headers = useRequestHeaders(["cookie"]) as HeadersInit;
const { data: token } = await useFetch("/api/users", { headers });
</script>
<template>
  <div class="mx-auto my-auto border rounded pa-4">
    <pre>{{ token }}</pre>
  </div>
</template>
