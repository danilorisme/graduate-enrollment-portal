<template>
  <div>
    <div class="back">
      <div class="div-center">
        <div class="content">
          <h3>Login</h3>
          <hr />
          <form @submit="onSubmit">
            <div class="form-group">
              <label for="inputTextUsername">Username</label>
              <input class="form-control" type="text" id="inputTextUsername" :state="state" v-model.trim="login.username" required />
            </div>
            <div class="form-group">
              <label for="inputTextPassword">Password</label>
              <input class="form-control" type="password" id="inputTextPassword" :state="state" v-model.trim="login.password" required />
            </div>
            <form-button label="Login" classStyle="success" type="submit" />
            <router-link :to="{ name: 'Register'}">
              <form-button label="Register" classStyle="primary" type="button" />
            </router-link>
          </form>
        </div>
      </div>
  </div>
</template>

<script>

import axios from 'axios'
import Button from './shared/button/Button.vue'

export default {
  name: 'Login',
  components: {
    'form-button': Button
  },
  data () {
    return {
      login: {},
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
        alert("Login or Password incorrect!")
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

<style scoped>
  .back {
    background: #ccc;
    width: 100%;
    position: absolute;
    top: 0;
    bottom: 0;
  }

  .div-center {
    width: 400px;
    height: 400px;
    background-color: #fff;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    max-width: 100%;
    max-height: 100%;
    overflow: auto;
    padding: 1em 2em;
    border-bottom: 2px solid #ccc;
    display: table;
  }

  div.content {
    display: table-cell;
    vertical-align: middle;
  }
</style>