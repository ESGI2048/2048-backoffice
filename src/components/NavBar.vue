<template>
  <b-menu>
    <b-menu-list label="Menu">
      <b-menu-item
        v-for="menu in menus"
        :key="menu.route"
        :icon="menu.icon"
        :label="menu.label"
        tag="router-link"
        :to="{ path: menu.route }"></b-menu-item>
    </b-menu-list>
  </b-menu>
</template>

<script>
export default {
  name: 'NavBar',
  props: {
    menus: Array
  }
}
</script>

<style scoped lang="scss">
@import '@/scss/_variables.scss';

.menu {
  padding-left: 0;
  border-right: 1px solid $light
}
</style>
