<template>
  <div class="entity-list">
    <b-menu>
      <b-menu-list label="Liste">
        <b-menu-item label="Nouveau" @click="$emit('selected', null)" :active="newActive"></b-menu-item>
        <b-menu-item v-for="element in elements" :key="element.id" :label="element.name" @click="select(element)"></b-menu-item>
      </b-menu-list>
    </b-menu>
    <div class="entity-list-controls">
      <b-button size="is-small" icon-left="redo" @click="refresh">
      </b-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'entity-list',
  props: {
    endpoint: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      elements: {},
      newActive: true
    }
  },
  methods: {
    fetch () {
      this.$axios.get(`/${this.endpoint}`)
        .then((response) => {
          this.elements = response.data[Object.keys(response.data)[0]]
        })
        .catch((error) => {
          this.$buefy.toast.open({
            duration: 5000,
            message: `An error occurred.<br>${error}`,
            type: 'is-danger'
          })
        })
    },
    select (element) {
      this.newActive = false
      this.$emit('selected', element)
    },
    refresh () {
      this.elements = []
      this.$emit('selected', null)
      this.newActive = true
      this.fetch()
    }
  },
  mounted () {
    this.refresh()
  }
}
</script>

<style scoped lang="scss">
.menu {
  margin-bottom: 0.75rem;
  margin-right: 1rem;
}
</style>
