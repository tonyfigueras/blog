require('admin-lte');
require('./bootstrap');

window.Vue = require('vue').default;

//window.Vue = require('vue');

import VueRouter from 'vue-router'

Vue.use(VueRouter)

let routes = [
	{ path: '/dashboard', component: require('./components/Dashboard.vue').default },
	{ path: '/profile', component: require('./components/Profile.vue').default }
]

const router = new VueRouter({
	mode: 'history',
	routes,
	linkActiveClass: 'active',
	linkExactActiveClass: "exact-active",
})

const app = new Vue({
    el: '#app',
    router
});


