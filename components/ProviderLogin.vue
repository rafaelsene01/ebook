<script setup>
import { filename } from "pathe/utils";

defineProps({
  providerName: String,
  iconName: String,
});

const { signIn } = useAuth();

const glob = import.meta.glob("~/assets/icons/*.svg", { eager: true });
const images = Object.fromEntries(
  Object.entries(glob).map(([key, value]) => [filename(key), value.default])
);
</script>

<template>
  <v-btn
    class="text-grey-darken-2 text-none"
    @click="signIn(providerName?.toLocaleLowerCase())"
    border
    rounded="lg"
    block
  >
    <template v-slot:prepend>
      <v-img
        :src="images[iconName]"
        :alt="`Logo - ${providerName}`"
        width="20"
        height="20"
      />
    </template>

    {{ providerName }}
  </v-btn>
</template>
