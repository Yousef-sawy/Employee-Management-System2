import { createRouter, createWebHistory } from 'vue-router';
import UserList from './views/UserList.vue';
import EditUser from './views/EditUser.vue';
import CompanyList from './views/CompanyList.vue';
import EditCompany from './views/EditCompany.vue';
import DepartmentList from './views/DepartmentList.vue';
import EditDepartment from './views/EditDepartment.vue';

const routes = [
    { path: '/', name: 'users', component: UserList },
    { path: '/edit-user/:id', name: 'edit-user', component: EditUser, props: true },
    { path: '/create-user', name: 'create-user', component: EditUser }, // ✅ Create User Route

    { path: '/companies', name: 'companies', component: CompanyList },
    { path: '/edit-company/:id', name: 'edit-company', component: EditCompany, props: true },
    { path: '/create-company', name: 'create-company', component: EditCompany }, // ✅ Create Company Route
    
    { path: '/departments', name: 'departments', component: DepartmentList },
    { path: '/edit-department/:id', name: 'edit-department', component: EditDepartment, props: true },
    { path: '/create-department', name: 'create-department', component: EditDepartment } // ✅ Create Department Route
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;

