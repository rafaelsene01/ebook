<script setup lang="ts">
const { signIn } = useAuth();

const email = ref("");
const password = ref("");
</script>

<template>
  <v-form
    @submit.prevent="signIn('credentials', { email, password })"
    class="py-2"
  >
    <v-text-field
      density="compact"
      variant="outlined"
      name="email"
      label="Email"
      v-model="email"
      type="email"
      :rules="[(v) => !v || 'E-mail requerido']"
      clearable
    />
    <v-text-field
      density="compact"
      class="my-2"
      variant="outlined"
      v-model="password"
      type="password"
      name="password"
      placeholder="••••••••"
      :rules="[(v) => !v || 'Senha requerida']"
      clearable
    />

    <div class="d-flex justify-end">
      <a href="#"> Esqueci a senha? </a>
    </div>
    <v-btn type="submit" class="my-4 text-none font-weight-bold bg-green" block>
      Logar
    </v-btn>
    <p>
      Não tem uma conta ainda?
      <NuxtLink to="/register"> Cadastrar </NuxtLink>
    </p>
  </v-form>
</template>
