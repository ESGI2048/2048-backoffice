<template>
  <div class="component-form">
    <h4 class="subtitle" v-if="component.id == 0">Nouveau composant</h4>
    <h4 class="subtitle" v-if="component.id != 0">Modifier {{ component.name }}</h4>
    <div class="columns is-mobile">
      <b-field label="Nom" class="column">
        <b-input :value="component.name" required></b-input>
      </b-field>
      <b-field label="Valeur" class="column">
        <b-numberinput v-model="component.value" min="0" required></b-numberinput>
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
        <b-button type="is-danger" size="is-normal" icon-left="trash">Supprimer</b-button>
      </div>
      <div class="column is-narrow">
        <b-button type="is-success" size="is-normal" icon-left="check" @click="send">Envoyer</b-button>
      </div>
    </div>
  </div>
</template>

<script>
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
      // TODO HTTP call
    }
  }
}
</script>

<style scoped lang="scss">
</style>
