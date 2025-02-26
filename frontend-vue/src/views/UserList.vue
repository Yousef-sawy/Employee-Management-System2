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
                <p class="card-text"><strong>Role:</strong> {{ user.role }}</p>
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

    <!-- Modal for Viewing User Details -->
    <div v-if="selectedUser" class="modal fade show d-block" tabindex="-1" role="dialog">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ selectedUser.username }}</h5>
            <button type="button" class="close" @click="selectedUser = null">&times;</button>
          </div>
          <div class="modal-body">
            <p><strong>Email:</strong> {{ selectedUser.email }}</p>
            <p><strong>Role:</strong> {{ selectedUser.role }}</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="selectedUser = null">Close</button>
          </div>
        </div>
      </div>
    </div>
    <div v-if="selectedUser" class="modal-backdrop fade show"></div>

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
                <input type="text" id="username" v-model="user.username" class="form-control" required />
              </div>
              <div class="form-group">
                <label for="email">Email:</label>
                <input type="email" id="email" v-model="user.email" class="form-control" required :readonly="isEditMode" />
              </div>
              <div class="form-group">
              <label for="password">Password:</label>
              <input 
                type="text" 
                id="password" 
                v-model="user.password" 
                class="form-control"
                :readonly="isEditMode"  
                required="!isEditMode"  
              />
            </div>


              <div class="form-group">
                <label for="role">Role:</label>
                <select id="role" v-model="user.role" class="form-control" required>
                  <option value="admin">Admin</option>
                  <option value="employee">Employee</option>
                </select>
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
      user: { id: null, username: '', email: '', password: '', role: 'employee' },
      selectedUser: null,
      isEditMode: false,
      errors: { email: '' },
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
      this.user = { id: null, username: '', email: '', password: '', role: 'employee' };
      this.showModal = true;
    },
    openEditModal(user) {
  this.isEditMode = true;
  this.user = { ...user, password: "********" }; // Show password as hidden but readonly
  this.showModal = true;
}
,
    clearPassword() {
      if (this.isEditMode && this.user.password === "********") {
        this.user.password = ""; // Clear the masked password when focused
      }
    },
    closeModal() {
      this.showModal = false;
    },
    async saveUser() {
  try {
    if (!this.isEditMode) {
      // Check if email already exists
      const users = await userController.getUsers();
      const duplicate = users.find(u => u.email.toLowerCase() === this.user.email.toLowerCase());

      if (duplicate) {
        this.errors.email = "This email is already in use!";
        return;
      }

      if (!this.user.password) {  // Ensure password is entered for new users
        alert("Password is required for new users.");
        return;
      }
    }

    this.errors.email = "";

    const updatedUser = { ...this.user };

    if (this.isEditMode) {
      // Remove password field from the update request
      delete updatedUser.password;

      await userController.updateUser(this.user.id, updatedUser);
    } else {
      // Create a new user (password is required)
      await userController.createUser(this.user);
    }

    this.showModal = false;
    await this.fetchUsers(); // Refresh the user list
  } catch (error) {
    console.error('Error saving user:', error.response?.data || error);
  }
}


,
    async deleteUser(id) {
      const confirmed = confirm("Are you sure you want to delete this user?");
      if (confirmed) {
        const success = await userController.deleteUser(id);
        if (success) {
          this.users = this.users.filter(user => user.id !== id);
        }
      }
    },
    viewUser(user) {
      this.selectedUser = user;
    },
  },
};
</script>

<style scoped>
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
