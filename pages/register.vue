<script setup>
const { signIn } = useAuth();

definePageMeta({
  auth: {
    unauthenticatedOnly: true,
    navigateAuthenticatedTo: "/",
  },
});

const registerForm = ref("");
const name = ref("");
const email = ref("");
const password = ref("");
const errorMessage = ref("");

const register = async () => {
  errorMessage.value = "";
  if (!(await registerForm.value.validate()).valid) return;

  const payload = {
    name: name.value,
    email: email.value,
    password: password.value,
  };

  const { error } = await useFetch("/api/register", {
    method: "POST",
    body: payload,
  });
  console.log(error.value);
  if (error.value) {
    errorMessage.value = error.value.data.message;
  } else
    signIn("credentials", {
      name: name.value,
      email: email.value,
      password: password.value,
    });
};
</script>

<template>
  <v-card class="mx-auto my-auto pa-4 rounded-lg elevation-10" min-width="360">
    <h4 class="text-h4">Cadastrar</h4>

    <v-form ref="registerForm" @submit.prevent="register" class="py-2">
      <v-text-field
        class="my-2"
        density="compact"
        variant="outlined"
        name="name"
        label="Nome"
        v-model="name"
        type="name"
        :rules="[(v) => !!v || 'Nome requerido']"
        clearable
      />

      <v-text-field
        class="my-2"
        density="compact"
        variant="outlined"
        name="email"
        label="Email"
        v-model="email"
        type="email"
        :rules="[(v) => !!v || 'E-mail requerido']"
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
        :rules="[(v) => !!v || 'Senha requerida']"
        clearable
      />

      <p class="text-red">
        {{ errorMessage }}
      </p>

      <v-btn
        type="submit"
        class="my-2 text-none font-weight-bold bg-green"
        block
      >
        Logar
      </v-btn>
    </v-form>
  </v-card>
</template>
