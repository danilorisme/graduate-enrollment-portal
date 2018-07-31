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
                  <input v-model="campus.name" type="text" class="form-control" id="inputTextName" placeholder="Name" aria-label="Name" required>
                </div>
              <div class="form-group">
                <label for="inputTextAdress">Adress</label>
                <input v-model="campus.adress" type="text" class="form-control" placeholder="Adress" aria-label="Adress" required>
              </div>
              <div class="text-right">
                <form-button label="Create" classStyle="success" type="submit"/>
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
  name: 'CrateCampus',
  components: {
    'Navbar': Navbar,
    'form-button': Button
  },
  data () {
    return {
      title: 'Create Campus',
      campus: {},
      errors: []
    }
  },
  methods: {
    onSubmit (evt) {
      evt.preventDefault()
      axios.post('http://localhost:3000/campus', this.campus)
      .then(response => {
        if (response.data.success==false) {
          alert("No vacancies for this course!")
        } 
        else {
          alert("Campus successfully created!")
          this.$router.push({
            name: 'ListCampus'
          })
        }
      })
      .catch(e => {
        console.log(e)
        this.errors.push(e)
      })
    }
  },
  created() {
    axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken')

  }
}
</script>

<style>

</style>
