import Vue from 'vue'
import Router from 'vue-router'
// Enrollment
import Enrollment from '@/components/enrollment/CreateEnrollment'
import ListEnrollment from '@/components/enrollment/ListEnrollment'
import EditEnrollment from '@/components/enrollment/EditEnrollment'
// Vancancy
import CreateVacancy from '@/components/vacancy/CreateVacancy'
import ListVacancy from '@/components/vacancy/ListVacancy'
// import EditVacancy from '@/components/vacancy/EditVacancy'
// Graduate Type
// import CreateGraduateType from '@/components/graduatetype/CreateGraduateType'
// import ListGraduateType from '@/components/graduatetype/ListGraduateType'
// import EditGraduateType from '@/components/graduatetype/EditGraduateType'
// Campus
// import CreateCampus from '@/components/campus/CreateCampus'
// import ListCampus from '@/components/campus/ListCampus'
// import EditCampus from '@/components/campus/EditCampus'
// Shift
// import CreateShift from '@/components/Shift/CreateShift'
// import ListShift from '@/components/Shift/ListShift'
// import EditShift from '@/components/Shift/EditShift'
// Course
// import CreateCourse from '@/components/course/CreateCourse'
// import ListCourse from '@/components/course/ListCourse'
// import EditCourse from '@/components/course/EditCourse'
// Auth
import Login from '@/components/Login'
import Register from '@/components/Register'

Vue.use(Router)

export default new Router({
  routes: [
    // Enrollment
    { path: '/', name: 'Enrollment', component: Enrollment },
    { path: '/listenrollment', name: 'ListEnrollment', component: ListEnrollment },
    { path: '/editenrollment/:id', name:'EditEnrollment', component: EditEnrollment },
    // Vacancy
    { path: '/createvacancy/', name: 'CreateVacancy', component: CreateVacancy },
    { path: '/listvacancy', name: 'ListVacancy', component: ListVacancy },
    // { path: '/editvacancy/:id', name: 'EditVacancy', component: EditVacancy },
    // Graduate Type
    // { path: '/creategraduatetype/', name: 'CreateGraduateType', component: CreateGraduateType },
    // { path: '/listgraduatetype', name: 'ListGraduateType', component: ListGraduateType },
    // { path: '/editgraduatetype/:id', name: 'EditGraduateType', component: EditGraduateType },
    // Campus
    // { path: '/createcampus/', name: 'CreateCampus', component: CreateCampus },
    // { path: '/listcampus', name: 'ListCampus', component: ListCampus },
    // { path: '/editcampus/:id', name: 'EditCampus', component: EditCampus },
    // Shift
    // { path: '/createshift/', name: 'CreateShift', component: CreateShift },
    // { path: '/listshift', name: 'ListShift', component: ListShift },
    // { path: '/editshift/:id', name: 'EditShift', component: EditShift },
    // Course
    // { path: '/createcourse/', name: 'CreateCourse', component: CreateCourse },
    // { path: '/listcourse', name: 'ListCourse', component: ListCourse },
    // { path: '/editcourse/:id', name: 'EditCourse', component: EditCourse },
    // Auth
    { path: '/login', name: 'Login', component: Login },
    { path: '/register', name: 'Register', component: Register }
  ]
})
