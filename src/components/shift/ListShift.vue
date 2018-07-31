<template>
  <div>
    <navbar />
    <div class="container mt-4">
      <div class="row justify-content-between">
        <div class="col-lg-4">
          <h2 class="centered">{{ title }}</h2>
        </div>
        <div class="col-lg-2">
          <router-link :to="{ name: 'CreateShift'}">
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
              <tr v-for="shift of shiftsFilter" :key="shift._id">
                <td>{{ shift.name }}</td>
                <td>
                  <!-- <font-awesome-icon icon="edit" size="lg" />
                  <font-awesome-icon icon="trash-alt" size="lg" /> -->
                  <router-link :to="{ name: 'EditShift', params: { id: shift._id }}">
                    <edit-button label="Update" type="button"/>
                  </router-link>
                  <edit-button label="Remove" type="button" :confirmation="true" classStyle="danger" @buttonClick="remove(shift)" />
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
  name: 'ListShift',
  components: {
    'Navbar': Navbar,
    'edit-button': Button
  },
  data () {
    return {
      title: 'List of Shifts',
      shifts: [],
      filter: '',
      errors: []
    }
  },
  methods: {
    remove(shift) {
      axios.delete('http://localhost:3000/shift/'+shift._id)
      .then(response => {
        let index = this.shifts.indexOf(shift)
        this.shifts.splice(index, 1)
        alert("Shift successfully removed!")
        this.$router.push({
          name: 'ListShift'
        })
      })
      .catch(e => {
        console.log(e)
        this.errors.push(e)
      })
    }
  },
  computed: {
    shiftsFilter() {
      if (this.filter) {
        let exp = new RegExp(this.filter.trim(), 'i');
        return this.shifts.filter(shift => exp.test(shift.name));
      } else {
        return this.shifts;
      }
    }
  },
  created () {
    axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken')
    axios.get('http://localhost:3000/shift')
    .then(response => {
      this.shifts = response.data
      console.log(this.shifts)
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