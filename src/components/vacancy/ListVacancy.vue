<template>
  <div>
    <navbar />
    <div class="container mt-4">
      <div class="row justify-content-between">
        <div class="col-lg-4">
          <h2 class="centered">{{ title }}</h2>
        </div>
        <div class="col-lg-2">
          <router-link :to="{ name: 'CreateVacancy'}">
            <edit-button label="Create" classStyle="success" type="button"/>
          </router-link>
        </div>
      </div>
      
      <div class="row mt-4">
        <div class="table-responsive-sm col-lg-12">
          <table class="table table-sm">
            <thead>
              <tr>
                <th scope="col">Campus</th>
                <th scope="col">Shift</th>
                <th scope="col">Course</th>
                <th scope="col">Number of Vacancies</th>
                <th scope="col">Number of Vacancies Filled</th>
                <th scope="col">#EDIT</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="vacancy of vacancies" :key="vacancy._id">
                <td>{{ vacancy.campus }}</td>
                <td>{{ vacancy.shift }}</td>
                <td>{{ vacancy.course }}</td>
                <td>{{ vacancy.numVacancies }}</td>
                <td>{{ vacancy.numVacanciesFilled }}</td>
                <td>
                  <!-- <font-awesome-icon icon="edit" size="lg" />
                  <font-awesome-icon icon="trash-alt" size="lg" /> -->
                  <router-link :to="{ name: 'EditVacancy', params: { id: vacancy._id }}">
                    <edit-button label="Update" type="button"/>
                  </router-link>
                  <edit-button label="Remove" type="button" :confirmation="true" classStyle="danger" @buttonClick="remove(vacancy)" />
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
  name: 'ListVacancy',
  components: {
    'Navbar': Navbar,
    'edit-button': Button
  },
  data () {
    return {
      title: 'List of Vacancies',
      vacancies: [],
      errors: []
    }
  },
  methods: {
    remove(vacancy) {
      axios.delete('http://localhost:3000/vacancy/'+vacancy._id)
      .then(response => {
        let index = this.vacancies.indexOf(vacancy)
        this.vacancies.splice(index, 1)
        alert("Vacancy successfully removed!")
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
  created () {
    axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken')
    axios.get('http://localhost:3000/vacancy')
    .then(response => {
      this.vacancies = response.data
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