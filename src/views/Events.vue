<template>
  <div class="events">
    <h1 class="title">Évènements</h1>
    <div class="columns">
      <EntityList class="column is-one-quarter" endpoint="test" :elements="events" @selected="onSelected" refs="eventsList"/>
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
      events: [
        { id: 1, name: 'Event 1', date: new Date('2019-12-12'), address: '12 rue Jean' },
        { id: 2, name: 'Event 2', date: new Date('2019-12-14'), address: '13 rue Jean' },
        { id: 3, name: 'Event 3', date: new Date('2019-11-12'), address: '14 rue Jean' }
      ],
      selectedEvent: { id: 0, name: '', date: new Date(), address: '' }
    }
  },
  methods: {
    onSelected (event) {
      this.selectedEvent = event != null ? event : { id: 0, name: '', date: new Date(), address: '' }
    },
    refresh () {
    	this.$refs.eventsList.refresh()
    }
  }
}
</script>
