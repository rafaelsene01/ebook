<script setup lang="ts">
definePageMeta({ auth: false });

const { status, data, signIn, signOut } = useAuth();

const loggedIn = computed(() => status.value === "authenticated");

async function handleSignIn() {
  await signIn("github");
}

const headers = useRequestHeaders(["cookie"]) as HeadersInit;
const { data: token } = await useFetch("/api/token", { headers });

// FIXME: Continuar a integração
// https://www.youtube.com/watch?v=voQcJ-pO1ms
async function handleSignOut() {
  await signOut();
}
</script>

<template>
  <div>
    <button v-if="loggedIn" @click="handleSignOut">Sign Out</button>
    <button v-else @click="handleSignIn">Sign In</button>
  </div>
  <div>
    {{ loggedIn }}
  </div>
  <div>
    {{ data }}
  </div>
  <div>
    {{ status }}
  </div>
  <pre>{{ token || "no token present, are you logged in?" }}</pre>
</template>
