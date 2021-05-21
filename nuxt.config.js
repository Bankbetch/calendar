export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'calendar',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['@/assets/scss/style.bundle.scss'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '@/plugins/calendar', ssr: false },
    { src: '@/plugins/icon', ssr: false },
    { src: '~/plugins/components.js', ssr: false },
    { src: '~/plugins/validate.js', ssr: false },
    { src: '~/plugins/mixins.js', ssr: false },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    // '@nuxtjs/eslint-module',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    'nuxt-helmet',
    'nuxt-vue-multiselect',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extractCSS: true,
    minimize: true,
    loaders: {
      vue: {
        prettify: false,
      },
    },
    terser: {
      extractComments: true,
      sourceMap: true,
      parallel: true,
      cache: true,
      terserOptions: {
        extractComments: 'all',
        compress: {
          drop_console: true,
          drop_debugger: true,
        },
      },
    },
    extend(config, ctx) {
      if (ctx.isDev) {
        config.devtool = ctx.isClient ? 'source-map' : 'inline-source-map'
      }
    },
    babel: {
      compact: false,
    },
  },

  serverMiddleware: {
    '/api': '~/api',
  },
}
