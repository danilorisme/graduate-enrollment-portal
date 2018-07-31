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
                <input v-model="course.name" type="text" class="form-control" id="inputTextName" placeholder="Course" aria-label="Course" required>
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
  name: 'CreateCourse',
  components: {
    'Navbar': Navbar,
    'form-button': Button
  },
  data () {
    return {
      title: 'Create Course',
      course: {},
      errors: []
    }
  },
  methods: {
    onSubmit (evt) {
      evt.preventDefault()
      axios.post('http://localhost:3000/course', this.course)
      .then(response => {
        alert("Course successfully created!")
        this.$router.push({
          name: 'ListCourse'
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

<style>

</style>
