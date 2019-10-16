<template>
  <section id="app" class="section fullheight">
    <div class="columns fullheight is-marginless">
      <NavBar :menus="menus" class="column is-narrow"/>
      <router-view class="column"/>
    </div>
  </section>
</template>

<script>
import NavBar from '@/components/NavBar.vue'

export default {
  name: 'app',
  components: {
    NavBar
  },
  data: function () {
    return {
      menus: [
        { label: 'Composants', icon: 'cog', route: 'components' },
        { label: 'Évènements', icon: 'calendar', route: 'events' }
      ]
    }
  }
}
</script>

<style lang="scss">
@import "./scss/app.scss";

#app {
  padding-top: 0.75rem;
  padding-bottom: 0;
  min-height: 100vh;
}
</style>
