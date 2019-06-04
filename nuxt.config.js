const pkg = require('./package')
const PrismicConfig = require('./prismic.config')

module.exports = {
  mode: 'universal',

  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Lato:300,400,700,900' }
    ],
    script: [
      { innerHTML: '{ window.prismic = { endpoint: "' + PrismicConfig.apiEndpoint + '"} }' },
      { src: '//static.cdn.prismic.io/prismic.min.js' }
    ],
    __dangerouslyDisableSanitizers: ['script'],
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Global CSS
  */
  css: [
    '@/assets/css/resetr.css',
    '@/assets/css/common.css'
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~/plugins/link-resolver.js',
    '~/plugins/prismic-vue.js',
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    ['nuxt-i18n', {

/*
['nuxt-i18n', {
      locales: ['en', 'sv'],
      defaultLocale: 'en',
      vueI18n: {
        fallbackLocale: 'en',
        messages: {
          en: {
            welcome: 'Welcome'
          },
          fr: {
            welcome: 'Bienvenue'
          },
          es: {
            welcome: 'Bienvenido'
          }
        }
      }
    }]
*/

      // parsePages: false,   // Disable acorn parsing
      // pages: {
      //   about: {
      //     sv: '/chi-siamo', // -> mydomain.com/chi-siamo
      //     en: '/about',     // -> mydomain.com/en/about
      //   }
      // },
      // paths: {
      //   it: '/chi-siamo',
      //   en: '/about'
      // },
      locales: [
        {
          name: 'Sweden',
          code: 'sv-SE',
          iso: 'sv-SE',
          // file: 'sv-SE.js'
        },
        {
          name: 'English',
          code: 'en-US',
          iso: 'en-US',
          // file: 'en-US.js'
        },
      ],
      // langDir: 'lang/',
      defaultLocale: 'en-US',
    }]
  ],

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      config.resolve.alias['vue'] = 'vue/dist/vue.common'
    }
  }
}