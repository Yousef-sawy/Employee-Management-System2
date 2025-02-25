<template>
  <div class="employee-list">
    <AppNavbar />
    <div class="container">
      <h1>Employee List</h1>

      <!-- Create Employee Button -->
      <div class="mb-3 text-right">
        <router-link :to="{ name: 'create-employee' }" class="btn btn-success">
          Create Employee
        </router-link>
      </div>

      <div class="album py-5 bg-light">
        <div class="container">
          <div class="row">
            <div v-for="employee in employees" :key="employee.id" class="col-md-4">
              <div class="card mb-4 box-shadow">
                <div class="card-body">
                  <h4 class="text-secondary">{{ employee.username }}</h4>
                  <p class="card-text"><strong>Email:</strong> {{ employee.email }}</p>
                  <p class="card-text">
                    <strong>Company:</strong> {{ employee.company_name || 'N/A' }}
                  </p>
                  <p class="card-text">
                    <strong>Department:</strong> {{ employee.department_name || 'N/A' }}
                  </p>
                  <p class="card-text"><strong>Status:</strong> {{ employee.status }}</p>
                  <p class="card-text">
                    <strong>Position/Title:</strong> {{ employee.position_title }}
                  </p>
                  <div class="d-flex justify-content-between align-items-center">
                    <div class="btn-group">
                      <button @click="viewEmployee(employee.id)" class="btn btn-sm btn-outline-primary">
                        View
                      </button>
                      <router-link :to="{ name: 'edit-employee', params: { id: employee.id } }"
                        class="btn btn-sm btn-outline-secondary">
                        Edit
                      </router-link>
                      <button @click="deleteEmployee(employee.id)" class="btn btn-sm btn-outline-danger">
                        Delete
                      </button>
                    </div>
                    <small class="text-muted">ID: {{ employee.id }}</small>
                  </div>
                </div>
              </div>
            </div>
            <p v-if="employees.length === 0">No employees found.</p>
            <p v-if="errorMessage" class="text-danger">{{ errorMessage }}</p>
          </div>
        </div>
      </div>

      <!-- Modal for Viewing Employee Details -->
      <div v-if="selectedEmployee" class="modal fade show d-block" tabindex="-1" role="dialog">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">{{ selectedEmployee.username }}</h5>
              <button type="button" class="close" @click="selectedEmployee = null">&times;</button>
            </div>
            <div class="modal-body">
              <p><strong>ID:</strong> {{ selectedEmployee.id }}</p>
              <p><strong>Email:</strong> {{ selectedEmployee.email }}</p>
              <p>
                <strong>Company:</strong>
                {{ selectedEmployee.company_name || 'N/A' }}
              </p>
              <p>
                <strong>Department:</strong>
                {{ selectedEmployee.department_name || 'N/A' }}
              </p>
              <p><strong>Status:</strong> {{ selectedEmployee.status }}</p>
              <p><strong>Position/Title:</strong> {{ selectedEmployee.position_title }}</p>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" @click="selectedEmployee = null">Close</button>
            </div>
          </div>
        </div>
      </div>
      <div v-if="selectedEmployee" class="modal-backdrop fade show"></div>
    </div>
  </div>
</template>

<script>
import AppNavbar from '../components/AppNavbar.vue';
import employeeController from '../api/employeeController';

export default {
  name: 'EmployeeList',
  components: { AppNavbar },
  data() {
    return {
      employees: [],
      errorMessage: '',
      selectedEmployee: null
    };
  },
  async created() {
    try {
      this.employees = await employeeController.getEmployees();
    } catch (error) {
      this.errorMessage = 'Error loading employees.';
      console.error(error);
    }
  },
  methods: {
    async viewEmployee(id) {
      try {
        this.selectedEmployee = await employeeController.getEmployeeById(id);
      } catch (error) {
        console.error("Error fetching employee details:", error);
      }
    },
    async deleteEmployee(id) {
      if (confirm("Are you sure you want to delete this employee?")) {
        try {
          const success = await employeeController.deleteEmployee(id);
          if (success) {
            this.employees = this.employees.filter(emp => emp.id !== id);
          }
        } catch (error) {
          console.error("Error deleting employee:", error);
          this.errorMessage = 'Failed to delete employee.';
        }
      }
    }
  }
};
</script>

<style scoped>
.container {
  max-width: 900px;
  margin-top: 20px;
}
</style>
