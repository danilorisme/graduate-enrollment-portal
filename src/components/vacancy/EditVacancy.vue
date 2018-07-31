<template>
  <div>
    <navbar />
    <div class="container mt-4">
      <h2 class="centered">{{ title }}</h2>
      <div class="row mt-4">
          <div class="col-lg-12">
            <form @submit="onSubmit">
              <div class="form-group">
                <label for="inputSelectCampus">Campus</label>
                <select v-model="vacancy.campus" class="custom-select" id="inputSelectCampus" required>
                  <option selected>Campus</option>
                  <option v-for="campus in campi">{{ campus.name }}</option>
                </select>
              </div>

              <div class="form-group">
                <label for="inputSelectShift">Shift</label>
                <select v-model="vacancy.shift" class="custom-select" id="inputSelectShift" required>
                  <option selected>Shift</option>
                  <option v-for="shift in shifts">{{ shift.name }}</option>
                </select>
              </div>

              <div class="form-group">
                <label for="inputSelectCourse">Course</label>
                <select v-model="vacancy.course" class="custom-select" id="inputSelectCourse" required>
                  <option selected>Course</option>
                  <option v-for="course in courses">{{ course.name }}</option>
                </select>
              </div>

              <div class="form-group">
                <label for="inputTextNumVacancy">Number of Vacancies</label>
                <input v-model="vacancy.numVacancies" type="text" class="form-control" id="inputTextNumVacancy" placeholder="NumberVacancy" aria-label="NumberVacancy" required>
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
  name: 'EditVacancy',
  components: {
    'Navbar': Navbar,
    'form-button': Button
  },
  data () {
    return {
      title: 'Edit vacancy',
      campi: [],
      shifts: [],
      courses: [],
      vacancy: {},
      id: this.$route.params.id,
      errors: []
    }
  },
  methods: {
    onSubmit (evt) {
      evt.preventDefault()
      axios.put('http://localhost:3000/vacancy/'+this.id, this.vacancy)
      .then(response => {
        alert("vacancy successfully updated!")
        this.$router.push({
          name: 'ListVacancy'
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

    axios.get('http://localhost:3000/campus')
    .then(response => {
      this.campi = response.data
    })
    .catch(e => {
      this.errors.push(e)
      if(e.response.status === 401) {
        this.$router.push({
          name: 'Login'
        })
      }
    })

    axios.get('http://localhost:3000/shift')
    .then(response => {
      this.shifts = response.data
    })
    .catch(e => {
      this.errors.push(e)
      if(e.response.status === 401) {
        this.$router.push({
          name: 'Login'
        })
      }
    })

    axios.get('http://localhost:3000/course')
    .then(response => {
      this.courses = response.data
    })
    .catch(e => {
      this.errors.push(e)
      if(e.response.status === 401) {
        this.$router.push({
          name: 'Login'
        })
      }
    })

    if(this.id) {
        axios.get('http://localhost:3000/vacancy/'+this.id)
        .then(response => {
            this.vacancy = response.data
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
