<template>
  <div>
    <navbar />
    <div class="container mt-4">
      <div class="row justify-content-between">
        <div class="col-lg-4">
          <h2 class="centered">{{ title }}</h2>
        </div>
        <div class="col-lg-2">
          <router-link :to="{ name: 'CreateCampus'}">
            <edit-button label="Create" classStyle="success" type="button"/>
          </router-link>
        </div>
      </div>
      <div class="row mt-4">
        <div class="table-responsive-sm col-lg-12">
          <table class="table table-sm">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Adress</th>
                <th scope="col">#EDIT</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="campus of campiFilter" :key="campus._id">
                <td>{{ campus.name }}</td>
                <td>{{ campus.adress }}</td>
                <td>
                  <!-- <font-awesome-icon icon="edit" size="lg" />
                  <font-awesome-icon icon="trash-alt" size="lg" /> -->
                  <router-link :to="{ name: 'EditCampus', params: { id: campus._id }}">
                    <edit-button label="Update" type="button"/>
                  </router-link>
                  <edit-button label="Remove" type="button" :confirmation="true" classStyle="danger" @buttonClick="remove(campus)" />
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
  name: 'ListCampus',
  components: {
    'Navbar': Navbar,
    'edit-button': Button
  },
  data () {
    return {
      title: 'List of Campi',
      campi: [],
      filter: '',
      errors: []
    }
  },
  methods: {
    remove(campus) {
      axios.delete('http://localhost:3000/campus/'+campus._id)
      .then(response => {
        let index = this.campi.indexOf(campus)
        this.campi.splice(index, 1)
        alert("Campus successfully removed!")
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
  computed: {
    campiFilter() {
      if (this.filter) {
        let exp = new RegExp(this.filter.trim(), 'i')
        return this.campi.filter(campus => exp.test(campus.studentCPF))
      } else {
        return this.campi
      }
    }
  },
  created () {
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
  }
}
</script>