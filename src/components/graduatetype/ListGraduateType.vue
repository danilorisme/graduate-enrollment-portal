<template>
  <div>
    <navbar />
    <div class="container mt-4">
      <div class="row justify-content-between">
        <div class="col-lg-4">
          <h2 class="centered">{{ title }}</h2>
        </div>
        <div class="col-lg-2">
          <router-link :to="{ name: 'CreateGraduateType'}">
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
                <th scope="col-4">#EDIT</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="graduatetype of graduatetypesFilter" :key="graduatetype._id">
                <td>{{ graduatetype.name }}</td>
                <td>
                  <router-link :to="{ name: 'EditGraduateType', params: { id: graduatetype._id }}">
                    <edit-button label="Update" type="button"/>
                  </router-link>
                  <edit-button label="Remove" type="button" :confirmation="true" classStyle="danger" @buttonClick="remove(graduatetype)" />
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
  name: 'ListGraduateType',
  components: {
    'Navbar': Navbar,
    'edit-button': Button
  },
  data () {
    return {
      title: 'List of Graduate Type',
      graduatetypes: [],
      filter: '',
      errors: []
    }
  },
  methods: {
    remove(graduatetype) {
      axios.delete('http://localhost:3000/graduatetype/'+graduatetype._id)
      .then(response => {
        let index = this.graduatetypes.indexOf(graduatetype)
        this.graduatetypes.splice(index, 1)
        alert("Graduatetype successfully removed!")
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
  computed: {
    graduatetypesFilter() {
      if (this.filter) {
        let exp = new RegExp(this.filter.trim(), 'i');
        return this.graduatetypes.filter(graduatetype => exp.test(graduatetype.name));
      } else {
        return this.graduatetypes;
      }
    }
  },
  created () {
    axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken')
    axios.get('http://localhost:3000/graduatetype')
    .then(response => {
      this.graduatetypes = response.data
      console.log(this.graduatetypes)
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