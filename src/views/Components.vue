<template>
  <div class="components">
    <h1 class="title">Composants</h1>
    <div class="columns">
      <EntityList class="column is-one-quarter" endpoint="test" :elements="components" @selected="onSelected" refs="componentsList"/>
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
      components: [
        { id: 1, name: 'Test 1', value: 0 },
        { id: 2, name: 'Test 2', value: 2 },
        { id: 3, name: 'Test 3', value: 4 }
      ],
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
