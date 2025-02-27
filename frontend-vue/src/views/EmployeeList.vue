<template>
  <div class="employee">
    <AppNavbar />
    <h1>Employee List</h1>

    <!-- Create Employee Button -->
    <div class="container mb-3 text-right">
      <button @click="openCreateModal" class="btn btn-success">Create Employee</button>
    </div>

    <div class="album py-5 bg-light">
      <div class="container">
        <div class="row">
          <div v-for="employee in employees" :key="employee.id" class="col-md-4">
            <div class="card mb-4 box-shadow">
              <div class="card-body">
                <h4 class="text-secondary">{{ employee.username }}</h4>
                <p class="card-text"><strong>Email:</strong> {{ employee.email }}</p>
                <p class="card-text"><strong>Company:</strong> {{ employee.company_name || 'N/A' }}</p>
                <p class="card-text"><strong>Department:</strong> {{ employee.department_name || 'N/A' }}</p>
                <p class="card-text"><strong>Status:</strong> {{ employee.status }}</p>
                <p class="card-text"><strong>Position:</strong> {{ employee.position_title }}</p>
                <div class="d-flex justify-content-between align-items-center">
                  <div class="btn-group">
                    <button @click="viewEmployee(employee)" class="btn btn-sm btn-outline-primary">View</button>
                    <button @click="openEditModal(employee)" class="btn btn-sm btn-outline-secondary">Edit</button>
                    <button @click="deleteEmployee(employee.id)" class="btn btn-sm btn-outline-danger">Delete</button>
                  </div>
                  <small class="text-muted">ID: {{ employee.id }}</small>
                </div>
              </div>
            </div>
          </div>
          <p v-if="employees.length === 0">No employees found.</p>
        </div>
      </div>
    </div>

    <!-- Create/Edit Employee Modal -->
    <div v-if="showModal" class="modal fade show d-block" tabindex="-1" role="dialog">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ isEditMode ? (employee.id ? "Edit Employee" : "Create Employee") : "View Employee" }}</h5>
            <button type="button" class="close" @click="closeModal">&times;</button>
          </div>
          <div class="modal-body">
            <form v-if="isEditMode" @submit.prevent="saveEmployee">
              <!-- Username Field -->
              <div class="form-group">
                <label for="username">Username</label>
                <input v-if="employee.id" type="text" id="username" class="form-control" :value="employee.username" readonly />
                <select v-else id="username" class="form-control" v-model="employee.username" required @change="updateEmailFromUser">
                  <option value="">Select a user</option>
                  <option v-for="user in users" :key="user.id" :value="user.id">{{ user.username }}</option>
                </select>
              </div>

              <!-- Email Field (Read-only) -->
              <div v-if="!employee.id" class="form-group">
                <label for="email">Email</label>
                <input type="text" id="email" class="form-control" :value="selectedUserEmail" readonly />
              </div>

              <!-- Company Field -->
              <div class="form-group">
                <label for="company">Company</label>
                <input v-if="employee.id" type="text" id="company" class="form-control" :value="employee.company_name || 'N/A'" readonly />
                <select v-else id="company" class="form-control" v-model="employee.company" required>
                  <option value="">Select a company</option>
                  <option v-for="company in companies" :key="company.id" :value="company.id">{{ company.name }}</option>
                </select>
              </div>

              <!-- Department Field -->
              <div class="form-group">
                <label for="department">Department</label>
                <input v-if="employee.id" type="text" id="department" class="form-control" :value="employee.department_name || 'N/A'" readonly />
                <select v-else id="department" class="form-control" v-model="employee.department" required>
                  <option value="">Select a department</option>
                  <option v-for="department in departments" :key="department.id" :value="department.id">
                    {{ department.name }}
                  </option>
                </select>
              </div>

              <!-- Address Field -->
              <div class="form-group">
                <label for="address">Address</label>
                <input type="text" id="address" class="form-control" v-model="employee.address" required />
              </div>

              <div class="form-group">
                <label for="status">Status</label>
                <select id="status" class="form-control" v-model="employee.status" required>
                  <option value="applied">Applied</option>
                  <option value="hired">Hired</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>

              <div class="form-group">
                <label for="mobile">Mobile</label>
                <input type="text" id="mobile" class="form-control" v-model="employee.mobile" required />
              </div>

              <div class="form-group">
                <label for="position">Position Title</label>
                <input type="text" id="position" class="form-control" v-model="employee.position_title" required />
              </div>

              <button type="submit" class="btn btn-primary">{{ employee.id ? 'Save Changes' : 'Create Employee' }}</button>
              <button type="button" class="btn btn-secondary" @click="closeModal">Cancel</button>
            </form>

            <div v-else>
              <p><strong>Username:</strong> {{ employee.username }}</p>
              <p><strong>Email:</strong> {{ employee.email }}</p>
              <p><strong>Company:</strong> {{ employee.company_name || "N/A" }}</p>
              <p><strong>Department:</strong> {{ employee.department_name || "N/A" }}</p>
              <p><strong>Address:</strong> {{ employee.address }}</p>
              <p><strong>Status:</strong> {{ employee.status }}</p>
              <p><strong>Mobile:</strong> {{ employee.mobile }}</p>
              <p><strong>Position:</strong> {{ employee.position_title }}</p>
              <button type="button" class="btn btn-secondary" @click="closeModal">Close</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="showModal" class="modal-backdrop fade show"></div>
  </div>
</template>

<script>
import AppNavbar from "../components/AppNavbar.vue";
import employeeController from "../api/employeeController";
import companyController from "../api/companyController";
import departmentController from "../api/departmentController";
import userController from "../api/userController";

export default {
  name: "EmployeeList",
  components: { AppNavbar },
  data() {
    return {
      employees: [],
      users: [],
      companies: [],
      departments: [],
      showModal: false,
      employee: {},
      isEditMode: false,
      selectedUserEmail: "",
    };
  },
  async created() {
    await this.fetchEmployees();
    await this.fetchDropdownData();
  },
  methods: {
    async fetchEmployees() {
      this.employees = await employeeController.getEmployees();
    },
    async fetchDropdownData() {
      this.users = await userController.getUsers();
      this.companies = await companyController.getCompanies();
      this.departments = await departmentController.getDepartments();
    },

    updateEmailFromUser() {
      // When user changes, update the displayed email
      if (this.employee.username) {
        const selectedUser = this.users.find(user => user.id === this.employee.username);
        this.selectedUserEmail = selectedUser ? selectedUser.email : "";
      } else {
        this.selectedUserEmail = "";
      }
    },

    viewEmployee(employee) {
      this.isEditMode = false;
      this.employee = { ...employee };
      this.showModal = true;
    },

    // In your openCreateModal function
openCreateModal() {
  this.isEditMode = true;
  this.employee = { 
    id: null, 
    username: "", // Try using "user" instead of "username"
    company: "",
    department: "",
    address: "",
    status: "applied", 
    mobile: "", 
    position_title: "" 
  };
  this.selectedUserEmail = "";
  this.showModal = true;
},

    openEditModal(employee) {
      this.isEditMode = true;
      this.employee = { ...employee };
      this.showModal = true;
    },

    closeModal() {
      this.showModal = false;
    },

    async saveEmployee() {
  console.log("Original employee data:", this.employee);
  
  // Create a copy of the employee object
  const employeeData = { ...this.employee };

  if (!employeeData.id) {
    // Ensure the correct format (depending on the backend requirement)
    employeeData.user_id = employeeData.username;  // If backend expects a user ID directly
    delete employeeData.username;
  }

  console.log("Modified employee data for API:", employeeData);

  try {
    if (this.employee.id) {
      await employeeController.updateEmployee(this.employee.id, employeeData);
    } else {
      await employeeController.createEmployee(employeeData);
    }
    this.closeModal();
    await this.fetchEmployees();
  } catch (error) {
    console.error("Error creating/updating employee:", error.response?.data || error);
  }
}
,

    async deleteEmployee(employeeId) {
      await employeeController.deleteEmployee(employeeId);
      this.employees = this.employees.filter(emp => emp.id !== employeeId);
    },
  },
};
</script>