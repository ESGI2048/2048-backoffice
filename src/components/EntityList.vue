<template>
  <div class="entity-list">
    <b-menu>
      <b-menu-list>
        <b-menu-item label="Nouveau" @click="$emit('selected', null)" active></b-menu-item>
        <b-menu-item v-for="element in elements" :key="element.id" :label="element.name" @click="$emit('selected', element)"></b-menu-item>
      </b-menu-list>
    </b-menu>
    <div class="entity-list-controls">
      <b-button size="is-small"
                icon-left="redo">
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
    },
    elements: Array
  },
  methods: {
    fetch () {
      // TODO HTTP call
    }
  }
}
</script>

<style scoped lang="scss">
.menu {
  margin-bottom: 0.75rem;
  margin-right: 1rem;
}
</style>
