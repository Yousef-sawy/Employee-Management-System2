import { createRouter, createWebHistory } from 'vue-router';
import UserList from './views/UserList.vue';
import CompanyList from './views/CompanyList.vue';
import DepartmentList from './views/DepartmentList.vue';
import EmployeeList from './views/EmployeeList.vue';


import Login from './views/Authentcation/Login.vue';
import Logout from './views/Authentcation/Logout.vue';



const routes = [
    { path: '/', name: 'users', component: UserList },

    { path: '/companies', name: 'companies', component: CompanyList },
   
    
    { path: '/departments', name: 'departments', component: DepartmentList },

    { path: '/employees', name: 'employees', component: EmployeeList },

    
    { path: '/Login', name: 'login', component: Login },
    { path: '/Logout', name: 'logout', component: Logout },

];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
