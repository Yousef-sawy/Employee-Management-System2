import { createRouter, createWebHistory } from 'vue-router';
import UserList from './views/UserList.vue';
import CompanyList from './views/CompanyList.vue';
import DepartmentList from './views/DepartmentList.vue';
import EmployeeList from './views/EmployeeList.vue';

import Login from './views/Authentcation/Login.vue';
import Logout from './views/Authentcation/Logout.vue';
import Register from './views/Authentcation/Register.vue';

import store from './Auth'; 

const routes = [
    { path: '/', name: 'users', component: UserList, meta: { requiresLogin: true } },
    { path: '/companies', name: 'companies', component: CompanyList, meta: { requiresLogin: true } },
    { path: '/departments', name: 'departments', component: DepartmentList, meta: { requiresLogin: true } },
    { path: '/employees', name: 'employees', component: EmployeeList, meta: { requiresLogin: true } },

    { path: '/login', name: 'login', component: Login },
    { path: '/logout', name: 'logout', component: Logout },
    { path: '/register', name: 'register', component: Register },  
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresLogin)) {
        if (!store.state.accessToken) {
            next({ name: 'login' }); 
        } else {
            next(); 5
        }
    } else {
        next(); 
    }
});

export default router;
