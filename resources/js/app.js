import Vue from 'vue';
import Routes from './routes';
import VueRouter from 'vue-router';

require('./bootstrap');

Vue.use(VueRouter);

Vue.config.productionTip = false;

const router = new VueRouter({
    routes: Routes,
    mode: 'history',
    base: '/'
});

const app = new Vue({
    el: '#app',
    router
});
