<template>
  <div>
    <div class="container">
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <a class="navbar-brand" href="#">
          <img src="../../../assets/img/grad_enroll_icon.png" width="50" height="50" class="d-inline-block align-top" alt="">
        </a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavDropdown">
          <ul class="navbar-nav">
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" id="navMenuLinkEntollment" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Graduate Enrollment
              </a>
              <div class="dropdown-menu" aria-labelledby="navMenuLinkEntollment">
                <router-link class="dropdown-item" to="/">Enroll</router-link>
                <router-link class="dropdown-item" to="/listenrollment">Enrollments</router-link>
              </div>
            </li>
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" id="navMenuLinkAdministration" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Administration
              </a>
              <div class="dropdown-menu" aria-labelledby="navMenuLinkAdministration">
                <router-link class="dropdown-item" to="/listvacancy">Graduate Types</router-link>
                <router-link class="dropdown-item" to="/listvacancy">Campi</router-link>
                <router-link class="dropdown-item" to="/listvacancy">Shifts</router-link>
                <router-link class="dropdown-item" to="/listvacancy">Courses</router-link>
                <router-link class="dropdown-item" to="/listvacancy">Vacancies</router-link>
              </div>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#" @click="logout()">Logout</a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
    <router-view></router-view>

  </div>
</template>

<script>
export default {
  methods: {
    logout () {
        localStorage.removeItem('jwtToken')
        this.$router.push({
        name: 'Login'
        })
    }
  }

}

</script>

<style>

</style>
