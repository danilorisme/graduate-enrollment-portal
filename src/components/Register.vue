<template>
<div>
    <div class="container mt-4">
      <div class="row mt-4">
        <div class="col-lg-12">
          <h2>Please Register</h2>
          <div v-if="errors && errors.length">
            <div v-for="error of errors">
              <alert show>{{error.message}}</alert>
            </div>
          </div>
          <form @submit="onSubmit">
            <div class="form-group">
              <label for="inputTextUsername">Username</label>
              <input type="text" id="inputTextUsername" :state="state" v-model.trim="register.username" />
            </div>
            <div class="form-group">
              <label for="inputTextPassword">Password</label>
              <input type="password" id="inputTextPassword" :state="state" v-model.trim="register.password" />
            </div>
            <button type="submit" class="btn btn-primary">Register</button>
            <button type="button" class="btn btn-warning" @click="$router.go(-1)">Cancel</button>
          </form>
        </div>
      </div>
    </div>
</div>
</template>

<script>

import axios from 'axios'

export default {
  name: 'Register',
  data () {
    return {
      register: {},
      errors: []
    }
  },
  methods: {
    onSubmit (evt) {
      evt.preventDefault()
      axios.post('http://localhost:3000/api/auth/register', this.register)
      .then(response => {
        alert("Registered successfully")
        this.$router.push({
          name: 'Login'
        })
      })
      .catch(e => {
        console.log(e)
        this.errors.push(e)
      })
    }
  }
}
</script>