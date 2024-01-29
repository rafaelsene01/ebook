<script setup lang="ts">
definePageMeta({ auth: false });

const { status, signOut } = useAuth();

const loggedIn = computed(() => status.value === "authenticated");

const headers = useRequestHeaders(["cookie"]) as HeadersInit;
const { data: token } = await useFetch("/api/token", { headers });

async function handleSignOut() {
  await signOut();
}
</script>

<template>
  <v-app>
    <v-app-bar>
      <v-btn class="text-h5 mr-4" to="/"> Dashboard </v-btn>
      <v-btn v-if="loggedIn" class="text-h5 mr-4" to="/posts">
        Meus comentários
      </v-btn>
      <v-btn v-if="loggedIn" class="text-h5" to="/user"> Meu registro </v-btn>
      <v-spacer></v-spacer>
      <div class="mr-4">
        <v-avatar class="mr-4" v-if="token && token.picture">
          <v-img :src="token.picture" alt="John"></v-img>
        </v-avatar>
        <v-btn v-if="!loggedIn" to="login" color="green" variant="elevated">
          Logar
        </v-btn>
        <v-btn v-else @click="handleSignOut" color="red" variant="elevated">
          Sair
        </v-btn>
      </div>
    </v-app-bar>
    <v-main class="d-flex flex-column">
      <NuxtPage />
    </v-main>
  </v-app>
</template>
