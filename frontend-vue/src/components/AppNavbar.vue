<template>
    <div class="nav-bar">
        <nav class="navbar navbar-light bg-light">
            <div class="container mw-0 px-3 d-flex justify-content-between align-items-center">

                <ul class="navbar-nav d-flex flex-row">
                    <li class="nav-item mx-3">
                        <router-link :to="{ name: 'users' }" class="nav-link">Users</router-link>
                    </li>
                    <li class="nav-item mx-3">
                        <router-link :to="{ name: 'companies' }" class="nav-link">Companies</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link :to="{ name: 'departments' }" class="nav-link">Departments</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link :to="{ name: 'employees' }" class="nav-link">Employees</router-link>
                    </li>
                </ul>

                <div class="d-flex align-items-center">
                    <form class="form-inline d-flex mr-3">
                        <input class="form-control mr-2" type="search" placeholder="Search" aria-label="Search">
                        <button class="btn btn-outline-success" type="submit">Search</button>
                    </form>

                    
                    <button class="btn btn-danger" @click="logout">Logout</button>
                </div>

            </div>
        </nav>
    </div>
</template>

<script>
export default {
    name: 'AppNavbar',
    methods: {
        logout() {
            this.$store.dispatch('userLogout').then(() => {
                this.$router.push({ name: 'login' });
            });
        }
    }
};
</script>

<style scoped>
.navbar-nav .nav-item .nav-link {
    font-weight: bold;
    color: #000;
    text-decoration: none;
    padding: 8px 15px;
}

.navbar-nav .nav-item .nav-link:hover {
    color: #007bff;
}

.form-inline {
    display: flex;
    align-items: center;
}

.form-inline input {
    width: 200px;
}

.btn-danger {
    font-weight: bold;
}
</style>