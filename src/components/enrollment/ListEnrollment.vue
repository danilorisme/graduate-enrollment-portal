<template>
  <div>
    <navbar />
    <div class="container mt-4">
      <h2 class="centered">{{ title }}</h2>
      <div class="row mt-4">
        <div class="col-lg-12"><input type="search" class="form-control form-control-lg" v-on:input="filter = $event.target.value" placeholder="Filter by student CPF." /></div>
      </div>
      <div v-show="message" class="row mt-4">
        <div class="alert alert-primary my-3" role="alert">
          <p>{{ message }}</p>
        </div>
      </div>

      <div class="row mt-4">
        <div class="table-responsive-sm col-lg-12">
          <table class="table table-sm">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">CPF</th>
                <th scope="col">E-mail</th>
                <th scope="col">Graduate Type</th>
                <th scope="col">Campus</th>
                <th scope="col">Shift</th>
                <th scope="col">Course</th>
                <th scope="col">#EDIT</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="enrollment of enrollmentsFilter" :key="enrollment._id">
                <td>{{ enrollment.studentName }}</td>
                <td>{{ enrollment.studentCPF }}</td>
                <td>{{ enrollment.studentMail }}</td>
                <td>{{ enrollment.graduateType }}</td>
                <td>{{ enrollment.campus }}</td>
                <td>{{ enrollment.shift }}</td>
                <td>{{ enrollment.course }}</td>
                <td>
                  <!-- <font-awesome-icon icon="edit" size="lg" />
                  <font-awesome-icon icon="trash-alt" size="lg" /> -->
                  <router-link :to="{ name: 'EditEnrollment', params: { id: enrollment._id }}">
                    <edit-button label="Update" type="button"/>
                  </router-link>
                  <edit-button label="Remove" type="button" :confirmation="true" classStyle="danger" @buttonClick="remove(enrollment)" />
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
  name: 'ListEnrollment',
  components: {
    'Navbar': Navbar,
    'edit-button': Button
  },
  data () {
    return {
      title: 'List of Enrollments',
      enrollments: [],
      filter: '',
      errors: []
    }
  },
  methods: {
    remove(enrollment) {
      axios.delete('http://localhost:3000/enrollment/'+enrollment._id)
      .then(response => {
        let index = this.enrollments.indexOf(enrollment)
        this.enrollments.splice(index, 1)
        alert("Enrollment successfully removed!")
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
  computed: {
    enrollmentsFilter() {
      if (this.filter) {
        let exp = new RegExp(this.filter.trim(), 'i')
        return this.enrollments.filter(enrollment => exp.test(enrollment.studentCPF))
      } else {
        return this.enrollments;
      }
    }
  },
  created () {
    axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken')
    axios.get('http://localhost:3000/enrollment')
    .then(response => {
      this.enrollments = response.data
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