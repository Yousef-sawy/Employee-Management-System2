<template>
  <div class="department-list">
    <AppNavbar />
    <h1>Department List</h1>

    <!-- ✅ Create Department Button -->
    <div class="container mb-3">
      <router-link :to="{ name: 'create-department' }" class="btn btn-success">
        Create Department
      </router-link>
    </div>

    <div class="album py-5 bg-light">
      <div class="container">
        <div class="row">
          <div v-for="department in departments" :key="department.id" class="col-md-4">
            <div class="card mb-4 box-shadow">
              <div class="card-body">
                <h4 class="text-secondary">{{ department.name }}</h4>
                <p class="card-text"><strong>Company:</strong> {{ department.company.name }}</p>
                <p class="card-text"><strong>Employees:</strong> {{ department.num_employees }}</p>
                <div class="d-flex justify-content-between align-items-center">
                  <div class="btn-group">
                    <button @click="viewDepartment(department.id)" class="btn btn-sm btn-outline-primary">
                      View
                    </button>
                    <router-link :to="{ name: 'edit-department', params: { id: department.id } }"
                      class="btn btn-sm btn-outline-secondary">
                      Edit
                    </router-link>
                    <button @click="deleteDepartment(department.id)" class="btn btn-sm btn-outline-danger">
                      Delete
                    </button>
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

    <!-- ✅ Modal for Viewing Department Details -->
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
  </div>
</template>

<script>
import AppNavbar from '../components/AppNavbar.vue';
import departmentController from '../api/departmentController';

export default {
  name: 'DepartmentList',
  components: { AppNavbar },
  data() {
    return {
      departments: [],
      selectedDepartment: null
    };
  },
  async created() {
    try {
      this.departments = await departmentController.getDepartments();
    } catch (error) {
      console.error("Error fetching departments:", error);
    }
  },
  methods: {
    async viewDepartment(id) {
      this.selectedDepartment = await departmentController.getDepartmentById(id);
    },
    async deleteDepartment(id) {
      const confirmed = confirm("Are you sure you want to delete this department?");
      if (confirmed) {
        await departmentController.deleteDepartment(id);
        this.departments = this.departments.filter(dept => dept.id !== id);
      }
    }
  }
};
</script>

<style scoped>
/* ✅ Modal styles */
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
