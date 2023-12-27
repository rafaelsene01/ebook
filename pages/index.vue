<script setup>
// https://medium.com/@flanker72/nuxt3-complex-solutions-database-integration-8df941f0fb82

const addUser = async () => {
  const { body } = await $fetch("api/users", {
    method: "post",
    body: {
      email: "AAA@g.com",
      password: "xxsds5198fg",
      name: "Sene Teste",
    },
    headers: {
      Authorization: "Bearer <token>",
    },
  });
};

// const addUser = async () => {
//   const { body } = await $fetch("api/login", {
//     method: "post",
//     body: {
//       email: "AAA@g.com",
//       password: "xxsds5198fg",
//     },
//   });
// };

const items = [
  {
    title: "Item #1",
  },
  {
    title: "Item #2",
  },
  {
    title: "Item #3",
  },
];
</script>
<template>
  <div class="mx-auto my-auto">
    <v-btn @click="addUser" class="mb-4">Add new user</v-btn>
    <v-card max-width="500">
      <v-list :items="items"></v-list>
    </v-card>
  </div>
</template>
