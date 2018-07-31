<template>
  <div>
    <navbar />
    <div class="container mt-4">
      <h2 class="centered">{{ title }}</h2>
      <div class="row mt-4">
          <div class="col-lg-12">
            <form @submit="onSubmit">
              <div class="form-group">
                <label for="inputTextName">Name</label>
                <input v-model="shift.name" type="text" class="form-control" id="inputTextName" placeholder="Name Shift Type" aria-label="shift">
              </div>
              <div class="text-right">
                <form-button label="Update" classStyle="success" type="submit"/>
              </div>
            </form>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Button from '../shared/button/Button.vue'
import Navbar from '../shared/navbar/Navbar.vue'

export default {
  name: 'EditShift',
  components: {
    'Navbar': Navbar,
    'form-button': Button
  },
  data () {
    return {
      title: 'Edit Shift',
      shift: {},
      id: this.$route.params.id,
      errors: []
    }
  },
  methods: {
    onSubmit (evt) {
      evt.preventDefault()
      axios.put('http://localhost:3000/shift/'+this.id, this.shift)
      .then(response => {
        alert("Shift successfully updated!")
        this.$router.push({
          name: 'ListShift'
        })
      })
      .catch(e => {
        console.log(e)
        this.errors.push(e)
      })
    }
  },
  created() {
    axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken')

    if(this.id) {
        axios.get('http://localhost:3000/shift/'+this.id)
        .then(response => {
            this.shift = response.data
        })
        .catch(e => {
            this.errors.push(e)
            if(e.response.status === 401) {
                this.$router.push({
                name: 'Login'
                })
            }
        })
      }

  }
}
</script>

<style>

</style>
