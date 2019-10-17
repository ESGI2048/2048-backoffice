<template>
  <div class="event-form">
    <h4 class="subtitle" v-if="event.id == 0">Nouvel évènement</h4>
    <h4 class="subtitle" v-if="event.id != 0">Modifier {{ event.name }}</h4>
    <div class="columns is-mobile">
      <b-field label="Nom" class="column">
        <b-input v-model="event.name" required ref="nameField"></b-input>
      </b-field>
      <b-field label="Adresse" class="column">
        <b-input v-model="event.address" required ref="addressField"></b-input>
      </b-field>
    </div>
    <div class="columns">
      <b-field label="Description" class="column">
        <b-input maxlength="255" v-model="event.description" required type="textarea" ref="descriptionField"></b-input>
      </b-field>
    </div>
    <div class="columns is-mobile">
      <div class="column">
        <b-field label="Image">
          <b-upload v-model="file" drag-drop :required="event.id == 0" ref="fileField" @input="updateImagePreview">
            <section class="section" v-if="file == null">
              <div class="content has-text-centered">
                <p>
                  <b-icon icon="upload" size="is-medium">
                  </b-icon>
                </p>
                <p>Déposez une image pour l'évènement</p>
              </div>
            </section>
            <div class="content has-text-centered" v-else>
              <img :src="fileURL" class="image preview-image">
              <span class="tag is-medium is-primary" v-if="file">
                {{ file.name }}
                <button class="delete is-small"
                  type="button"
                  @click="resetUpload">
                </button>
              </span>
            </div>
          </b-upload>
        </b-field>
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
        <b-button type="is-danger" size="is-normal" icon-left="trash" @click="deleteRecord">Supprimer</b-button>
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
      file: null,
      fileURL: null
    }
  },
  methods: {
    send () {
      if (this.validate()) {
        const url = '/event' + (this.event.id !== 0 ? `/${this.event.id}` : '')
        this.$axios({
          method: this.event.id !== 0 ? 'PUT' : 'POST',
          url: url,
          data: this.generateFormData()
        })
          .then((response) => {
            this.$buefy.toast.open({
              duration: 2000,
              message: 'Évènement ' + (this.event.id === 0 ? 'créé' : 'modifié'),
              type: 'is-success'
            })
            this.$emit('submit')
          })
          .catch((error) => {
            this.$buefy.toast.open({
              duration: 5000,
              message: `Une erreur est survenue.<br>${error}`,
              type: 'is-danger'
            })
          })
      }
    },
    deleteRecord () {
      this.$buefy.dialog.confirm({
        title: 'Supprimer l\'évènement',
        message: 'Êtes-vous sûr de vouloir <b>supprimer</b> cet évènement ? Cette action est irréversible.',
        confirmText: 'Supprimer l\'évènement',
        cancelText: 'Annuler',
        type: 'is-danger',
        hasIcon: true,
        onConfirm: () => {
          this.$axios({
            method: 'DELETE',
            url: `/event/${this.event.id}`
          })
            .then((response) => {
              this.$buefy.toast.open({
                duration: 2000,
                message: `Évènement supprimé`,
                type: 'is-success'
              })
              this.$emit('delete')
            })
            .catch((error) => {
              this.$buefy.toast.open({
                duration: 5000,
                message: `Une erreur est survenue.<br>${error}`,
                type: 'is-danger'
              })
            })
        }
      })
    },
    generateFormData () {
      let formData = new FormData()

      if (this.file) {
        formData.append('image', this.file)
      }

      formData.append('name', this.event.name)
      formData.append('address', this.event.address)
      formData.append('description', this.event.description)
      formData.append('date', new Date(this.event.date.getTime() - (this.event.date.getTimezoneOffset() * 60000)).toISOString().split('T')[0])
      return formData
    },
    validate () {
      this.$refs.fileField.checkHtml5Validity()
      this.$refs.nameField.checkHtml5Validity()
      this.$refs.addressField.checkHtml5Validity()
      this.$refs.descriptionField.checkHtml5Validity()
      this.$refs.dateField.checkHtml5Validity()
      return this.$refs.nameField.isValid &&
             this.$refs.addressField.isValid &&
             this.$refs.dateField.isValid &&
             this.$refs.fileField.isValid &&
             this.$refs.descriptionField.isValid
    },
    updateImagePreview () {
      this.$refs.fileField.checkHtml5Validity()
      this.fileURL = URL.createObjectURL(this.file)
    },
    resetUpload () {
      this.file = null
      this.fileURL = null
    }
  },
  watch: {
    event (newVal, oldVal) {
      if (newVal.id !== oldVal.id) {
        this.resetUpload()
        Vue.nextTick(() => {
          this.validate()
        })
      }
    }
  }
}
</script>

<style scoped lang="scss">
</style>
