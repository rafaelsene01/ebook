<script setup lang="ts">
const route = useRoute();
const { data: token } = await useFetch(`/api/users/${route.params.id}`);
</script>

<template>
  <div class="mx-auto my-auto border rounded pa-4">
    <pre>{{ token }}</pre>
  </div>
</template>
