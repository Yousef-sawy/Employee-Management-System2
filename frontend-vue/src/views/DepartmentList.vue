<template>
  <div class="department">
    <AppNavbar />
    <h1>Department List</h1>

    <!-- Create Department Button -->
    <div class="container mb-3 text-right">
      <button @click="openCreateModal" class="btn btn-success">Create Department</button>
    </div>

    <div class="album py-5 bg-light">
      <div class="container">
        <div class="row">
          <div v-for="department in departments" :key="department.id" class="col-md-4">
            <div class="card mb-4 box-shadow">
              <div class="card-body">
                <h4 class="text-secondary">{{ department.name }}</h4>
                <p class="card-text"><strong>Company:</strong> {{ department.company_name }}</p>
                <p class="card-text"><strong>Employees:</strong> {{ department.num_employees }}</p>
                <div class="d-flex justify-content-between align-items-center">
                  <div class="btn-group">
                    <!-- View Button -->
                    <button @click="viewDepartment(department)" class="btn btn-sm btn-outline-primary">View</button>
                    <button @click="openEditModal(department)" class="btn btn-sm btn-outline-secondary">Edit</button>
                    <button @click="deleteDepartment(department.id)" class="btn btn-sm btn-outline-danger">Delete</button>
                  </div>
                  <small class="text-muted">ID: {{ department.id }}</small>
                </div>
              </div>
            </div>
          </div>
          <p v-if="departments.length === 0">No departments found.</p>
        </div>
      </div>
    </div>

    <!-- Modal for Viewing Department Details -->
    <div v-if="selectedDepartment" class="modal fade show d-block" tabindex="-1" role="dialog">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ selectedDepartment.name }}</h5>
            <button type="button" class="close" @click="selectedDepartment = null">&times;</button>
          </div>
          <div class="modal-body">
            <p><strong>ID:</strong> {{ selectedDepartment.id }}</p>
            <p><strong>Company:</strong> {{ selectedDepartment.company.name }}</p>
            <p><strong>Employees:</strong> {{ selectedDepartment.num_employees }}</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="selectedDepartment = null">Close</button>
          </div>
        </div>
      </div>
    </div>
    <div v-if="selectedDepartment" class="modal-backdrop fade show"></div>

    <!-- Modal for Creating or Editing Department -->
    <div v-if="showModal" class="modal fade show d-block" tabindex="-1" role="dialog">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ isEditMode ? "Edit Department" : "Create Department" }}</h5>
            <button type="button" class="close" @click="closeModal">&times;</button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="saveDepartment">
              <div class="form-group">
                <label for="name">Department Name:</label>
                <input type="text" id="name" v-model="department.name" class="form-control" required />
              </div>
              <div class="form-group">
                <label for="company">Company:</label>
                <select id="company" v-model="department.company" class="form-control" required>
                  <option v-for="company in companies" :key="company.id" :value="company.id">
                    {{ company.name }}
                  </option>
                </select>
              </div>
              <div class="form-group">
                <label for="num_employees">Number of Employees:</label>
                <input type="number" id="num_employees" v-model="department.num_employees" class="form-control" required />
              </div>
              <button type="submit" class="btn btn-primary">{{ isEditMode ? "Save Changes" : "Create Department" }}</button>
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
import departmentController from '../api/departmentController';
import companyController from '../api/companyController';

export default {
  name: 'DepartmentList',
  components: { AppNavbar },
  data() {
    return {
      departments: [],
      companies: [],
      showModal: false,
      department: { id: null, name: '', company: null, num_employees: 0 },
      selectedDepartment: null, // For viewing department details
      isEditMode: false,
    };
  },
  async created() {
    this.departments = await departmentController.getDepartments();
    this.companies = await companyController.getCompanies();
  },
  methods: {
    openCreateModal() {
      this.isEditMode = false;
      this.department = { id: null, name: '', company: null, num_employees: 0 };
      this.showModal = true;
    },
    openEditModal(department) {
      this.isEditMode = true;
      this.department = { ...department }; // Clone the department to prevent modifying the original data
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    },
    async saveDepartment() {
      try {
        if (this.isEditMode) {
          // Edit the department
          await departmentController.updateDepartment(this.department.id, this.department);
        } else {
          // Create a new department
          await departmentController.createDepartment(this.department);
        }

        // Close the modal and refresh the department list
        this.showModal = false;
        this.departments = await departmentController.getDepartments();
      } catch (error) {
        console.error("Error saving department:", error);
      }
    },
    async deleteDepartment(id) {
      const confirmed = confirm("Are you sure you want to delete this department?");
      if (confirmed) {
        const success = await departmentController.deleteDepartment(id);
        if (success) {
          this.departments = this.departments.filter(department => department.id !== id);
        }
      }
    },
    viewDepartment(department) {
      this.selectedDepartment = department; // Set the selected department to be viewed
    }
  }
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
