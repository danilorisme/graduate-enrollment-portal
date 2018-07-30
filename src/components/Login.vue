<template>
  <div>
    <div class="container mt-4">
      <div class="row mt-4">
        <div class="col-lg-12">
          <div v-if="errors && errors.length">
            <div v-for="error of errors">
              <alert show>{{error.message}}</alert>
            </div>
          </div>
          <form @submit="onSubmit">
            <div class="form-group">
              <label for="inputTextUsername">Username</label>
              <input type="text" id="inputTextUsername" :state="state" v-model.trim="login.username" />
            </div>
            <div class="form-group">
              <label for="inputTextPassword">Password</label>
              <input type="password" id="inputTextPassword" :state="state" v-model.trim="login.password" />
            </div>
            <button type="submit" class="btn btn-primary">Login</button>
            <button type="button" class="btn btn-secondary" @click.stop="register()">Register</button>
          </form>
        </div>
      </div>
    </div>

  </div>
</template>

<script>

import axios from 'axios'

export default {
  name: 'Login',
  data () {
    return {
      login: {},
      errors: []
    }
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault()
      axios.post('http://localhost:3000/api/auth/login/', this.login)
      .then(response => {
        localStorage.setItem('jwtToken', response.data.token)
        this.$router.push({
          name: 'Enrollment'
        })
      })
      .catch(e => {
        console.log(e)
        this.errors.push(e)
      })
    },
    register () {
      this.$router.push({
        name: 'Register'
      })
    }
  }
}
</script>