<template>
  <div class="edit-user">
    <AppNavbar />
    <div class="container">
      <h1>{{ isEditMode ? "Edit User" : "Create User" }}</h1>
      <form @submit.prevent="saveUser">
        <div class="form-group">
          <label for="username">Username:</label>
          <input type="text" id="username" v-model="user.username" class="form-control" required>
        </div>

        <div class="form-group">
          <label for="email">Email:</label>
          <input type="email" id="email" v-model="user.email" class="form-control" required>
          <p v-if="errors.email" class="text-danger">{{ errors.email }}</p> <!-- ✅ Show email error -->
        </div>

        <div class="form-group">
          <label for="role">Role:</label>
          <select id="role" v-model="user.role" class="form-control" required>
            <option value="admin">Admin</option>
            <option value="employee">Employee</option>
          </select>
        </div>

        <button type="submit" class="btn btn-primary">
          {{ isEditMode ? "Save Changes" : "Create User" }}
        </button>
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
  props: ['id'],
  components: { AppNavbar },
  data() {
    return {
      user: { username: '', email: '', role: 'employee' },
      errors: {}, // ✅ Stores validation errors
      errorMessage: ''
    };
  },
  computed: {
    isEditMode() {
      return !!this.id;
    }
  },
  async created() {
    if (this.isEditMode) {
      try {
        this.user = await userController.getUserById(this.id);
      } catch (error) {
        this.errorMessage = 'Error loading user details.';
        console.error(error);
      }
    }
  },
  methods: {
    async saveUser() {
      try {
        // ✅ Fetch all users to check for duplicate emails
        const users = await userController.getUsers(); // 🔥 Fixed function name
        const duplicate = users.find(
          u => u.email.toLowerCase() === this.user.email.toLowerCase() && u.id !== this.id
        );

        if (duplicate) {
          this.errors.email = "This email is already in use!";
          return;
        } else {
          this.errors.email = "";
        }

        if (this.isEditMode) {
          await userController.updateUser(this.user.id, this.user);
        } else {
          await userController.createUser(this.user);
        }

        this.$router.push('/');
      } catch (error) {
        console.error('Error saving user:', error);
        this.errorMessage = 'Failed to save user. Please try again.';
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
