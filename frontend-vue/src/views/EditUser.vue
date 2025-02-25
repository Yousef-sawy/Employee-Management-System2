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
        </div>

        <div class="form-group">
          <label for="role">Role:</label>
          <select id="role" v-model="user.role" class="form-control" required>
            <option value="admin">Admin</option>
            <option value="employee">Employee</option>
          </select>
        </div>

        <button type="submit" class="btn btn-primary">{{ isEditMode ? "Save Changes" : "Create User" }}</button>
        <router-link to="/" class="btn btn-secondary ml-2">Cancel</router-link>
      </form>

      <p v-if="errorMessage" class="text-danger mt-3">{{ errorMessage }}</p>
    </div>
  </div>
</template>

<script>
import AppNavbar from '../components/AppNavbar.vue';
import userController from '../api/userController';

export default {
  name: 'EditUser',
  props: ['id'], // The id will be null for create mode
  components: { AppNavbar },
  data() {
    return {
      user: { username: '', email: '', role: 'user' },
      errorMessage: ''
    };
  },
  computed: {
    isEditMode() {
      return !!this.id; // Returns true if editing, false if creating
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
    if (this.user.id) {
      await userController.updateUser(this.user.id, this.user);
    } else {
      await userController.createUser(this.user);
    }
    this.$router.push('/');
  } catch (error) {
    console.error('Error saving user:', error);
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
</style>



