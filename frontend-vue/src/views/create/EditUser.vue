<template>
  <div class="edit-user">
    <AppNavbar />
    <div class="container">
      <h1>Create New User</h1>
      <form @submit.prevent="saveUser">
        <div class="form-group">
          <label for="username">Username:</label>
          <input type="text" id="username" v-model="user.username" class="form-control" required>
        </div>
        <div class="form-group">
          <label for="email">Email:</label>
          <input type="email" id="email" v-model="user.email" class="form-control" required>
          <p v-if="errors.email" class="text-danger">{{ errors.email }}</p> <!-- ✅ Display email error -->
        </div>
        <div class="form-group">
          <label for="role">Role:</label>
          <select id="role" v-model="user.role" class="form-control" required>
            <option value="admin">Admin</option>
            <option value="employee">Employee</option>
          </select>
        </div>
        <button type="submit" class="btn btn-primary">Create User</button>
        <router-link to="/" class="btn btn-secondary ml-2">Cancel</router-link>
      </form>
      <p v-if="errorMessage" class="text-danger mt-3">{{ errorMessage }}</p>
    </div>
  </div>
</template>

<script>
import AppNavbar from '../../components/AppNavbar.vue';
import userController from '../../api/userController';

export default {
  name: 'EditUser',
  components: { AppNavbar },
  data() {
    return {
      user: { username: '', email: '', role: 'employee' },
      errors: {},
      errorMessage: ''
    };
  },
  async created() {
    // No need for fetching data here as this is for user creation
  },
  methods: {
    async saveUser() {
      try {
        // Check if email already exists
        const users = await userController.getUsers();
        const duplicate = users.find(u => u.email.toLowerCase() === this.user.email.toLowerCase());

        if (duplicate) {
          this.errors.email = "This email is already in use!";
          return;
        }

        this.errors.email = "";
        await userController.createUser(this.user);
        this.$router.push('/'); // Redirect after creation
      } catch (error) {
        console.error('Error creating user:', error);
        this.errorMessage = 'Failed to create user. Please try again.';
      }
    }
  }
};
</script>

<style scoped>
.container {
  max-width: 600px;
  margin-top: 20px;
}
.text-danger {
  color: red;
}
</style>
