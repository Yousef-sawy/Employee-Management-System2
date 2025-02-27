<template>
  <div class="user">
    <AppNavbar />
    <h1>User List</h1>

    <!-- Create User Button -->
    <div class="container mb-3 text-right">
      <button @click="openCreateModal" class="btn btn-success">Create User</button>
    </div>

    <div class="album py-5 bg-light">
      <div class="container">
        <div class="row">
          <div v-for="user in users" :key="user.id" class="col-md-4">
            <div class="card mb-4 box-shadow">
              <div class="card-body">
                <h4 class="text-secondary">{{ user.username }}</h4>
                <p class="card-text"><strong>Email:</strong> {{ user.email }}</p>
                <div class="d-flex justify-content-between align-items-center">
                  <div class="btn-group">
                    <button @click="viewUser(user)" class="btn btn-sm btn-outline-primary">View</button>
                    <button @click="openEditModal(user)" class="btn btn-sm btn-outline-secondary">Edit</button>
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

    <!-- View User Modal -->
    <div v-if="showViewModal" class="modal fade show d-block" tabindex="-1" role="dialog">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">User Details</h5>
            <button type="button" class="close" @click="closeViewModal">&times;</button>
          </div>
          <div class="modal-body">
            <p><strong>Username:</strong> {{ selectedUser.username }}</p>
            <p><strong>Email:</strong> {{ selectedUser.email }}</p>
          </div>
        </div>
      </div>
    </div>
    <div v-if="showViewModal" class="modal-backdrop fade show"></div>

    <!-- Modal for Creating or Editing User -->
    <div v-if="showModal" class="modal fade show d-block" tabindex="-1" role="dialog">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ isEditMode ? "Edit User" : "Create User" }}</h5>
            <button type="button" class="close" @click="closeModal">&times;</button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="saveUser">
              <div class="form-group">
                <label for="username">Username:</label>
                <input type="text" id="username" v-model="user.username" class="form-control" @blur="validateForm" />
                <small v-if="errors.username" class="text-danger">{{ errors.username }}</small>
              </div>
              <div class="form-group">
                <label for="email">Email:</label>
                <input type="email" id="email" v-model="user.email" class="form-control" :readonly="isEditMode" @blur="validateForm" />
                <small v-if="errors.email" class="text-danger">{{ errors.email }}</small>
              </div>
              <div class="form-group">
                <label for="password">Password:</label>
                <input 
                  type="password" 
                  id="password" 
                  v-model="user.password" 
                  class="form-control"
                  :readonly="isEditMode"  
                  @blur="validateForm"
                />
                <small v-if="errors.password" class="text-danger">{{ errors.password }}</small>
              </div>

              <button type="submit" class="btn btn-primary">{{ isEditMode ? "Save Changes" : "Create User" }}</button>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div v-if="showModal" class="modal-backdrop fade show"></div>
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
      showModal: false,
      showViewModal: false,
      user: { id: null, username: '', email: '', password: '' },
      selectedUser: null,
      isEditMode: false,
      errors: { username: '', email: '', password: '' },
    };
  },
  async created() {
    await this.fetchUsers();
  },
  methods: {
    async fetchUsers() {
      this.users = await userController.getUsers();
    },
    openCreateModal() {
      this.isEditMode = false;
      this.user = { id: null, username: '', email: '', password: '' };
      this.errors = { username: '', email: '', password: '' };
      this.showModal = true;
    },
    async deleteUser(userId) {
    if (!confirm("Are you sure you want to delete this user?")) return;

    try {
      await userController.deleteUser(userId);
      this.users = this.users.filter(user => user.id !== userId); // Remove user from list
    } catch (error) {
      console.error("Error deleting user:", error.response?.data || error);
    }
  },
    openEditModal(user) {
      this.isEditMode = true;
      this.user = { ...user, password: "********" };
      this.errors = { username: '', email: '', password: '' };
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    },
    viewUser(user) {
      this.selectedUser = user;
      this.showViewModal = true;
    },
    closeViewModal() {
      this.showViewModal = false;
    },
    validateForm() {
      this.errors = { username: '', email: '', password: '' };

      if (!this.user.username.trim()) {
        this.errors.username = "Username is required.";
      } else if (!/^[A-Za-z]+$/.test(this.user.username)) {
        this.errors.username = "Username must contain only letters.";
      }

      if (!this.user.email.trim()) {
        this.errors.email = "Email is required.";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.user.email)) {
        this.errors.email = "Invalid email format.";
      }

      if (!this.isEditMode) {
        if (!this.user.password) {
          this.errors.password = "Password is required.";
        } else if (this.user.password.length < 6) {
          this.errors.password = "Password must be at least 6 characters.";
        }
      }

      return Object.values(this.errors).every(error => !error);
    },
    async saveUser() {
      if (!this.validateForm()) {
        return;
      }

      try {
        if (!this.isEditMode) {
          const users = await userController.getUsers();
          const duplicate = users.find(u => u.email.toLowerCase() === this.user.email.toLowerCase());

          if (duplicate) {
            this.errors.email = "This email is already in use!";
            return;
          }
        }

        const updatedUser = { id: this.user.id, username: this.user.username, email: this.user.email };

        if (!this.isEditMode) {
          updatedUser.password = this.user.password;
        }

        if (this.isEditMode) {
          await userController.updateUser(this.user.id, updatedUser);
        } else {
          await userController.createUser(updatedUser);
        }

        this.showModal = false;
        await this.fetchUsers();
      } catch (error) {
        console.error('Error saving user:', error.response?.data || error);
      }
    },
  },
};
</script>
