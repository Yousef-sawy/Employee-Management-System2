<template>
    <div class="edit-company">
      <AppNavbar />
      <div class="container">
        <h1>{{ isEditMode ? "Edit Company" : "Create Company" }}</h1>
        
        <form @submit.prevent="saveCompany">
          <div class="form-group">
            <label for="name">Company Name:</label>
            <input type="text" id="name" v-model="company.name" class="form-control" required>
          </div>
  
          <div class="form-group">
            <label for="num_departments">Number of Departments:</label>
            <input type="number" id="num_departments" v-model="company.num_departments" class="form-control" disabled>
          </div>
  
          <div class="form-group">
            <label for="num_employees">Number of Employees:</label>
            <input type="number" id="num_employees" v-model.number="company.num_employees" class="form-control">
          </div>
  
          <button type="submit" class="btn btn-primary">{{ isEditMode ? "Save Changes" : "Create Company" }}</button>
          <router-link to="/companies" class="btn btn-secondary ml-2">Cancel</router-link>
        </form>
  
        <p v-if="errorMessage" class="text-danger mt-3">{{ errorMessage }}</p>
      </div>
    </div>
  </template>
  
  <script>
  import AppNavbar from '../components/AppNavbar.vue';
  import companyController from '../api/companyController';
  
  export default {
    name: 'EditCompany',
    props: ['id'], // The id will be null for create mode
    components: { AppNavbar },
    data() {
      return {
        company: { name: '', num_departments: 0, num_employees: 0 },
        errorMessage: ''
      };
    },
    computed: {
      isEditMode() {
        return !!this.id; // True if editing, false if creating
      }
    },
    async created() {
      if (this.isEditMode) {
        try {
          this.company = await companyController.getCompanyById(this.id);
        } catch (error) {
          this.errorMessage = 'Error loading company details.';
          console.error(error);
        }
      }
    },
    methods: {
      async saveCompany() {
        try {
          if (this.isEditMode) {
            await companyController.updateCompany(this.company.id, this.company);
          } else {
            await companyController.createCompany(this.company);
          }
          this.$router.push('/companies');
        } catch (error) {
          console.error('Error saving company:', error);
          this.errorMessage = 'Failed to save company. Please try again.';
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
  