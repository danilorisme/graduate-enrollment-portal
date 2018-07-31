<template>
  <div>
    <!-- <div class="container mt-4">
      <div class="row mt-4">
        <div class="col-lg-12">
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
    </div> -->

    <!-- <div class="container">
      <div class="row">
        <div class="Absolute-Center is-Responsive">
          <div id="logo-container"></div>
          <div class="col-sm-12 col-md-10 col-md-offset-1">
            <form id="loginForm" @submit="onSubmit">
              <div class="form-group input-group">
                <label for="inputTextUsername">Username</label>
                <input class="form-control" type="text" id="inputTextUsername" :state="state" v-model.trim="login.username" />          
              </div>
              <div class="form-group input-group">
                <label for="inputTextPassword">Password</label>
                <input class="form-control" type="password" id="inputTextPassword" :state="state" v-model.trim="login.password" />     
              </div>
              <div class="form-group">
                <button type="button" class="btn btn-def btn-block">Login</button>
                <button type="button" class="btn btn-secondary btn-def btn-block" @click.stop="register()">Register</button>
              </div>
            </form>        
          </div>  
        </div>    
      </div>
    </div> -->

    <div class="back">
      <div class="div-center">
        <div class="content">
          <h3>Login</h3>
          <hr />
          <form @submit="onSubmit">
            <div class="form-group">
              <label for="inputTextUsername">Username</label>
              <input class="form-control" type="text" id="inputTextUsername" :state="state" v-model.trim="login.username" />
            </div>
            <div class="form-group">
              <label for="inputTextPassword">Password</label>
              <input class="form-control" type="password" id="inputTextPassword" :state="state" v-model.trim="login.password" />
            </div>
            <button type="submit" class="btn btn-primary">Login</button>
          </form>
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