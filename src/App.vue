<template>
  <div id="app">
    <div id="nav" class="is-size-4">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style lang="scss">
@import "./scss/app.scss";
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    &.router-link-exact-active {
      color: $dark;
    }
  }
}
</style>
