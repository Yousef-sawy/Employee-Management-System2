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
            <h5 class="modal-title">{{ modalTitle }}</h5>
            <button type="button" class="close" @click="closeModal">&times;</button>
          </div>
          <div class="modal-body">
            <form v-if="isEditMode" @submit.prevent="saveEmployee">
              <!-- Display username as readonly text when editing -->
              <div class="form-group">
                <label for="username">Username</label>
                <input v-if="employee.id" type="text" id="username" class="form-control" :value="employee.username" readonly />
                <select v-else id="username" class="form-control" v-model="employee.user_id" required>
                  <option v-for="user in users" :key="user.id" :value="user.id">{{ user.username }}</option>
                </select>
              </div>

              <!-- Display company as readonly text when editing -->
              <div class="form-group">
                <label for="company">Company</label>
                <input v-if="employee.id" type="text" id="company" class="form-control" :value="employee.company_name || 'N/A'" readonly />
                <select v-else id="company" class="form-control" v-model="employee.company_id" required>
                  <option v-for="company in companies" :key="company.id" :value="company.id">{{ company.name }}</option>
                </select>
              </div>

              <!-- Display department as readonly text when editing -->
              <div class="form-group">
                <label for="department">Department</label>
                <input v-if="employee.id" type="text" id="department" class="form-control" :value="employee.department_name || 'N/A'" readonly />
                <select v-else id="department" class="form-control" v-model="employee.department_id" required>
                  <option v-for="department in departments" :key="department.id" :value="department.id">
                    {{ department.name }}
                  </option>
                </select>
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

              <button type="submit" class="btn btn-primary">Save Changes</button>
              <button type="button" class="btn btn-secondary" @click="closeModal">Cancel</button>
            </form>

            <div v-else>
              <p><strong>Username:</strong> {{ employee.username }}</p>
              <p><strong>Email:</strong> {{ employee.email }}</p>
              <p><strong>Company:</strong> {{ employee.company_name || "N/A" }}</p>
              <p><strong>Department:</strong> {{ employee.department_name || "N/A" }}</p>
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
      employee: {
        id: null,
        user_id: null,
        company_id: null,
        department_id: null,
        status: "applied",
        mobile: "",
        position_title: "",
      },
      isEditMode: false,
      isCreateMode: false,
    };
  },
  computed: {
    modalTitle() {
      if (!this.isEditMode) return "View Employee";
      return this.isCreateMode ? "Create Employee" : "Edit Employee";
    }
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
    
    // View Employee (without Edit mode)
    viewEmployee(employee) {
      this.isEditMode = false;
      this.isCreateMode = false;
      this.employee = { ...employee };
      this.showModal = true;
    },

    openCreateModal() {
      this.isEditMode = true;
      this.isCreateMode = true;
      this.employee = {
        id: null,
        user_id: null,
        company_id: null,
        department_id: null,
        status: "applied",
        mobile: "",
        position_title: "",
      };
      this.showModal = true;
    },

    openEditModal(employee) {
      this.isEditMode = true;
      this.isCreateMode = false;
      this.employee = { ...employee };
      // Ensure we're using the IDs that are already associated with this employee
      // when submitting the form
      if (!this.employee.user_id && employee.username) {
        const user = this.users.find(u => u.username === employee.username);
        if (user) this.employee.user_id = user.id;
      }
      if (!this.employee.company_id && employee.company_name) {
        const company = this.companies.find(c => c.name === employee.company_name);
        if (company) this.employee.company_id = company.id;
      }
      if (!this.employee.department_id && employee.department_name) {
        const department = this.departments.find(d => d.name === employee.department_name);
        if (department) this.employee.department_id = department.id;
      }
      this.showModal = true;
    },

    closeModal() {
      this.showModal = false;
    },

    async saveEmployee() {
      try {
        const employeeData = {
          user_id: this.employee.user_id,
          company: this.employee.company_id || null,
          department: this.employee.department_id || null,
          status: this.employee.status || "applied",
          mobile: this.employee.mobile || "",
          address: this.employee.address || "",
          position_title: this.employee.position_title || "",
          hired_on: this.employee.hired_on || null,
        };

        if (this.employee.id) {
          await employeeController.updateEmployee(this.employee.id, employeeData);
        } else {
          const newEmployee = await employeeController.createEmployee(employeeData);
          if (newEmployee) {
            this.employees.push(newEmployee);
          }
        }

        this.closeModal();
        await this.fetchEmployees();
      } catch (error) {
        console.error("Error saving employee:", error.response?.data || error);
      }
    },

    async deleteEmployee(employeeId) {
      try {
        await employeeController.deleteEmployee(employeeId);
        this.employees = this.employees.filter(emp => emp.id !== employeeId);
      } catch (error) {
        console.error("Error deleting employee:", error.response?.data || error);
      }
    },
  },
};
</script>