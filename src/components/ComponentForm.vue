<template>
  <div class="component-form">
    <h4 class="subtitle" v-if="component.id == 0">Nouveau composant</h4>
    <h4 class="subtitle" v-if="component.id != 0">Modifier {{ component.name }}</h4>
    <div class="columns is-mobile">
      <b-field label="Nom" class="column">
        <b-input v-model="component.name" required ref="nameField"></b-input>
      </b-field>
      <b-field label="Valeur" class="column" title="La valeur est définie par le type">
        <b-numberinput v-model="component.value" min="0" required disabled ref="valueField"></b-numberinput>
      </b-field>
    </div>
    <div class="columns is-mobile">
      <div class="column">
        <b-field label="Type">
          <b-select placeholder="Sélectionner un type" required expanded v-model="selectedType" ref="typeField">
            <option v-for="type in types" :key="type.value" :value="type">{{ type.name }}</option>
          </b-select>
        </b-field>
      </div>
      <div class="column has-text-centered">
        <b-field label="Image">
          <b-upload v-model="file" drag-drop :required="component.id == 0" accept="image/*" ref="fileField" @input="updateImagePreview">
            <section class="section" v-if="file == null">
              <div class="content has-text-centered">
                <p>
                  <b-icon icon="upload" size="is-medium">
                  </b-icon>
                </p>
                <p>Déposez une image pour le composant</p>
              </div>
            </section>
            <div class="content has-text-centered" v-else>
              <img :src="fileURL" class="image preview-image">
            </div>
          </b-upload>
        </b-field>
        <div>
          <span class="tag is-medium is-primary" v-if="file">
            {{ file.name }}
            <button class="delete is-small"
              type="button"
              @click="resetUpload">
            </button>
          </span>
        </div>
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
      file: null,
      fileURL: null,
      selectedType: null,
      types: [
        { name: 'Cadran', value: 2 },
        { name: 'Boitier', value: 4 },
        { name: 'Bracelet', value: 8 },
        { name: 'Boitier avec Cadran', value: 16 },
        { name: 'Bracelet avec Boitier', value: 32 },
        { name: 'Montre', value: 64 }
      ]
    }
  },
  methods: {
    send () {
      if (this.validate()) {
        const url = '/component' + (this.component.id !== 0 ? `/${this.component.id}` : '')
        this.$axios({
          method: this.component.id !== 0 ? 'PUT' : 'POST',
          url: url,
          data: this.generateFormData()
        })
          .then((response) => {
            this.$buefy.toast.open({
              duration: 2000,
              message: 'Composant ' + (this.component.id === 0 ? 'créé' : 'modifié'),
              type: 'is-success'
            })
            this.resetUpload()
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
    generateFormData () {
      let formData = new FormData()

      if (this.file) {
        formData.append('file', this.file)
      }

      formData.append('name', this.component.name)
      formData.append('value', this.component.value)
      formData.append('type', this.component.type)
      return formData
    },
    validate () {
      this.$refs.fileField.checkHtml5Validity()
      this.$refs.nameField.checkHtml5Validity()
      this.$refs.valueField.checkHtml5Validity()
      this.$refs.typeField.checkHtml5Validity()
      return this.$refs.nameField.isValid && this.$refs.valueField.isValid && this.$refs.fileField.isValid && this.$refs.typeField.isValid
    },
    updateImagePreview () {
      this.$refs.fileField.checkHtml5Validity()
      this.fileURL = URL.createObjectURL(this.file)
    },
    resetUpload () {
      this.file = null
      this.fileURL = null
    },
    findType (type) {
      for (let key in this.types) {
        if (this.types[key].name === type) {
          return this.types[key]
        }
      }
      return null
    }
  },
  watch: {
    component (newVal, oldVal) {
      if (newVal.id !== oldVal.id) {
        this.resetUpload()
        this.selectedType = this.findType(newVal.type)
        Vue.nextTick(() => {
          this.validate()
        })
      }
    },
    selectedType (newVal, oldVal) {
      this.component.type = this.selectedType != null ? this.selectedType.name : ''
      this.component.value = this.selectedType != null ? this.selectedType.value : undefined
    }
  }
}
</script>

<style scoped lang="scss">
</style>
