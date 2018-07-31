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
                <input v-model="campus.name" type="text" class="form-control" id="inputTextName" placeholder="Name" aria-label="Name">
              </div>
              <div class="form-group">
                <label for="inputTextAdress">Adress</label>
                <input v-model="campus.adress" type="text" class="form-control" placeholder="Adress" aria-label="Adress">
              </div>
              <div class="text-right">
                <form-button label="Update" classStyle="success" type="submit" />
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
  name: 'EditCampus',
  components: {
    'Navbar': Navbar,
    'form-button': Button
  },
  data () {
    return {
      title: 'Edit Campus',
      campus: [],
      id: this.$route.params.id,
      errors: []
    }
  },
  methods: {
    onSubmit (evt) {
      evt.preventDefault()
      axios.put('http://localhost:3000/campus/'+this.id, this.campus)
      .then(response => {
        alert("Campus successfully updated!")
        this.$router.push({
          name: 'ListCampus'
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
        axios.get('http://localhost:3000/campus/'+this.id)
        .then(response => {
            this.campus = response.data
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
