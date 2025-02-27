<template>
  <div class="company">
    <AppNavbar />
    <h1>Company List</h1>

    <!-- Create Company Button -->
    <div class="container mb-3 text-right">
      <button @click="openCreateModal" class="btn btn-success">Create Company</button>
    </div>

    <div class="album py-5 bg-light">
      <div class="container">
        <div class="row">
          <div v-for="company in companies" :key="company.id" class="col-md-4">
            <div class="card mb-4 box-shadow">
              <div class="card-body">
                <h4 class="text-secondary">{{ company.name }}</h4>
                <p class="card-text"><strong>Departments:</strong> {{ company.num_departments }}</p>
                <p class="card-text"><strong>Employees:</strong> {{ company.num_employees }}</p>
                <div class="d-flex justify-content-between align-items-center">
                  <div class="btn-group">
                    <!-- View Button -->
                    <button @click="viewCompany(company)" class="btn btn-sm btn-outline-primary">View</button>
                    <button @click="openEditModal(company)" class="btn btn-sm btn-outline-secondary">Edit</button>
                    <button @click="deleteCompany(company.id)" class="btn btn-sm btn-outline-danger">Delete</button>
                  </div>
                  <small class="text-muted">ID: {{ company.id }}</small>
                </div>
              </div>
            </div>
          </div>
          <p v-if="companies.length === 0">No companies found.</p>
        </div>
      </div>
    </div>

    <!-- Modal for Viewing Company Details -->
    <div v-if="selectedCompany" class="modal fade show d-block" tabindex="-1" role="dialog">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ selectedCompany.name }}</h5>
            <button type="button" class="close" @click="selectedCompany = null">&times;</button>
          </div>
          <div class="modal-body">
            <p><strong>ID:</strong> {{ selectedCompany.id }}</p>
            <p><strong>Departments:</strong> {{ selectedCompany.num_departments }}</p>
            <p><strong>Employees:</strong> {{ selectedCompany.num_employees }}</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="selectedCompany = null">Close</button>
          </div>
        </div>
      </div>
    </div>
    <div v-if="selectedCompany" class="modal-backdrop fade show"></div>

    <!-- Modal for Creating or Editing Company -->
    <div v-if="showModal" class="modal fade show d-block" tabindex="-1" role="dialog">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ isEditMode ? "Edit Company" : "Create Company" }}</h5>
            <button type="button" class="close" @click="closeModal">&times;</button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="saveCompany">
              <div class="form-group">
                <label for="name">Company Name:</label>
                <input type="text" id="name" v-model="company.name" class="form-control" required />
              </div>
              <div class="form-group">
                <label for="num_departments">Number of Departments:</label>
                <input type="number" id="num_departments" v-model="company.num_departments" class="form-control" disabled />
              </div>
              <div class="form-group">
                <label for="num_employees">Number of Employees:</label>
                <input type="number" id="num_employees" v-model="company.num_employees" class="form-control" />
              </div>
              <button type="submit" class="btn btn-primary">{{ isEditMode ? "Save Changes" : "Create Company" }}</button>
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
import companyController from '../api/companyController';

export default {
  name: 'CompanyList',
  components: { AppNavbar },
  data() {
    return {
      companies: [],
      showModal: false,
      company: { id: null, name: '', num_departments: 0, num_employees: 0 },
      selectedCompany: null, 
      isEditMode: false,
    };
  },
  async created() {
    this.companies = await companyController.getCompanies();
  },
  methods: {
    openCreateModal() {
      this.isEditMode = false;
      this.company = { id: null, name: '', num_departments: 0, num_employees: 0 };
      this.showModal = true;
    },
    openEditModal(company) {
      this.isEditMode = true;
      this.company = { ...company }; 
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    },
    async saveCompany() {
      try {
        if (this.isEditMode) {
          
          await companyController.updateCompany(this.company.id, this.company);
        } else {
          
          await companyController.createCompany(this.company);
        }

        
        this.showModal = false;
        this.companies = await companyController.getCompanies();
      } catch (error) {
        console.error("Error saving company:", error);
      }
    },
    async deleteCompany(id) {
      const confirmed = confirm("Are you sure you want to delete this company?");
      if (confirmed) {
        const success = await companyController.deleteCompany(id);
        if (success) {
          this.companies = this.companies.filter(company => company.id !== id);
        }
      }
    },
    viewCompany(company) {
      this.selectedCompany = company; 
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
