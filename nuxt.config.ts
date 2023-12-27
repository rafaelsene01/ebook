import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  build: {
    transpile: ['vuetify'],
  },
  modules: [
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }))
      })
    },
    "nuxt-server-utils"
  ],
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
  devServer: {
    port: 8080
  },
  nuxtServerUtils: {
    mongodbUri: process.env.MONGO_URL,
  },
  runtimeConfig: {
    JWT_SECRET: process.env.JWT_SECRET,
  },
})
