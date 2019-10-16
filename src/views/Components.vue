<template>
  <div class="components">
    <h1 class="title">Composants</h1>
    <div class="columns">
      <EntityList class="column is-one-quarter" endpoint="component" @selected="onSelected" ref="componentsList"/>
      <ComponentForm :component="selectedComponent" class="column" @submit="refresh"/>
    </div>
  </div>
</template>

<script>
import EntityList from '@/components/EntityList.vue'
import ComponentForm from '@/components/ComponentForm.vue'

export default {
  name: 'components',
  components: {
    EntityList,
    ComponentForm
  },
  data: function () {
    return {
      selectedComponent: { id: 0, name: '', value: 0 }
    }
  },
  methods: {
    onSelected (component) {
      this.selectedComponent = component != null ? component : { id: 0, name: '', value: 0 }
    },
    refresh () {
      this.$refs.componentsList.refresh()
    }
  }
}
</script>
