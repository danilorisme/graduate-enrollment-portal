<template>
  <div>
    <navbar />
    <div class="container mt-4">
      <div class="row justify-content-between">
        <div class="col-lg-4">
          <h2 class="centered">{{ title }}</h2>
        </div>
        <div class="col-lg-2">
          <router-link :to="{ name: 'CreateCourse'}">
            <edit-button label="Create" classStyle="success" type="button"/>
          </router-link>
        </div>
      </div>
      
      <div class="row mt-4 justify-content-between">
        <div class="table-responsive-sm col-lg-12">
          <table class="table table-sm">
            <thead>
              <tr>
                <th scope="col-lg-4">Name</th>
                <th scope="col-lg-4">#EDIT</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="course of courses" :key="course._id">
                <td>{{ course.name }}</td>
                <td>
                  <router-link :to="{ name: 'EditCourse', params: { id: course._id }}">
                    <edit-button label="Update" type="button"/>
                  </router-link>
                  <edit-button label="Remove" type="button" :confirmation="true" classStyle="danger" @buttonClick="remove(course)" />
                </td>
              </tr>
            </tbody>
          </table>   
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Navbar from '../shared/navbar/Navbar.vue'
import Button from '../shared/button/Button.vue'

export default {
  name: 'ListCourse',
  components: {
    'Navbar': Navbar,
    'edit-button': Button
  },
  data () {
    return {
      title: 'List of Courses',
      courses: [],
      errors: []
    }
  },
  methods: {
    remove(course) {
      axios.delete('http://localhost:3000/course/'+course._id)
      .then(response => {
        let index = this.courses.indexOf(course)
        this.courses.splice(index, 1)
        alert("Course successfully removed!")
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
  created () {
    axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken')
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
  }
}
</script>