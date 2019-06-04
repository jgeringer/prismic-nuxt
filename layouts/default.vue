<template>
    <div>
      <lang-switcher />
      <nuxt />
      <footer-prismic/>
  </div>
</template>

<script>
import FooterPrismic from '~/components/FooterPrismic.vue'
import LangSwitcher from '~/components/LangSwitcher.vue'

export default {
  components: {
    FooterPrismic,
    LangSwitcher
  },
  head () {
    return {
      title: 'Prismic Nuxt.js Blog',
    }
  }
}
</script>