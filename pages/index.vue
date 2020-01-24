<template>
  <section class="home">
    <nuxt-link :to="switchLocalePath('en')">English</nuxt-link>
    <nuxt-link :to="switchLocalePath('sv')">Swedish</nuxt-link>
    <article>
      <!-- Button to edit document in dashboard -->
      <prismic-edit-button :documentId="documentId"/>
      <h1>{{ $t('hello') }}</h1>
      <h2>Lang: {{$i18n.locale}}</h2>
      <h2>Lang (full): {{$i18n.locale}}</h2>

      <div class="blog-avatar" :style="{ backgroundImage: 'url(' + image + ')' }" ></div>
      <!-- Template for page title -->
      <h1 class="blog-title">
        {{ $prismic.richTextAsPlain(homepageContent.headline) }}
      </h1>
      <!-- Template for page description -->
      <p class="blog-description">{{ $prismic.richTextAsPlain(homepageContent.description) }}</p>
      
      <!-- Check blog posts exist -->
      <div v-if="posts.length !== 0" class="blog-main">
        <!-- Template for blog posts -->
        <section v-for="post in posts" :key="post.id" v-bind:post="post" class="blog-post">
          <!-- Here :post="post" passes the data to the component -->
          <blog-widget :post="post"></blog-widget>
        </section>
      </div>
      <!-- If no blog posts return message -->
      <div v-else class="blog-main">
        <p>No Posts published at this time.</p>
      </div>
    </article>
  </section>
</template>

<script>
import Prismic from "prismic-javascript"
import PrismicConfig from "~/prismic.config.js"
// Importing blog posts widget
import BlogWidget from '~/components/BlogWidget.vue'

export default {
  name: 'Home',
  components: {
    BlogWidget
  },
  head () {
    return {
      title: 'Prismic Nuxt.js Blog',
    }
  },
  beforeCreate () {
    console.log('beforeCreate!')
    console.log(this.$i18n.locale)
  },
  created () {
    console.log('before!')
    console.log(this.$i18n.locale)
  },
  async asyncData({context, error, req, store}) {
    try{
      // Query to get API object
      const api = await Prismic.getApi(PrismicConfig.apiEndpoint, {req})
      // console.log('test:: ', req.headers['accept-language'].split(',')[0])
      // Query to get blog home content

      console.log('store: ', store.state.i18n.locale)

      const document = await api.getSingle('blog_home', 
          // {lang : 'sv-se'}
          // {lang: 'en-us'}
          {lang : `${store.state.i18n.locale}`} // try pulling from state
          // { lang: req.headers['accept-language'].split(',')[0].toLocaleLowerCase() }
        )
      let homepageContent = document.data

      // Query to get posts content to preview
      const blogPosts = await api.query(
        Prismic.Predicates.at("document.type", "post"),
        { orderings : '[my.post.date desc]', lang : `${store.state.i18n.locale}`}
      )

      // Load the edit button
      if (process.client) window.prismic.setupEditButton()

      // Returns data to be used in template
      return {
        homepageContent,
        documentId: document.id,
        posts: blogPosts.results,
        image: homepageContent.image.url
      }
    } catch (e) {
      // Returns error page
      error({ statusCode: 404, message: 'Page not found' })
    }
  },
}
</script>

<style lang="sass" scoped>
.home
  max-width: 700px
  margin: auto
  text-align: center
  .blog-avatar
    height: 140px
    width: 140px
    border-radius: 50%
    background-position: center
    background-size: cover
    margin: 1em auto
  .blog-description
    font-size: 18px
    color: #9A9A9A
    line-height: 30px
    margin-bottom: 3rem
    padding-bottom: 3rem
    font-family: 'Lato', sans-serif
    border-bottom: 1px solid #DADADA

.blog-main
  max-width: 700px
  margin: auto
  text-align: left
  &.single img
    width: 100%
    height: auto
  &.single a
    text-decoration: none
    background: -webkit-linear-gradient(top, rgba(0, 0, 0, 0) 75%, rgba(0, 0, 0, 0.8) 75%)
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0) 75%, rgba(0, 0, 0, 0.8) 75%)
    background-repeat: repeat-x
    background-size: 2px 2px
    background-position: 0 23px

.blog-post
  margin: 0
  margin-bottom: 3rem

@media (max-width: 767px)
  .home
    padding: 0 20px
  .blog-main
    padding: 0
    font-size: 18px
</style>