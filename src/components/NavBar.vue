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
          <b-menu-item
            label="Déconnexion"
            icon="sign-out-alt"
            ref="disconnect"
            :disabled="$auth.username.length == 0 && $auth.password.length == 0"
            @click="disconnect"></b-menu-item>
      </b-menu-list>
    </b-menu>
  </div>
</template>

<script>
import Vue from 'vue'

export default {
  name: 'NavBar',
  props: {
    menus: Array
  },
  watch: {
    $route (to, from) {
      this.$forceUpdate()
    }
  },
  methods: {
    disconnect () {
      this.$auth.username = ''
      this.$auth.password = ''
      this.$router.push({ name: 'login' })
      Vue.nextTick(() => {
        this.$refs.disconnect.reset(this.$refs.disconnect.$parent)
        this.$refs.disconnect.newActive = false
      })
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/scss/_variables.scss';

.navbar {
  padding-left: 0;
  padding-right: 1.5rem;
  border-right: 1px solid $light;

  .logo {
      padding-left: 0;
  }

}

</style>
