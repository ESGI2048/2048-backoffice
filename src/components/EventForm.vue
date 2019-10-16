<template>
  <div class="event-form">
    <h4 class="subtitle" v-if="event.id == 0">Nouvel évènement</h4>
    <h4 class="subtitle" v-if="event.id != 0">Modifier {{ event.name }}</h4>
    <div class="columns is-mobile">
      <b-field label="Nom" class="column">
        <b-input :value="event.name" required ref="nameField"></b-input>
      </b-field>
      <b-field label="Adresse" class="column">
        <b-input :value="event.address" required ref="addressField"></b-input>
      </b-field>
    </div>
    <div class="columns">
      <b-field label="Description" class="column">
        <b-input maxlength="255" required type="textarea" ref="descriptionField"></b-input>
      </b-field>
    </div>
    <div class="columns is-mobile">
      <div class="column">
        <b-field label="Image">
          <b-upload v-model="file" drag-drop required>
            <section class="section">
              <div class="content has-text-centered">
                <p>
                  <b-icon icon="upload" size="is-medium">
                  </b-icon>
                </p>
                <p>Déposez une image pour l'évènement</p>
              </div>
            </section>
          </b-upload>
        </b-field>
        <span class="tag is-medium is-primary" v-if="file">
          {{ file.name }}
          <button class="delete is-small"
            type="button"
            @click="file = null">
          </button>
        </span>
      </div>
      <b-field label="Date" class="column">
            <b-datepicker
              inline
              v-model="event.date"
              placeholder="Cliquer pour sélectionner..."
              icon="calendar-day"
              ref="dateField">
            </b-datepicker>
        </b-field>
    </div>
    <div class="columns align-right">
      <div class="column is-narrow" v-if="event.id != 0">
        <b-button type="is-danger" size="is-normal" icon-left="trash">Supprimer</b-button>
      </div>
      <div class="column is-narrow">
        <b-button type="is-success" size="is-normal" icon-left="check" @click="send">Envoyer</b-button>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'

export default {
  name: 'event-form',
  props: {
    event: Object
  },
  data () {
    return {
      file: null
    }
  },
  methods: {
    send () {
      // TODO HTTP call
    }
  },
  watch: {
    event (newVal, oldVal) {
      this.file = null
      Vue.nextTick(() => {
        this.$refs.nameField.checkHtml5Validity()
        this.$refs.addressField.checkHtml5Validity()
        this.$refs.descriptionField.checkHtml5Validity()
        this.$refs.dateField.checkHtml5Validity()
      })
    }
  }
}
</script>

<style scoped lang="scss">
</style>
