/* eslint-disable prettier/prettier */
const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin')
// const pkg = require('./package')

module.exports = {
  mode: 'universal',

  /*
   ** Headers of the page
   */
  head: {
    title: 'DREP Blockchain Browser',
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content:
          'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, minimal-ui'
      },
      { hid: 'description', name: 'description', content: 'DREP Blockchain Browser' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons'
      }
    ]
  },

  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },

  /*
   ** Global CSS
   */
  css: ['~/assets/style/app.styl', '~/assets/style/main.scss'],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: ['@/plugins/vuetify'],

  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa'
  ],
  /*
   ** Axios module configuration
   */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
    baseURL: 'http://127.0.0.1:3011',
    browserBaseURL: '/'
  },

  /*
   ** Build configuration
   */
  build: {
    transpile: ['vuetify/lib'],
    plugins: [new VuetifyLoaderPlugin()],
    loaders: {
      stylus: {
        import: ['~assets/style/variables.styl']
      }
    }
    /*
     ** You can extend webpack config here
     */
    // extend(config, ctx) {
    //   // Run ESLint on save
    //   // if (ctx.isDev && ctx.isClient) {
    //   //   config.module.rules.push({
    //   //     enforce: 'pre',
    //   //     test: /\.(js|vue)$/,
    //   //     loader: 'eslint-loader',
    //   //     exclude: /(node_modules)/
    //   //   })
    //   // }
    // }
  }
}
