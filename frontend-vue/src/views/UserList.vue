<template>
  <div class="user">
    <AppNavbar />
    <h1>User List</h1>

    <!-- Create User Button -->
    <div class="container mb-3 text-right">
      <router-link :to="{ name: 'create-user' }" class="btn btn-success">Create User</router-link>
    </div>

    <div class="album py-5 bg-light">
      <div class="container">
        <div class="row">
          <div v-for="user in users" :key="user.id" class="col-md-4">
            <div class="card mb-4 box-shadow">
              <div class="card-body">
                <h4 class="text-secondary">{{ user.username }}</h4>
                <p class="card-text"><strong>Email:</strong> {{ user.email }}</p>
                <p class="card-text"><strong>Role:</strong> {{ user.role }}</p>
                <div class="d-flex justify-content-between align-items-center">
                  <div class="btn-group">
                    <button @click="viewUser(user.id)" class="btn btn-sm btn-outline-primary">View</button>
                    <button @click="editUser(user)" class="btn btn-sm btn-outline-secondary">Edit</button>
                    <button @click="deleteUser(user.id)" class="btn btn-sm btn-outline-danger">Delete</button>
                  </div>
                  <small class="text-muted">ID: {{ user.id }}</small>
                </div>
              </div>
            </div>
          </div>
          <p v-if="users.length === 0">No users found.</p>
        </div>
      </div>
    </div>

    <!-- Modal for Editing User Details -->
    <div v-if="selectedUser" class="modal fade show d-block" tabindex="-1" role="dialog">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Edit User - {{ selectedUser.username }}</h5>
            <button type="button" class="close" @click="selectedUser = null">&times;</button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="saveUser">
              <div class="form-group">
                <label for="username">Username:</label>
                <input type="text" id="username" v-model="selectedUser.username" class="form-control" required>
              </div>
              <div class="form-group">
                <label for="email">Email:</label>
                <input type="email" id="email" v-model="selectedUser.email" class="form-control" readonly required>
              </div>
              <div class="form-group">
                <label for="role">Role:</label>
                <select id="role" v-model="selectedUser.role" class="form-control" required>
                  <option value="admin">Admin</option>
                  <option value="employee">Employee</option>
                </select>
              </div>
              <button type="submit" class="btn btn-primary">Save Changes</button>
              <button type="button" class="btn btn-secondary" @click="selectedUser = null">Cancel</button>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div v-if="selectedUser" class="modal-backdrop fade show"></div>
  </div>
</template>

<script>
import AppNavbar from '../components/AppNavbar.vue';
import userController from '../api/userController';

export default {
  name: 'UserList',
  components: { AppNavbar },
  data() {
    return {
      users: [],
      selectedUser: null
    };
  },
  async created() {
    this.users = await userController.getUsers();
  },
  methods: {
    async viewUser(id) {
      this.selectedUser = await userController.getUserById(id);
    },
    async editUser(user) {
      this.selectedUser = { ...user }; // Copy user details to modal form
    },
    async saveUser() {
      try {
        await userController.updateUser(this.selectedUser.id, this.selectedUser);
        this.selectedUser = null; // Close modal after saving
        this.users = await userController.getUsers(); // Refresh user list
      } catch (error) {
        console.error('Error updating user:', error);
      }
    },
    async deleteUser(id) {
      const confirmed = confirm("Are you sure you want to delete this user?");
      if (confirmed) {
        const success = await userController.deleteUser(id);
        if (success) {
          this.users = this.users.filter(user => user.id !== id);
        }
      }
    }
  }
};
</script>

<style scoped>
/* Modal styles */
.modal {
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.modal-content {
  background: white;
  padding: 20px;
  border-radius: 5px;
}
.modal-backdrop {
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
