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
                <input v-model="graduatetype.name" type="text" class="form-control" id="inputTextName" placeholder="Name Graduate Type" aria-label="GraduateType">
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
  name: 'CreateGraduateType',
  components: {
    'Navbar': Navbar,
    'form-button': Button
  },
  data () {
    return {
      title: 'Create Graduate Type',
      graduatetype: {},
      errors: []
    }
  },
  methods: {
    onSubmit (evt) {
      evt.preventDefault()
      axios.post('http://localhost:3000/graduatetype', this.graduatetype)
      .then(response => {
        alert("Graduatetype successfully created!")
        this.$router.push({
          name: 'ListGraduateType'
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

  }
}
</script>
