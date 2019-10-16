<template>
  <div class="events">
    <h1 class="title">Évènements</h1>
    <div class="columns">
      <EntityList class="column is-one-quarter" endpoint="event" @selected="onSelected" ref="eventsList"/>
      <EventForm :event="selectedEvent" class="column" @submit="refresh"/>
    </div>
  </div>
</template>

<script>
import EntityList from '@/components/EntityList.vue'
import EventForm from '@/components/EventForm.vue'

export default {
  name: 'events',
  components: {
    EntityList,
    EventForm
  },
  data: function () {
    return {
      selectedEvent: { id: 0, name: '', date: new Date(), address: '' }
    }
  },
  methods: {
    onSelected (event) {
      if (event != null) {
        event.date = new Date(event.date)
      }

      this.selectedEvent = event != null ? event : { id: 0, name: '', date: new Date(), address: '' }
    },
    refresh () {
      this.$refs.eventsList.refresh()
    }
  }
}
</script>
