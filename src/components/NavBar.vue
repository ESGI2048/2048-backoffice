<template>
  <div class="navbar">
    <img :src="require('@/assets/logo.png')" class="logo">
    <b-menu>
      <b-menu-list label="Menu">
        <b-menu-item
          v-for="menu in menus"
          :key="menu.route"
          :icon="menu.icon"
          :label="menu.label"
          tag="router-link"
          :to="{ path: menu.route }"
          active-class="is-active"
          :disabled="$auth.username.length == 0 && $auth.password.length == 0"
          ></b-menu-item>
      </b-menu-list>
    </b-menu>
  </div>
</template>

<script>
export default {
  name: 'NavBar',
  props: {
    menus: Array
  },
  watch: {
    $route (to, from) {
      this.$forceUpdate()
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/scss/_variables.scss';

.navbar {
  padding-left: 0;
  border-right: 1px solid $light;

  .logo {
      padding-left: 0;
  }
}

</style>
