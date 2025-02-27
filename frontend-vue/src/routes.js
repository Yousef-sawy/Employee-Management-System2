import { createRouter, createWebHistory } from 'vue-router';
import UserList from './views/UserList.vue';
import CompanyList from './views/CompanyList.vue';
import DepartmentList from './views/DepartmentList.vue';
import EmployeeList from './views/EmployeeList.vue';

import Login from './views/Authentcation/Login.vue';
import Logout from './views/Authentcation/Logout.vue';
import Register from './views/Authentcation/Register.vue';

import store from './Auth'; // Import your Vuex store

const routes = [
    { path: '/', name: 'users', component: UserList, meta: { requiresLogin: true } },
    { path: '/companies', name: 'companies', component: CompanyList, meta: { requiresLogin: true } },
    { path: '/departments', name: 'departments', component: DepartmentList, meta: { requiresLogin: true } },
    { path: '/employees', name: 'employees', component: EmployeeList, meta: { requiresLogin: true } },

    { path: '/login', name: 'login', component: Login },
    { path: '/logout', name: 'logout', component: Logout },
    { path: '/register', name: 'register', component: Register },  // Registration page is accessible without auth
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

// Global Navigation Guard to check authentication
router.beforeEach((to, from, next) => {
    // Check if the route requires login (protected routes)
    if (to.matched.some(record => record.meta.requiresLogin)) {
        // If the user is not authenticated (no accessToken)
        if (!store.state.accessToken) {
            next({ name: 'login' }); // Redirect to login if not authenticated
        } else {
            next(); // Proceed to the route if authenticated
        }
    } else {
        next(); // Allow access to the register and login pages (no auth needed)
    }
});

export default router;
