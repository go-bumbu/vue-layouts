import { createRouter, createWebHistory } from "vue-router";
import Home from "./views/index.vue";
import Login from "./views/login.vue";
import responsiveApp from "./views/responsiveApp.vue";


const routes = [
    { path: "/", component: Home },
    { path: "/login", component: Login },
    { path: "/responsive", component: responsiveApp },

];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;