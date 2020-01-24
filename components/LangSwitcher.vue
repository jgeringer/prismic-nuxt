<template>
    <div>
        <h1>Lang navigation:</h1>
        <nuxt-link
            v-for="locale in $i18n.locales"
            v-if="locale.code !== $i18n.iso"
            :key="locale.code"
            :to="switchLocalePath(locale.code)">{{ locale.name }}</nuxt-link>
    </div>
</template>

<script>
export default {
    
}
</script>

<style>

</style>
