<template>
  <div>
    <navbar />
    <div class="container mt-4">
      <h2 class="centered">{{ title }}</h2>
      <div class="row mt-4">
          <div class="col-lg-12">
            <form @submit="onSubmit">
              <div class="form-group">
                <label for="inputSelectType">Graduate Type</label>
                <select v-model="enrollment.graduateType" class="custom-select" id="inputSelectType" required>
                  <option selected>Graduate Type</option>
                  <option v-for="type in graduateTypes">{{ type.name }}</option>
                </select>
              </div>

              <div class="form-group">
                <label for="inputSelectCampus">Campus</label>
                <select v-model="enrollment.campus" class="custom-select" id="inputSelectCampus" required>
                  <option selected>Campus</option>
                  <option v-for="campus in campi">{{ campus.name }}</option>
                </select>
              </div>

              <div class="form-group">
                <label for="inputSelectShift">Shift</label>
                <select v-model="enrollment.shift" class="custom-select" id="inputSelectShift" required>
                  <option selected>Shift</option>
                  <option v-for="shift in shifts">{{ shift.name }}</option>
                </select>
              </div>

              <div class="form-group">
                <label for="inputSelectCourse">Course</label>
                <select v-model="enrollment.course" class="custom-select" id="inputSelectCourse" required>
                  <option selected>Course</option>
                  <option v-for="course in courses">{{ course.name }}</option>
                </select>
              </div>

              <div class="form-group">
                <label for="inputTextName">Name</label>
                <input v-model="enrollment.studentName" type="text" class="form-control" id="inputTextName" placeholder="Name" aria-label="Name" required>
              </div>

              <div class="form-group">
                <label for="inputTextEmail">E-mail</label>
                <input v-model="enrollment.studentMail" type="text" class="form-control" id="inputTextEmail" placeholder="E-mail" aria-label="E-mail" required>
              </div>

              <div class="form-group">
                <label for="inputTextCPF">CPF</label>
                <input v-model="enrollment.studentCPF" type="text" class="form-control" placeholder="CPF" aria-label="CPF" required>
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
  name: 'EditEnrollment',
  components: {
    'Navbar': Navbar,
    'form-button': Button
  },
  data () {
    return {
      title: 'Edit Graduate Enrollment',
      graduateTypes: [],
      campi: [],
      shifts: [],
      courses: [],
      enrollment: {},
      id: this.$route.params.id,
      errors: []
    }
  },
  methods: {
    onSubmit (evt) {
      evt.preventDefault()
      axios.put('http://localhost:3000/enrollment/'+this.id, this.enrollment)
      .then(response => {
        alert("Enrollment successfully updated!")
        this.$router.push({
          name: 'ListEnrollment'
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
    axios.get('http://localhost:3000/graduatetype')
    .then(response => {
      this.graduateTypes = response.data
    })
    .catch(e => {
      this.errors.push(e)
      if(e.response.status === 401) {
        this.$router.push({
          name: 'Login'
        })
      }
    })

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
        axios.get('http://localhost:3000/enrollment/'+this.id)
        .then(response => {
            this.enrollment = response.data
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
