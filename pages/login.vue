<script setup>
import { computed } from "vue";

definePageMeta({
  auth: {
    unauthenticatedOnly: true,
    navigateAuthenticatedTo: "/",
  },
});

const { data } = await useFetch("/api/auth/providers");
const providers = computed(() =>
  Object.keys(data.value).reduce(
    (items, item) =>
      item !== "credentials" ? [...items, data.value[item]] : items,
    []
  )
);

const route = useRoute();
const signInError = computed(() => route.query.error);
</script>

<template>
  <v-card class="mx-auto my-auto pa-4 rounded-lg elevation-10" min-width="360">
    <h4 class="text-h4">Entrar no SITE</h4>

    <div class="d-flex flex-column py-1">
      <ProviderLogin
        class="my-1"
        v-for="provider in providers"
        :key="provider.id"
        :provider-name="provider.name"
        :iconName="provider.id"
      />
    </div>

    <div class="d-flex align-center">
      <div class="bg-grey w-100" style="height: 1px"></div>
      <p class="mx-8 text-grey font-bold">ou</p>
      <div class="bg-grey w-100" style="height: 1px"></div>
    </div>

    <LoginForm />

    <p v-if="signInError" class="text-red">Usuario não ou senha invalida</p>
  </v-card>
</template>
