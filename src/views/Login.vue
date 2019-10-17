<template>
  <div class="events">
    <h1 class="title">Connexion</h1>
    <div class="columns is-centered">
      <div class="column is-narrow has-text-centered">
        <b-field label="Identifiant">
              <b-input v-model="username" required ref="usernameInput"></b-input>
          </b-field>
        <b-field label="Mot de passe">
          <b-input type="password"
            v-model="password"
            required
             ref="passwordInput"
            password-reveal
            @keyup.native.enter="login">
          </b-input>
        </b-field>
        <b-button type="is-primary" @click="login">Connexion</b-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    login () {
      this.$refs.usernameInput.checkHtml5Validity()
      this.$refs.passwordInput.checkHtml5Validity()
      if (this.$refs.usernameInput.isValid && this.$refs.passwordInput.isValid) {
        this.$axios.defaults.headers.common['Authorization'] = `Basic ${Buffer.from(this.username + ':' + this.password).toString('base64')}`

        this.$axios.get('/login/admin')
          .then((response) => {
            this.$auth.username = this.username
            this.$auth.password = this.password
            this.username = ''
            this.password = ''
            this.$router.push({ name: 'components' })
          })
          .catch((error) => {
            const message = error.response && error.response.status === 403 ? 'Identifiants incorrects' : `Une erreur est survenue.<br>${error}`
            this.$buefy.toast.open({
              duration: 5000,
              message: message,
              type: 'is-danger'
            })
            this.password = ''
            this.$auth.username = ''
            this.$auth.password = ''
            delete this.$axios.defaults.headers.common['Authorization']
          })
      }
    }
  },
  mounted () {
    if (this.$auth.username && this.$auth.password) {
      this.$router.push({ name: 'components' })
    }
  }
}
</script>
