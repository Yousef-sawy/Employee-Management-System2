import { createRouter, createWebHistory } from 'vue-router';
import UserList from './views/UserList.vue';
import EditUser from './views/create/EditUser.vue'; // ✅ Updated path
import CompanyList from './views/CompanyList.vue';
import EditCompany from './views/create/EditCompany.vue'; // ✅ Updated path
import DepartmentList from './views/DepartmentList.vue';
import EditDepartment from './views/create/EditDepartment.vue'; // ✅ Updated path

import EmployeeList from './views/EmployeeList.vue';
import EditEmployee from './views/create/EditEmployee.vue';


import Login from './views/Authentcation/Login.vue';
import Logout from './views/Authentcation/Logout.vue';



const routes = [
    { path: '/', name: 'users', component: UserList },
    { path: '/edit-user/:id', name: 'edit-user', component: EditUser, props: true },
    { path: '/create-user', name: 'create-user', component: EditUser },

    { path: '/companies', name: 'companies', component: CompanyList },
    { path: '/edit-company/:id', name: 'edit-company', component: EditCompany, props: true },
    { path: '/create-company', name: 'create-company', component: EditCompany },
    
    { path: '/departments', name: 'departments', component: DepartmentList },
    { path: '/edit-department/:id', name: 'edit-department', component: EditDepartment, props: true },
    { path: '/create-department', name: 'create-department', component: EditDepartment },

    { path: '/employees', name: 'employees', component: EmployeeList },
    { path: '/edit-employee/:id', name: 'edit-employee', component: EditEmployee, props: true },
    { path: '/create-employee', name: 'create-employee', component: EditEmployee },


    { path: '/Login', name: 'login', component: Login },
    { path: '/Logout', name: 'logout', component: Logout },

];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
