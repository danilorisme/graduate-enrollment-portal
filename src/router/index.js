import Vue from 'vue'
import Router from 'vue-router'
import Enrollment from '@/components/Enrollment'
import EnrollmentList from '@/components/EnrollmentList'
import EditEnrollment from '@/components/EditEnrollment'
import CreateVacancy from '@/components/vacancy/CreateVacancy'
import ListVacancy from '@/components/vacancy/ListVacancy'
import Login from '@/components/Login'
import Register from '@/components/Register'

Vue.use(Router)

export default new Router({
  routes: [
    // Enrollment
    { path: '/', name: 'Enrollment', component: Enrollment },
    { path: '/listenrollment', name: 'EnrollmentList', component: EnrollmentList },
    { path: '/enrollment/:id', name:'EnrollmentUpdate', component: EditEnrollment, title: 'Update Enrollment'},
    // Vacancy
    { path: '/createvacancy/', name: 'CreateVacancy', component: CreateVacancy },
    { path: '/listvacancy', name: 'ListVacancy', component: ListVacancy },
    // { path: '/editvacancy/:id', name: 'EditVacancy', component: EditVacancy },
    // Auth
    { path: '/login', name: 'Login', component: Login },
    { path: '/register', name: 'Register', component: Register }
  ]
})
