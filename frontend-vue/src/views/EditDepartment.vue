<template>
  <div class="edit-department">
    <AppNavbar />
    <h1>{{ isNew ? "Create Department" : "Edit Department" }}</h1>

    <div class="container">
      <form @submit.prevent="saveDepartment">
        <div class="form-group">
          <label for="name">Department Name</label>
          <input type="text" id="name" class="form-control" v-model="department.name" required>
        </div>

        <div class="form-group">
          <label for="company">Company</label>
          <select id="company" class="form-control" v-model="department.company" required>
            <option v-for="company in companies" :key="company.id" :value="company.id">
              {{ company.name }}
            </option>
          </select>
        </div>

        <div class="form-group">
          <label for="employees">Number of Employees</label>
          <input type="number" id="employees" class="form-control" v-model="department.num_employees" required>
        </div>

        <button type="submit" class="btn btn-primary">{{ isNew ? "Create" : "Update" }}</button>
        <router-link to="/departments" class="btn btn-secondary">Cancel</router-link>
      </form>
    </div>
  </div>
</template>

<script>
import AppNavbar from '../components/AppNavbar.vue';
import departmentController from '../api/departmentController';
import companyController from '../api/companyController';

export default {
  name: 'EditDepartment',
  props: ['id'],
  data() {
    return {
      isNew: !this.id, // ✅ Determines if it's create mode
      department: {
        name: '',
        company: null,
        num_employees: 0
      },
      companies: []
    };
  },
  async created() {
    try {
      this.companies = await companyController.getCompanies();

      if (!this.isNew) {
        this.department = await departmentController.getDepartmentById(this.id);
      }
    } catch (error) {
      console.error("Error loading department data:", error);
    }
  },
  methods: {
    async saveDepartment() {
      try {
        if (this.isNew) {
          await departmentController.createDepartment(this.department);
        } else {
          await departmentController.updateDepartment(this.id, this.department);
        }
        this.$router.push('/departments'); // ✅ Redirect after saving
      } catch (error) {
        console.error("Error saving department:", error);
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
  