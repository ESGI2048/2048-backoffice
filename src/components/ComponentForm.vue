<template>
  <div class="component-form">
    <h4 class="subtitle" v-if="component.id == 0">Nouveau composant</h4>
    <h4 class="subtitle" v-if="component.id != 0">Modifier {{ component.name }}</h4>
    <div class="columns is-mobile">
      <b-field label="Nom" class="column">
        <b-input v-model="component.name" required ref="nameField"></b-input>
      </b-field>
      <b-field label="Valeur" class="column">
        <b-numberinput v-model="component.value" min="0" required ref="valueField"></b-numberinput>
      </b-field>
    </div>
    <div class="columns is-mobile">
      <div class="column">
        <b-field label="Image">
          <b-upload v-model="file" drag-drop :required="component.id == 0" ref="fileField">
            <section class="section">
              <div class="content has-text-centered">
                <p>
                  <b-icon icon="upload" size="is-medium">
                  </b-icon>
                </p>
                <p>Déposez une image pour le composant</p>
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
    </div>
    <div class="columns align-right">
      <div class="column is-narrow" v-if="component.id != 0">
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
  name: 'component-form',
  props: {
    component: Object
  },
  data () {
    return {
      file: null
    }
  },
  methods: {
    send () {
      if (this.validate()) {
        this.$axios({
          method: this.component.id !== 0 ? 'PUT' : 'POST',
          url: '/component'
          // TODO body
        })
          .then((response) => {
            this.$buefy.toast.open({
              duration: 2000,
              message: `Composant créé`,
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
        title: 'Supprimer le composant',
        message: 'Êtes-vous sûr de vouloir <b>supprimer</b> ce composant ? Cette action est irréversible.',
        confirmText: 'Supprimer le composant',
        cancelText: 'Annuler',
        type: 'is-danger',
        hasIcon: true,
        onConfirm: () => {
          this.$axios({
            method: 'DELETE',
            url: `/component/${this.component.id}`
          })
            .then((response) => {
              this.$buefy.toast.open({
                duration: 2000,
                message: `Composant supprimé`,
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
    validate () {
      this.$refs.fileField.checkHtml5Validity()
      this.$refs.nameField.checkHtml5Validity()
      this.$refs.valueField.checkHtml5Validity()
      return this.$refs.nameField.isValid && this.$refs.valueField.isValid && this.$refs.fileField.isValid
    }
  },
  watch: {
    component (newVal, oldVal) {
      this.file = null
      Vue.nextTick(() => {
        this.validate()
      })
    }
  }
}
</script>

<style scoped lang="scss">
</style>
